import React, { createContext, FC, useState } from 'react';
import Auth0 from 'react-native-auth0';

const SCOPE = 'openid profile email';

type AuthContextProps = {
  login?: () => void;
  logout?: () => void;
  isAuthenticated: boolean;
  accessToken?: string;
  idToken?: string;
  email?: string;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  accessToken: undefined,
  idToken: undefined,
  email: undefined,
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
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [idToken, setIdToken] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const auth0 = new Auth0({
    domain,
    clientId,
  });

  const authContext = React.useMemo(
    () => ({
      login: async () => {
        const credential = await auth0.webAuth.authorize({
          scope: SCOPE,
        });
        const userInfo = await auth0.auth.userInfo({
          token: credential.accessToken,
        });

        setAccessToken(credential.accessToken);
        setIdToken(credential.idToken);
        setEmail(userInfo.email);
      },
      logout: async () => {
        await auth0.webAuth.clearSession();
        setAccessToken(undefined);
        setIdToken(undefined);
        setEmail(undefined);
      },
    }),
    [auth0.webAuth, auth0.auth]
  );
  const isAuthenticated = Boolean(accessToken) && Boolean(email);

  return (
    <AuthContext.Provider
      value={{ ...authContext, isAuthenticated, accessToken, idToken, email }}
    >
      {children}
    </AuthContext.Provider>
  );
};
