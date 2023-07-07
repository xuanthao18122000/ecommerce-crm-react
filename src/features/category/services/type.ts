import { DateRangeParams, ImageData, ListData, PageParams } from '@/ts/types';


export type DataCategory = {
  id: number;
  name: string;
  status: number;
  logs: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type DetailCategory = {
  code: number,
  data: DataCategory,
  msg: string;
  success: boolean;
};

export type CategoryListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<DataCategory, 'id' | 'name' | 'status' | 'logs' | 'createdAt' | 'updatedAt'>
  >;

export type BodyUpdateCategory = Partial<
  Pick<DataCategory, 'id' | 'name' | 'status' | 'logs' | 'createdAt' | 'updatedAt'> & {
  }
>;

export type DataCategoryListQuery = ListData<DataCategory>;
