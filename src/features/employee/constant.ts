import { COLOR, EMPLOYEE_PATH } from '@/data/constant';

export const EMPLOYEE_NAME = 'nhân viên';
export const EMPLOYEE_BREADCRUMBS = {
  list: [
    {
      title: `Danh sách ${EMPLOYEE_NAME}`,
    },
  ],
  listPath: {
    title: `Danh sách ${EMPLOYEE_NAME}`,
    url: EMPLOYEE_PATH,
  },
  detail: () => [
    EMPLOYEE_BREADCRUMBS.listPath,
    {
      title: `Chi tiết ${EMPLOYEE_NAME}`,
    },
  ],
  add: () => [
    EMPLOYEE_BREADCRUMBS.listPath,
    {
      title: `Thêm ${EMPLOYEE_NAME}`,
    },
  ],
};

export const EMPLOYEE_STATUS = {
  PAUSED: {
    value: -2,
    label: 'Tạm ngưng',
    color: COLOR.LOGIN_BG,
  },
  ACTIVE: {
    value: 1,
    label: 'Đang hoạt động',
    color: COLOR.ACTIVE,
  },
  LOCKED: {
    value: -3,
    label: 'Đã khóa',
    color: COLOR.LOCKED,
  },
  INACTIVE: {
    value: -1,
    label: 'Dừng hoạt động',
    color: COLOR.DISABLED,
  },
};
export const EMPLOYEE_STATUS_LIST = Object.values(EMPLOYEE_STATUS);

export const EMPLOYEE_ROLE = {
  ADMIN: {
    value: 1,
    label: 'Admin',
  },
};
export const EMPLOYEE_ROLE_LIST = Object.values(EMPLOYEE_ROLE);
