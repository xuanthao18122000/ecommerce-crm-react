import axiosClient from '@/apis/axios-client';
import { LoginValues, ResponseLogin } from './type';
import { DataUser } from '@/features/user';

const baseUrl = import.meta.env.VITE_API_USER_URL + 'admin/auth';

const authApi = {
  login: (data: LoginValues): Promise<ResponseLogin> =>
    axiosClient.post(`${baseUrl}/login`, data),
  logout: () => axiosClient.post(`${baseUrl}/logout`),
  
  getInfoMe: (): Promise<DataUser> => axiosClient.get(`${baseUrl}/profile`),
};

export default authApi;
