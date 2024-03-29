import axiosClient from '@/apis/axios-client';
import {
  BodyUpdateUser,
  DataUser,
  DataUserListQuery,
  UserListParams,
} from './type';

const baseUrl = import.meta.env.VITE_API_USER_URL + 'admin/users';

const userApi = {
  getList: (params: UserListParams): Promise<DataUserListQuery> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<DataUser> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update: (id: number) => (data: BodyUpdateUser) =>
    axiosClient.put(`${baseUrl}/${id}`, data),

  add: (data: BodyUpdateUser) => axiosClient.post(baseUrl, data),

  
};

export default userApi;
