import axiosClient from '@/apis/axios-client';
import {
  BodyUpdateOrder,
  OrderListParams,
  DataOrder,
  DataOrderListQuery
} from './type';

const baseUrl = import.meta.env.VITE_API_ORDER_URL + 'orders';

const orderApi = {
  getList: (params: OrderListParams): Promise<DataOrderListQuery> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<DataOrder> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update: (id: number) => (data: BodyUpdateOrder) =>
  axiosClient.put(`${baseUrl}/${id}`, data),

  add: (data: BodyUpdateOrder) => 
    axiosClient.post(baseUrl, data),
};

export default orderApi;
