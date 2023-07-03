import axiosClient from '@/apis/axios-client';
import { LoginValues, ResponseLogin } from './type';
import { DataUser } from '@/features/user';

const baseUrl = 'auth';

const authApi = {
  login: (data: LoginValues): Promise<ResponseLogin> =>
    axiosClient.post(`${baseUrl}/login`, data),
  logout: () => axiosClient.post(`${baseUrl}/logout`),
  
  getInfoMe: (): Promise<DataUser> => axiosClient.get(`auth/profile`),
};

export default authApi;
