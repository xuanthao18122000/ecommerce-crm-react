import { DateRangeParams, ImageData, ListData, PageParams } from '@/ts/types';

export type DataProduct = {
  id: number;
  name: string;
  code: string;
  description: string;
  price: number;
  status: number;
  category: number;
  images?: {
    list?: Array<string>;
  };
  createdAt: string,
};

export type DetailProduct = {
  code: number,
  data: DataProduct,
  msg: string;
  success: boolean;
};

export type ProductListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<DataProduct, 'id' | 'name' | 'code' | 'description' | 'price' | 'status' | 'images' |'createdAt' >
  >;

export type BodyUpdateProduct = Partial<
  Pick<DataProduct, 'name' | 'code' | 'description' | 'price' | 'status' | 'images' |'createdAt'> & {
    password: string;
    images: {
      avatar?: string;
    };
  }
>;

export type DataProductListQuery = ListData<DataProduct>;
