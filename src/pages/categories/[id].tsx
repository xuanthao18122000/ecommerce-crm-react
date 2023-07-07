import { BreadcrumbsWrapper, MainAction } from '@/components';
import {
  BodyUpdateCategory,
  CATEGORY_BREADCRUMBS,
  CATEGORY_NAME,
  CategoryFormCreate,
  useInfoQuery,
  useUpdateCategoryMutation,
  useCategoryDetailQuery,
} from '@/features/category';
import { differentObject } from '@/utils';
import { Card, Form } from 'antd';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useBoolean } from 'usehooks-ts';

const CategoryDetail: FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { value: isChanged, setTrue, setFalse } = useBoolean(false);
  const { data, isLoading } = useCategoryDetailQuery(+id!);
  const { mutate, isLoading: isUpdating } = useUpdateCategoryMutation(+id!);

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

  const handleFinish = (values: BodyUpdateCategory) => {
    const dataChanged = differentObject(values, initialValues);

    mutate(dataChanged, {
      onSuccess: () => {
        setFalse();
      },
    });
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={CATEGORY_BREADCRUMBS.detail()}
      isLoading={isUpdating}
    >
      <Card
        title={`Chi tiết ${CATEGORY_NAME}`}
        loading={isLoading}

      >
        <Form
          form={form}
          onFinish={handleFinish}
          onValuesChange={setTrue}
          initialValues={initialValues}
        >
          <CategoryFormCreate data={data} />
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

export default CategoryDetail;
