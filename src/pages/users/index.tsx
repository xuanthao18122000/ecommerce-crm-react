import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import { ListManagementWrapper } from '@/components';
import { FILTER_SCHEMA_PAGE_LIST, USER_PATH } from '@/data/constant';
import {
  DataUser,
  USER_BREADCRUMBS,
  USER_NAME,
  USER_ROLE_LIST,
  USER_STATUS_LIST,
  UserListParams,
  useUserListQuery,
} from '@/features/user';
import { TFilterSchema } from '@/ts/types';
import {
  columnAction,
  columnCreateAt,
  columnId,
  columnStatus,
  filterCreateAtRange,
  filterId,
  filterPhoneNumber,
  filterStatus,
  findObjInArrByKey,
  validator,
} from '@/utils';

const columns: ColumnsType<DataUser> = [
  columnId(),
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    align: 'center',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'type',
    align: 'center',
    render: (value: number) => findObjInArrByKey(USER_ROLE_LIST, value)?.label,
  },
  columnStatus(USER_STATUS_LIST),
  columnCreateAt(),
  columnAction(USER_PATH),
];

const filterSchema: TFilterSchema<UserListParams>[] = [
  filterId,
  {
    name: 'fullName',
    type: 'string',
    element: 'input',
    placeholder: 'Họ và tên',
    formItemProps: {
      rules: validator('name'),
    },
  },
  {
    name: 'email',
    type: 'string',
    element: 'input',
    placeholder: 'Email',
  },
  filterPhoneNumber,
  filterStatus(USER_STATUS_LIST),
  ...filterCreateAtRange,
  ...FILTER_SCHEMA_PAGE_LIST,
];

const Users: FC = () => {
  return (
    <ListManagementWrapper
      name={USER_NAME}
      path={USER_PATH}
      listBreadcrumbs={USER_BREADCRUMBS.list}
      useQueryFn={useUserListQuery}
      {...{
        columns,
        filterSchema,
      }}
    />
  );
};

export default Users;
