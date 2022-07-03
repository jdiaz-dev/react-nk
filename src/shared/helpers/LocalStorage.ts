import { LocalStorageEnum } from '../Consts';
import { DataUser } from '../types';

const getDataUser = (): DataUser => JSON.parse(localStorage.getItem(LocalStorageEnum.dataUser) || '{}');

export const saveDataUser = (dataUser: DataUser): void => {
  localStorage.setItem(LocalStorageEnum.dataUser, JSON.stringify(dataUser));
};

export const getToken = (): string => {
  let user: DataUser = getDataUser();
  if (user) return user.token;
  return '';
};
