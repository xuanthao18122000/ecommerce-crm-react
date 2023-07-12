import axiosClient from '@/apis/axios-client';
import {
  BodyUpdateProduct,
  ProductListParams,
  DataProduct,
  DataProductListQuery
} from './type';

const baseUrl = import.meta.env.VITE_API_PRODUCT_URL + 'products';

const categoryApi = {
  getList: (params: ProductListParams): Promise<DataProductListQuery> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<DataProduct> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update: (id: number) => (data: BodyUpdateProduct) =>
    axiosClient.put(`${baseUrl}/${id}`, data),

  add: (data: BodyUpdateProduct) => 
    axiosClient.post(baseUrl, data),

};

export default categoryApi;
