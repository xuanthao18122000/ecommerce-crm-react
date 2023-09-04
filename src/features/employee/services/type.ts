import { DateRangeParams, ImageData, ListData, PageParams } from '@/ts/types';

export type DataEmployee = {
  id: number;
  createdAt: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: number;
  status: number;
  type: number;
  images?: {
    avatar?: ImageData;
  };
};

export type EmployeeListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<DataEmployee, 'id' | 'fullName' | 'status' | 'email' | 'phoneNumber'>
  >;

export type BodyUpdateEmployee = Partial<
  Pick<DataEmployee, 'fullName' | 'phoneNumber' | 'email' | 'status' | 'address'> & {
    password: string;
    images: {
      avatar?: string;
    };
  }
>;

export type DataEmployeeListQuery = ListData<DataEmployee>;
