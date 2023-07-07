import { COLOR, CATEGORY_PATH } from '@/data/constant';

export const CATEGORY_NAME = 'danh mục';
export const CATEGORY_BREADCRUMBS = {
  list: [
    {
      title: `Danh sách ${CATEGORY_NAME}`,
    },
  ],
  listPath: {
    title: `Danh sách ${CATEGORY_NAME}`,
    url: CATEGORY_PATH,
  },
  detail: () => [
    CATEGORY_BREADCRUMBS.listPath,
    {
      title: `Chi tiết ${CATEGORY_NAME}`,
    },
  ],
  add: () => [
    CATEGORY_BREADCRUMBS.listPath,
    {
      title: `Thêm ${CATEGORY_NAME}`,
    },
  ],
};

export const CATEGORY_STATUS = {
  ACTIVE: {
    value: 1,
    label: 'Đang hoạt động',
    color: COLOR.ACTIVE,
  },
  INACTIVE: {
    value: -1,
    label: 'Dừng hoạt động',
    color: COLOR.DISABLED,
  },
};
export const CATEGORY_STATUS_LIST = Object.values(CATEGORY_STATUS);

export const CATEGORY_ROLE = {
  ADMIN: {
    value: 1,
    label: 'Admin',
  },
};
export const CATEGORY_ROLE_LIST = Object.values(CATEGORY_ROLE);
