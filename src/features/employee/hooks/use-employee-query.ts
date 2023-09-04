import { EMPLOYEE_PATH } from '@/data/constant';
import { useApp } from '@/hooks';
import { QueryOptions } from '@/ts/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DataEmployee, DataEmployeeListQuery, EmployeeListParams } from '../services/type';
import employeeApi from '../services/employee-api';
import authApi from '@/features/auth/service/auth-api';

const employees = createQueryKeys('employees', {
  list: (params: EmployeeListParams) => ({
    queryKey: [params],
    queryFn: () => employeeApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => employeeApi.getDetail(id),
  }),
});

export const useEmployeeListQuery = (
  params: EmployeeListParams = {},
  options: QueryOptions<DataEmployeeListQuery> = {}
) => {
  
  return useQuery({
    ...employees.list(params),
    keepPreviousData: true,
    ...options,
  });
};

export const useEmployeeDetailQuery = (
  id: number,
  options: QueryOptions<DataEmployee> = {}
) => {
  return useQuery({
    ...employees.detail(id),
    ...options,
  });
};

export const useUpdateEmployeeMutation = (id: number) => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: employeeApi.update(id),
    onSuccess: () => {
      void message.success('Cập nhật thông tin người dùng thành công');
      void queryClient.invalidateQueries(employees.detail(id).queryKey);
    },
    onError: () => {
      void message.error('Cập nhật người dùng thất bại');
    },
  });
};

export const useAddEmployeeMutation = () => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: employeeApi.add,
    onSuccess: () => {
      void message.success('Tạo người dùng thành công');
      void queryClient.invalidateQueries(employees.list._def);
      navigate(EMPLOYEE_PATH);
    },
    onError: () => {
      void message.error('Tạo người dùng thất bại');
    },
  });
};

export const useInfoQuery = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: authApi.getInfoMe,
  });
};
