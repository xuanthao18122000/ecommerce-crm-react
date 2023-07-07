import { CATEGORY_PATH } from '@/data/constant';
import { useApp } from '@/hooks';
import { QueryOptions } from '@/ts/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DataCategory, DataCategoryListQuery, CategoryListParams, DetailCategory } from '../services/type';
import categoryApi from '../services/category-api';
import authApi from '@/features/auth/service/auth-api';

const categories = createQueryKeys('categories', {
  list: (params: CategoryListParams) => ({
    queryKey: [params],
    queryFn: () => categoryApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => categoryApi.getDetail(id),
  }),
});

export const useCategoryListQuery = (
  params: CategoryListParams = {},
  options: QueryOptions<DataCategoryListQuery> = {}
) => {
  
  return useQuery({
    ...categories.list(params),
    keepPreviousData: true,
    ...options,
  });
};

export const useCategoryDetailQuery = (
  id: number,
  options: QueryOptions<DetailCategory> = {}
) => {
  return useQuery({
    ...categories.detail(id),
    ...options,
  });
};

export const useUpdateCategoryMutation = (id: number) => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.update(id),
    onSuccess: () => {
      void message.success('Cập nhật thông tin người dùng thành công');
      void queryClient.invalidateQueries(categories.detail(id).queryKey);
    },
    onError: () => {
      void message.error('Cập nhật người dùng thất bại');
    },
  });
};

export const useAddCategoryMutation = () => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: categoryApi.add,
    onSuccess: () => {
      void message.success('Tạo người dùng thành công');
      void queryClient.invalidateQueries(categories.list._def);
      navigate(CATEGORY_PATH);
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
