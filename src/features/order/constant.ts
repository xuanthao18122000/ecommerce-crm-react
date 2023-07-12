import { COLOR, ORDER_PATH } from '@/data/constant';

export const ORDER_NAME = 'đơn hàng';
export const ORDER_BREADCRUMBS = {
  list: [
    {
      title: `Danh sách ${ORDER_NAME}`,
    },
  ],
  listPath: {
    title: `Danh sách ${ORDER_NAME}`,
    url: ORDER_PATH,
  },
  detail: () => [
    ORDER_BREADCRUMBS.listPath,
    {
      title: `Chi tiết ${ORDER_NAME}`,
    },
  ],
  add: () => [
    ORDER_BREADCRUMBS.listPath,
    {
      title: `Thêm ${ORDER_NAME}`,
    },
  ],
};

export const ORDER_STATUS = {
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
export const ORDER_STATUS_LIST = Object.values(ORDER_STATUS);

export const ORDER_ROLE = {
  ADMIN: {
    value: 1,
    label: 'Admin',
  },
};
export const ORDER_ROLE_LIST = Object.values(ORDER_ROLE);
