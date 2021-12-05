import {
  deleteItemAllAsync,
  getItemAsync,
  setItemAsync,
} from '@nx-anlitz/shared/utils/secure-store';
import React, { createContext, FC, useEffect, useState } from 'react';
import Auth0 from 'react-native-auth0';

const SCOPE = 'openid profile email offline_access';

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
  const [user, setUser] = useState<{ email: string } | undefined>(undefined);
  const [idToken, setIdToken] = useState<string | undefined>(undefined);
  const auth0 = new Auth0({
    domain,
    clientId,
  });
  const isAuthenticated = Boolean(user);
  const authContext = React.useMemo(
    () => ({
      login: async () => {
        const authInfo = await auth0.webAuth.authorize({
          scope: SCOPE,
        });
        const userInfo = await auth0.auth.userInfo({
          token: authInfo.accessToken,
        });
        await setItemAsync('credential', {
          refreshToken: `${authInfo.refreshToken}`,
        });
        setIdToken(authInfo.idToken);
        setUser({ email: userInfo.email });
      },
      logout: async () => {
        await deleteItemAllAsync();
        await auth0.webAuth.clearSession();
        setIdToken(undefined);
        setUser(undefined);
      },
    }),
    [auth0.webAuth, auth0.auth]
  );

  useEffect(() => {
    const restoreUserSession = async () => {
      const storeCredential = await getItemAsync('credential');

      /* istanbul ignore next */
      if (storeCredential) {
        try {
          const authInfo = await auth0.auth.refreshToken({
            refreshToken: storeCredential.refreshToken,
            scope: SCOPE,
          });
          const userInfo = await auth0.auth.userInfo({
            token: authInfo.accessToken,
          });
          setIdToken(authInfo.idToken);
          setUser({ email: userInfo.email });
        } catch (error) {
          await deleteItemAllAsync();
          setIdToken(undefined);
          setUser(undefined);
        }
      }

      setLoading(false);
    };
    restoreUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authContext,
        isAuthenticated,
        idToken: idToken,
        email: user?.email,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
