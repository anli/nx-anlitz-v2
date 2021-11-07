import { useContext } from 'react';
import { AuthenticationContext } from './authentication-provider';

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
