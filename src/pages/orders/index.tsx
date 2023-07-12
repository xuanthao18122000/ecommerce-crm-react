import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import { ListManagementWrapper } from '@/components';
import { FILTER_SCHEMA_PAGE_LIST, ORDER_PATH } from '@/data/constant';
import {
  DataOrder,
  ORDER_BREADCRUMBS,
  ORDER_NAME,
  ORDER_STATUS_LIST,
  OrderListParams,
  useOrderListQuery,
} from '@/features/order';
import { TFilterSchema } from '@/ts/types';
import {
  columnAction,
  columnCreateAt,
  columnId,
  columnStatus,
  columnUpdateAt,
  filterCreateAtRange,
  filterId,
  filterPhoneNumber,
  filterStatus,
  findObjInArrByKey,
  formatDateToString,
  validator,
} from '@/utils';

const columns: ColumnsType<DataOrder> = [
  columnId(),
  {
    title: 'Mã đơn hàng',
    align: 'center',
    dataIndex: 'code',
  },
  {
    title: 'SDT đặt hàng',
    align: 'center',
    dataIndex: 'orderPhone',
  },
  {
    title: 'Ngày đặt hàng',
    align: 'center',
    dataIndex: 'orderDate',
    render: (value?: string) => formatDateToString(value, 'DD/MM/YYYY HH:mm:ss'),
  },
  columnStatus(ORDER_STATUS_LIST),
  columnCreateAt(),
  columnUpdateAt(),
  columnAction(ORDER_PATH),
];

const filterSchema: TFilterSchema<OrderListParams>[] = [
  filterId,
  {
    name: 'code',
    type: 'string',
    element: 'input',
    placeholder: 'Mã đơn hàng',
    formItemProps: {
      rules: validator('name'),
    },
  },
  {
    name: 'orderPhone',
    type: 'string',
    element: 'input',
    placeholder: 'SDT đặt hàng',
    formItemProps: {
      rules: validator('name'),
    },
  },
  {
    name: 'orderDate',
    type: 'string',
    element: 'input',
    placeholder: 'Ngày đặt hàng',
    formItemProps: {
      rules: validator('name'),
    },
  },
  filterStatus(ORDER_STATUS_LIST),
  ...filterCreateAtRange,
  ...FILTER_SCHEMA_PAGE_LIST,
];

const Orders: FC = () => {
  return (
    <ListManagementWrapper
      name={ORDER_NAME}
      path={ORDER_PATH}
      listBreadcrumbs={ORDER_BREADCRUMBS.list}
      useQueryFn={useOrderListQuery}
      {...{
        columns,
        filterSchema,
      }}
    />
  );
};

export default Orders;
