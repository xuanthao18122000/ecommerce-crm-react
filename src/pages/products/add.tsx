import { BreadcrumbsWrapper, MainAction } from '@/components';
import { PRODUCT_PATH } from '@/data/constant';
import {
  BodyUpdateProduct,
  PRODUCT_BREADCRUMBS,
  PRODUCT_NAME,
  ProductFormCreate,
  useAddProductMutation
} from '@/features/product';
import { Button, Card, Form } from 'antd';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductAdd: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddProductMutation();

  const handleFinish = (values: BodyUpdateProduct) => {
    mutate(values);
  };

  const setDefaultPassword = useCallback(() => {
    form.setFieldValue('password', '123456a@');
  }, [form]);

  return (
    <BreadcrumbsWrapper breadcrumbs={PRODUCT_BREADCRUMBS.add()}>
      <Card title={`Thêm ${PRODUCT_NAME}`}>
        <Form form={form} onFinish={handleFinish} disabled={isLoading}>
          <ProductFormCreate />
        </Form>
        <MainAction
          isAddType
          cancelText="Trở về danh sách"
          onOk={form.submit}
          onCancel={() => navigate(PRODUCT_PATH)}
          isOkLoading={isLoading}
          isCancelDisabled={isLoading}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default ProductAdd;
