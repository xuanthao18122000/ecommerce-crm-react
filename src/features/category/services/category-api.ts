import axiosClient from '@/apis/axios-client';
import {
  BodyUpdateCategory,
  CategoryListParams,
  DataCategory,
  DataCategoryListQuery
} from './type';

const baseUrl = import.meta.env.VITE_API_PRODUCT_URL + 'categories';

const categoryApi = {
  getList: (params: CategoryListParams): Promise<DataCategoryListQuery> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<DataCategory> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update: (id: number) => (data: BodyUpdateCategory) =>
    axiosClient.put(`${baseUrl}/${id}`, data),

  add: (data: BodyUpdateCategory) => 
    axiosClient.post(baseUrl, data),

};

export default categoryApi;
