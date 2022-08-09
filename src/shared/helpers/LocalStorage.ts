import { LocalStorageEnum } from '../Consts';
import { DataUser } from '../types';

const getDataUser = (): DataUser => JSON.parse(localStorage.getItem(LocalStorageEnum.dataUser) || '{}');

export const saveDataUser = (dataUser: DataUser): void => {
  localStorage.setItem(LocalStorageEnum.dataUser, JSON.stringify(dataUser));
  localStorage.setItem(LocalStorageEnum.authenticated, JSON.stringify(true));
};

export const getToken = (): string => {
  let user: DataUser = getDataUser();
  if (user) return user.token;
  return '';
};

export const checkAuthentication = (): boolean => {
  const auth = JSON.parse(localStorage.getItem(LocalStorageEnum.authenticated) || 'false');
  return auth;
};
