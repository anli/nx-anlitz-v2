import React, { createContext, FC, useState } from 'react';
import Auth0 from 'react-native-auth0';

const SCOPE = 'openid profile email';

type AuthContextProps = {
  login?: () => void;
  logout?: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
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
        setAccessToken(credential.accessToken);
      },
      logout: async () => {
        await auth0.webAuth.clearSession();
        setAccessToken(undefined);
      },
    }),
    [auth0.webAuth]
  );
  const isAuthenticated = Boolean(accessToken);

  return (
    <AuthContext.Provider value={{ ...authContext, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
