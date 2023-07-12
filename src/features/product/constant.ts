import { COLOR, PRODUCT_PATH } from '@/data/constant';

export const PRODUCT_NAME = 'sản phẩm';
export const PRODUCT_BREADCRUMBS = {
  list: [
    {
      title: `Danh sách ${PRODUCT_NAME}`,
    },
  ],
  listPath: {
    title: `Danh sách ${PRODUCT_NAME}`,
    url: PRODUCT_PATH,
  },
  detail: () => [
    PRODUCT_BREADCRUMBS.listPath,
    {
      title: `Chi tiết ${PRODUCT_NAME}`,
    },
  ],
  add: () => [
    PRODUCT_BREADCRUMBS.listPath,
    {
      title: `Thêm ${PRODUCT_NAME}`,
    },
  ],
};

export const PRODUCT_STATUS = {
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
export const PRODUCT_STATUS_LIST = Object.values(PRODUCT_STATUS);

