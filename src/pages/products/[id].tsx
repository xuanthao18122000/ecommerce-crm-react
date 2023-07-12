import { BreadcrumbsWrapper, MainAction } from '@/components';
import {
  BodyUpdateProduct,
  PRODUCT_BREADCRUMBS,
  PRODUCT_NAME,
  ProductFormCreate,
  useUpdateProductMutation,
  useProductDetailQuery,
} from '@/features/product';
import { differentObject } from '@/utils';
import { Card, Form } from 'antd';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useBoolean } from 'usehooks-ts';

const ProductDetail: FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { value: isChanged, setTrue, setFalse } = useBoolean(false);
  const { data, isLoading } = useProductDetailQuery(+id!);
  const { mutate, isLoading: isUpdating } = useUpdateProductMutation(+id!);

  const initialValues = useMemo(
    () =>
    data && {
      ...data.data,
    },
    [data]
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleReset = () => {
    form.resetFields();
    setFalse();
  };

  const handleFinish = (values: BodyUpdateProduct) => {
    const dataChanged = differentObject(values, initialValues);

    mutate(dataChanged, {
      onSuccess: () => {
        setFalse();
      },
    });
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={PRODUCT_BREADCRUMBS.detail()}
      isLoading={isUpdating}
    >
      <Card
        title={`Chi tiết ${PRODUCT_NAME}`}
        loading={isLoading}

      >
        <Form
          form={form}
          onFinish={handleFinish}
          onValuesChange={setTrue}
          initialValues={initialValues}
        >
          <ProductFormCreate data={data?.data} />
        </Form>
        <MainAction
          onOk={form.submit}
          onCancel={handleReset}
          isCancelDisabled={!isChanged}
          isOkLoading={isUpdating}
          isOkDisabled={!isChanged}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default ProductDetail;
