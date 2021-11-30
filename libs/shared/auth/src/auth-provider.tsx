import {
  deleteItemAllAsync,
  getItemAsync,
  setItemAsync,
} from '@nx-anlitz/shared/utils/secure-store';
import React, { createContext, FC, useEffect, useState } from 'react';
import Auth0 from 'react-native-auth0';

const SCOPE = 'openid profile email';

type AuthContextProps = {
  login?: () => void;
  logout?: () => void;
  isAuthenticated: boolean;
  accessToken?: string;
  idToken?: string;
  email?: string;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  accessToken: undefined,
  idToken: undefined,
  email: undefined,
  loading: true,
});

type AuthProviderProps = {
  domain: string;
  clientId: string;
};

export const AuthProvider: FC<AuthProviderProps> = ({
  domain,
  clientId,
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [credential, setCredential] = useState<
    { accessToken: string; idToken: string; email: string } | undefined
  >();
  const auth0 = new Auth0({
    domain,
    clientId,
  });
  const isAuthenticated = Boolean(credential);
  const authContext = React.useMemo(
    () => ({
      login: async () => {
        const authorize = await auth0.webAuth.authorize({
          scope: SCOPE,
        });
        const userInfo = await auth0.auth.userInfo({
          token: authorize.accessToken,
        });
        const _credential = {
          accessToken: authorize.accessToken,
          idToken: authorize.idToken,
          email: userInfo.email,
        };

        await setItemAsync('credential', _credential);
        setCredential(_credential);
      },
      logout: async () => {
        await deleteItemAllAsync();
        await auth0.webAuth.clearSession();
        setCredential(undefined);
      },
    }),
    [auth0.webAuth, auth0.auth]
  );

  useEffect(() => {
    const getStore = async () => {
      const storeCredential = await getItemAsync('credential');

      try {
        await auth0.auth.userInfo({
          token: storeCredential.accessToken,
        });

        /* istanbul ignore next */
        setCredential(storeCredential);
        /* istanbul ignore next */
        setLoading(false);
      } catch {
        await deleteItemAllAsync();
        setCredential(undefined);
        setLoading(false);
      }
    };
    getStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authContext,
        isAuthenticated,
        accessToken: credential?.accessToken,
        idToken: credential?.idToken,
        email: credential?.email,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
