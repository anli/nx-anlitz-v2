/* istanbul ignore file */

export const filterNullable = <T>(arr: T[]): NonNullable<T>[] => {
  return arr.reduce<NonNullable<T>[]>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (acc, el) => (!(el === undefined || el === null) ? [...acc, el!] : acc),
    []
  );
};
