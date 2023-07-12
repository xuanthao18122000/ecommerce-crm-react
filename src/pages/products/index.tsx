import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import { ListManagementWrapper } from '@/components';
import { FILTER_SCHEMA_PAGE_LIST, PRODUCT_PATH } from '@/data/constant';
import {
  DataProduct,
  PRODUCT_BREADCRUMBS,
  PRODUCT_NAME,
  PRODUCT_STATUS_LIST,
  ProductListParams,
  useProductListQuery,
} from '@/features/product';
import { TFilterSchema } from '@/ts/types';
import {
  columnAction,
  columnCreateAt,
  columnId,
  columnStatus,
  columnUpdateAt,
  filterCreateAtRange,
  filterId,
  filterStatus,
  validator,
} from '@/utils';

const columns: ColumnsType<DataProduct> = [
  columnId(),
  {
    title: 'Tên sản phẩm',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: 'Mã sản phẩm',
    align: 'center',
    dataIndex: 'code',
  },
  {
    title: 'Giá sản phẩm',
    align: 'center',
    dataIndex: 'price',
  },
  columnStatus(PRODUCT_STATUS_LIST),
  columnCreateAt(),
  columnUpdateAt(),
  columnAction(PRODUCT_PATH),
];

const filterSchema: TFilterSchema<ProductListParams>[] = [
  filterId,
  {
    name: 'name',
    type: 'string',
    element: 'input',
    placeholder: 'Tên sản phẩm',
    formItemProps: {
      rules: validator('name'),
    },
  },
  {
    name: 'code',
    type: 'string',
    element: 'input',
    placeholder: 'Mã sản phẩm',
    formItemProps: {
      rules: validator('name'),
    },
  },
  {
    name: 'price',
    type: 'string',
    element: 'input',
    placeholder: 'Giá sản phẩm',
    formItemProps: {
      rules: validator('name'),
    },
  },
  filterStatus(PRODUCT_STATUS_LIST),
  ...filterCreateAtRange,
  ...FILTER_SCHEMA_PAGE_LIST,
];

const Products: FC = () => {
  return (
    <ListManagementWrapper
      name={PRODUCT_NAME}
      path={PRODUCT_PATH}
      listBreadcrumbs={PRODUCT_BREADCRUMBS.list}
      useQueryFn={useProductListQuery}
      {...{
        columns,
        filterSchema,
      }}
    />
  );
};

export default Products;
