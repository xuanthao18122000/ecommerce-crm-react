import { DateRangeParams, ImageData, ListData, PageParams } from '@/ts/types';


export type DataOrder = {
  id: number;
  code: string;
  status: number;
  orderDate: string;
  orderPhone: string;
  createdAt: string;
  updatedAt: string;
};

export type DetailOrder = {
  code: number,
  data: DataOrder,
  msg: string;
  success: boolean;
};

export type OrderListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<DataOrder, 'id' | 'code' | 'status' | 'orderDate' | 'orderPhone' | 'createdAt' | 'updatedAt'>
  >;

export type BodyUpdateOrder = Partial<
  Pick<DataOrder, 'id' | 'code' | 'status' | 'orderDate' | 'orderPhone' | 'createdAt' | 'updatedAt'> & {
  }
>;

export type DataOrderListQuery = ListData<DataOrder>;
