import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import { ListManagementWrapper } from '@/components';
import { FILTER_SCHEMA_PAGE_LIST, CATEGORY_PATH } from '@/data/constant';
import {
  DataCategory,
  CATEGORY_BREADCRUMBS,
  CATEGORY_NAME,
  CATEGORY_STATUS_LIST,
  CategoryListParams,
  useCategoryListQuery,
} from '@/features/category';
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
  validator,
} from '@/utils';

const columns: ColumnsType<DataCategory> = [
  columnId(),
  {
    title: 'Tên danh mục',
    align: 'center',
    dataIndex: 'name',
  },
  columnStatus(CATEGORY_STATUS_LIST),
  columnCreateAt(),
  columnUpdateAt(),
  columnAction(CATEGORY_PATH),
];

const filterSchema: TFilterSchema<CategoryListParams>[] = [
  filterId,
  {
    name: 'name',
    type: 'string',
    element: 'input',
    placeholder: 'Tên danh mục',
    formItemProps: {
      rules: validator('name'),
    },
  },
  filterStatus(CATEGORY_STATUS_LIST),
  ...filterCreateAtRange,
  ...FILTER_SCHEMA_PAGE_LIST,
];

const Categories: FC = () => {
  return (
    <ListManagementWrapper
      name={CATEGORY_NAME}
      path={CATEGORY_PATH}
      listBreadcrumbs={CATEGORY_BREADCRUMBS.list}
      useQueryFn={useCategoryListQuery}
      {...{
        columns,
        filterSchema,
      }}
    />
  );
};

export default Categories;
