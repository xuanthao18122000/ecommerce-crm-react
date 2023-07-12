import { PRODUCT_PATH } from '@/data/constant';
import { useApp } from '@/hooks';
import { QueryOptions } from '@/ts/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DataProduct, DataProductListQuery, DetailProduct, ProductListParams } from '../services/type';
import productApi from '../services/product-api';
import authApi from '@/features/auth/service/auth-api';

const products = createQueryKeys('products', {
  list: (params: ProductListParams) => ({
    queryKey: [params],
    queryFn: () => productApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => productApi.getDetail(id),
  }),
});

export const useProductListQuery = (
  params: ProductListParams = {},
  options: QueryOptions<DataProductListQuery> = {}
) => {
  
  return useQuery({
    ...products.list(params),
    keepPreviousData: true,
    ...options,
  });
};

export const useProductDetailQuery = (
  id: number,
  options: QueryOptions<DetailProduct> = {}
) => {
  return useQuery({
    ...products.detail(id),
    ...options,
  });
};

export const useUpdateProductMutation = (id: number) => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productApi.update(id),
    onSuccess: () => {
      void message.success('Cập nhật thông tin sản phẩm thành công');
      void queryClient.invalidateQueries(products.detail(id).queryKey);
    },
    onError: () => {
      void message.error('Cập nhật sản phẩm thất bại');
    },
  });
};

export const useAddProductMutation = () => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: productApi.add,
    onSuccess: () => {
      void message.success('Tạo sản phẩm thành công');
      void queryClient.invalidateQueries(products.list._def);
      navigate(PRODUCT_PATH);
    },
    onError: () => {
      void message.error('Tạo sản phẩm thất bại');
    },
  });
};

export const useInfoQuery = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: authApi.getInfoMe,
  });
};
