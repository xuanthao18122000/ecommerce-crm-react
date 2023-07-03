import { DateRangeParams, ImageData, ListData, PageParams } from '@/ts/types';

export type DataUser = {
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

export type UserListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<DataUser, 'id' | 'fullName' | 'status' | 'email' | 'phoneNumber'>
  >;

export type BodyUpdateUser = Partial<
  Pick<DataUser, 'fullName' | 'phoneNumber' | 'email' | 'status' | 'address'> & {
    password: string;
    images: {
      avatar?: string;
    };
  }
>;

export type DataUserListQuery = ListData<DataUser>;
