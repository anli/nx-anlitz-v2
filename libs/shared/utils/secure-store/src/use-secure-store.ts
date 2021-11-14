import * as Keychain from 'react-native-keychain';

export const getGenericPassword = async () => {
  const credentials = await Keychain.getGenericPassword();

  /* istanbul ignore next */
  if (credentials && credentials.password) {
    return JSON.parse(`${credentials.password}`);
  } else {
    return undefined;
  }
};

export const setItemAsync = async (
  key: string,
  value: { [key: string]: string } | string
) => {
  const current = await getGenericPassword();

  await Keychain.setGenericPassword(
    'DEFAULT',
    JSON.stringify({
      ...current,
      [key]: value,
    })
  );
};

export const getItemAsync = async (key: string) => {
  const current = await getGenericPassword();

  return current?.[key];
};

export const deleteItemAllAsync = () => {
  return Keychain.resetGenericPassword();
};
