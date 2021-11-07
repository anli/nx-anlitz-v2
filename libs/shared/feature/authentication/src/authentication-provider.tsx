import React, { createContext, FC, useState } from 'react';
import Auth0 from 'react-native-auth0';

const SCOPE = 'openid profile email';

type AuthenticationContextProps = {
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthenticationContext = createContext<AuthenticationContextProps>(
  // Use for initializing an empty context and surpressing typescript errors.
  null as any
);

type AuthenticationProviderProps = {
  domain: string;
  clientId: string;
};

export const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
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
    <AuthenticationContext.Provider value={{ ...authContext, isAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
