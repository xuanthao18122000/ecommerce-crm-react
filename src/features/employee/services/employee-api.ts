// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import axiosClient from '@/apis/axios-client';
import {
  BodyUpdateEmployee,
  DataEmployee,
  DataEmployeeListQuery,
  EmployeeListParams,
} from './type';

const BASE_URL: string = import.meta.env.VITE_API_USER_URL
const baseUrl = BASE_URL+ 'admin/employees';

const employeeApi = {
  getList: (params: EmployeeListParams): Promise<DataEmployeeListQuery> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<DataEmployee> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update: (id: number) => (data: BodyUpdateEmployee) =>
    axiosClient.put(`${baseUrl}/${id}`, data),

  add: (data: BodyUpdateEmployee) => axiosClient.post(baseUrl, data),
};

export default employeeApi;
