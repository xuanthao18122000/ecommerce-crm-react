import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import { ListManagementWrapper } from '@/components';
import { FILTER_SCHEMA_PAGE_LIST, EMPLOYEE_PATH } from '@/data/constant';
import {
  DataEmployee,
  EMPLOYEE_BREADCRUMBS,
  EMPLOYEE_NAME,
  EMPLOYEE_ROLE_LIST,
  EMPLOYEE_STATUS_LIST,
  EmployeeListParams,
  useEmployeeListQuery,
} from '@/features/employee';
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

const columns: ColumnsType<DataEmployee> = [
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
    render: (value: number) => findObjInArrByKey(EMPLOYEE_ROLE_LIST, value)?.label,
  },
  columnStatus(EMPLOYEE_STATUS_LIST),
  columnCreateAt(),
  columnAction(EMPLOYEE_PATH),
];

const filterSchema: TFilterSchema<EmployeeListParams>[] = [
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
  filterStatus(EMPLOYEE_STATUS_LIST),
  ...filterCreateAtRange,
  ...FILTER_SCHEMA_PAGE_LIST,
];

const Employees: FC = () => {
  return (
    <ListManagementWrapper
      name={EMPLOYEE_NAME}
      path={EMPLOYEE_PATH}
      listBreadcrumbs={EMPLOYEE_BREADCRUMBS.list}
      useQueryFn={useEmployeeListQuery}
      {...{
        columns,
        filterSchema,
      }}
    />
  );
};

export default Employees;
