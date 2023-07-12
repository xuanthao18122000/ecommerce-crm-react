import { BreadcrumbsWrapper, MainAction } from '@/components';
import { CATEGORY_PATH } from '@/data/constant';
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

const CategoryAdd: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddCategoryMutation();

  const handleFinish = (values: BodyUpdateCategory) => {
    mutate(values);
  };

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
          onCancel={() => navigate(CATEGORY_PATH)}
          isOkLoading={isLoading}
          isCancelDisabled={isLoading}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default CategoryAdd;
