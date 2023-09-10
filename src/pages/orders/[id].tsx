import { BreadcrumbsWrapper, MainAction } from '@/components';
import {
  BodyUpdateOrder,
  ORDER_BREADCRUMBS,
  ORDER_NAME,
  useUpdateOrderMutation,
  useOrderDetailQuery,
} from '@/features/order';
import { differentObject } from '@/utils';
import { Card, Form } from 'antd';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useBoolean } from 'usehooks-ts';

const OrderDetail: FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { value: isChanged, setTrue, setFalse } = useBoolean(false);
  const { data, isLoading } = useOrderDetailQuery(+id!);
  const { mutate, isLoading: isUpdating } = useUpdateOrderMutation(+id!);

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

  const handleFinish = (values: BodyUpdateOrder) => {
    const dataChanged = differentObject(values, initialValues);

    mutate(dataChanged, {
      onSuccess: () => {
        setFalse();
      },
    });
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={ORDER_BREADCRUMBS.detail()}
      isLoading={isUpdating}
    >
      <Card
        title={`Chi tiết ${ORDER_NAME}`}
        loading={isLoading}

      >
        <Form
          form={form}
          onFinish={handleFinish}
          onValuesChange={setTrue}
          initialValues={initialValues}
        >
          {/* <OrderFormCreate data={data} /> */}
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

export default OrderDetail;
