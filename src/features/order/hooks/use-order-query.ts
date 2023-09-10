import { CATEGORY_PATH } from '@/data/constant';
import { useApp } from '@/hooks';
import { QueryOptions } from '@/ts/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DataOrder, DataOrderListQuery, OrderListParams, DetailOrder } from '../services/type';
import orderApi from '../services/order-api';
import authApi from '@/features/auth/service/auth-api';

const orders = createQueryKeys('orders', {
  list: (params: OrderListParams) => ({
    queryKey: [params],
    queryFn: () => orderApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => orderApi.getDetail(id),
  }),
});

export const useOrderListQuery = (
  params: OrderListParams = {},
  options: QueryOptions<DataOrderListQuery> = {}
) => {
  
  return useQuery({
    ...orders.list(params),
    keepPreviousData: true,
    ...options,
  });
};

export const useUpdateOrderMutation = (id: number) => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderApi.update(id),
    onSuccess: () => {
      void message.success('Cập nhật thông tin người dùng thành công');
      void queryClient.invalidateQueries(orders.detail(id).queryKey);
    },
    onError: () => {
      void message.error('Cập nhật người dùng thất bại');
    },
  });
};

export const useOrderDetailQuery = (
  id: number,
  options: QueryOptions<DetailOrder> = {}
) => {
  return useQuery({
    ...orders.detail(id),
    ...options,
  });
};


export const useInfoQuery = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: authApi.getInfoMe,
  });
};
