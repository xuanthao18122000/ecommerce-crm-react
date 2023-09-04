import { cloneDeep } from 'lodash';
import { lazy } from 'react';
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';
// import { EnumPostCategoryType, POST_NAME, POST_PATH } from '@/features/post';
import { USER_NAME } from '@/features/user';
import PrivateRoute from '@/routes/private-route';
import { capitalizeFirstLetter } from '@/utils';
import { Link } from 'react-router-dom';
import { CATEGORY_PATH, DASHBOARD_PATH, EMPLOYEE_PATH, ORDER_PATH, PRODUCT_PATH, USER_PATH } from './path';
import { TypeNavs, TypeRoutes } from './type-navs';
import { BsPostcard } from 'react-icons/bs';
import { CATEGORY_NAME } from '@/features/category/constant';
import { ORDER_NAME } from '@/features/order';
import Orders from '@/pages/orders';
import Products from '@/pages/products';
import ProductAdd from '@/pages/products/add';
import ProductDetail from '@/pages/products/[id]';
import { EMPLOYEE_NAME } from '@/features/employee';

const Dashboard = lazy(() => import('@/pages/dashboard'));

const Users = lazy(() => import('@/pages/users'));
const UserDetail = lazy(() => import('@/pages/users/[id]'));
const UserAdd = lazy(() => import('@/pages/users/add'));

const Employees = lazy(() => import('@/pages/employees'));
const EmployeeDetail = lazy(() => import('@/pages/employees/[id]'));
const EmployeeAdd = lazy(() => import('@/pages/employees/add'));

const Categories = lazy(() => import('@/pages/categories'));
const CategoryDetail = lazy(() => import('@/pages/categories/[id]'));
const CategoryAdd = lazy(() => import('@/pages/categories/add'));



const navs: TypeNavs[] = [
  {
    key: DASHBOARD_PATH,
    label: 'dashboard',
    icon: <AiOutlineDashboard size={18} />,
    element: <Dashboard />,
  },
  {
    key: PRODUCT_PATH,
    label: `Quản lý sản phẩm`,
    icon: <BsPostcard size={18} />,
    element: <Products />,
    children: [
      {
        key: '/:id',
        element: <ProductDetail />,
      },
      {
        key: '/add',
        element: <ProductAdd />,
      },
    ],
  },
  {
    key: CATEGORY_PATH,
    label: `Quản lý ${CATEGORY_NAME}`,
    icon: <BsPostcard size={18} />,
    element: <Categories />,
    children: [
      {
        key: '/:id',
        element: <CategoryDetail />,
      },
      {
        key: '/add',
        element: <CategoryAdd />,
      },
    ],
  },
  {
    key: ORDER_PATH,
    label: `Quản lý ${ORDER_NAME}`,
    icon: <BsPostcard size={18} />,
    element: <Orders />,
    children: [
      // {
      //   key: '/:id',
      //   element: <OrderDetail />,
      // },
    ],
  },
  {
    key: USER_PATH,
    label: `Quản lý ${USER_NAME}`,
    icon: <AiOutlineUser size={18} />,
    element: <Users />,
    children: [
      {
        key: '/:id',
        element: <UserDetail />,
      },
      {
        key: '/add',
        element: <UserAdd />,
      },
    ],
  },
  {
    key: EMPLOYEE_PATH,
    label: `Quản lý ${EMPLOYEE_NAME}`,
    icon: <AiOutlineUser size={18} />,
    element: <Employees />,
    children: [
      {
        key: '/:id',
        element: <EmployeeDetail />,
      },
      {
        key: '/add',
        element: <EmployeeAdd />,
      },
    ],
  },
  {
    key: "KM",
    label: 'Quản lý khuyến mãi',
    icon: <AiOutlineDashboard size={18} />,

  },
  {
    key: "KM",
    label: 'Quản lý thông báo',
    icon: <AiOutlineDashboard size={18} />,

  },

];

const getRoutes = (arr: TypeRoutes[], nav: TypeNavs, basePath = '') => {
  if (nav.children) {
    for (const n of nav.children) {
      getRoutes(arr, n, basePath + nav.key);
    }
  }
  if (!nav.element) return;

  arr.push({
    path: basePath + nav.key,
    element: nav.element && <PrivateRoute>{nav.element}</PrivateRoute>,
  });
  return arr;
};

const addLink = (nav: TypeNavs, path: string) => {
  return nav.children ? (
    capitalizeFirstLetter(nav.label as string)
  ) : (
    <Link to={path}>{capitalizeFirstLetter(nav.label as string)}</Link>
  );
};

const getShowNavigation = (
  nav: TypeNavs,
  basePath = ''
): TypeNavs | undefined => {
  if (!nav.label) return;
  if (nav.children) {
    const arr: TypeNavs[] = [];
    for (const n of nav.children) {
      const formatN = getShowNavigation(n, basePath + nav.key);
      if (formatN) arr.push(formatN);
    }

    nav.children = arr.length > 0 ? arr : undefined;
  }

  return {
    key: basePath + nav.key,
    icon: nav.icon,
    title: addLink(nav, basePath + nav.key),
    label: addLink(nav, basePath + nav.key),
    children: nav.children,
    element: nav.element,
  };
};

const menuList: TypeNavs[] = [];
const routeList: TypeRoutes[] = [];

for (const nav of navs) {
  const nav1 = cloneDeep(nav);
  const n = getShowNavigation(nav1);
  n && menuList.push(n);

  const nav2 = cloneDeep(nav);
  getRoutes(routeList, nav2);
}

export { menuList, routeList };
