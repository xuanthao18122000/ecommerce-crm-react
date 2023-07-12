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
};

export default orderApi;
