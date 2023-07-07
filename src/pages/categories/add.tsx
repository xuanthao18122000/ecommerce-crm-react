import { BreadcrumbsWrapper, MainAction } from '@/components';
import { USER_PATH } from '@/data/constant';
import {
  BodyUpdateCategory,
  CATEGORY_BREADCRUMBS,
  CATEGORY_NAME,
  CategoryFormCreate,
  useAddCategoryMutation
} from '@/features/category';
import { Button, Card, Form } from 'antd';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAdd: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddCategoryMutation();

  const handleFinish = (values: BodyUpdateCategory) => {
    mutate(values);
  };

  const setDefaultPassword = useCallback(() => {
    form.setFieldValue('password', '123456a@');
  }, [form]);

  return (
    <BreadcrumbsWrapper breadcrumbs={CATEGORY_BREADCRUMBS.add()}>
      <Card title={`Thêm ${CATEGORY_NAME}`}>
        <Form form={form} onFinish={handleFinish} disabled={isLoading}>
          <CategoryFormCreate />
        </Form>
        <MainAction
          isAddType
          cancelText="Trở về danh sách"
          onOk={form.submit}
          onCancel={() => navigate(USER_PATH)}
          isOkLoading={isLoading}
          isCancelDisabled={isLoading}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default UserAdd;
