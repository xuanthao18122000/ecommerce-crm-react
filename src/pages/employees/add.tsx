import { BreadcrumbsWrapper, MainAction } from '@/components';
import { EMPLOYEE_PATH } from '@/data/constant';
import {
  BodyUpdateEmployee,
  EMPLOYEE_BREADCRUMBS,
  EMPLOYEE_NAME,
  EmployeeForm,
  useAddEmployeeMutation,
} from '@/features/employee';
import { Button, Card, Form } from 'antd';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeAdd: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddEmployeeMutation();

  const handleFinish = (values: BodyUpdateEmployee) => {
    mutate(values);
  };

  const setDefaultPassword = useCallback(() => {
    form.setFieldValue('password', '123456a@');
  }, [form]);

  return (
    <BreadcrumbsWrapper breadcrumbs={EMPLOYEE_BREADCRUMBS.add()}>
      <Card title={`Thêm ${EMPLOYEE_NAME}`}>
        <Form form={form} onFinish={handleFinish} disabled={isLoading}>
          <EmployeeForm />
        </Form>
        <div className="mt-4">
          <Button onClick={setDefaultPassword}>
            Đặt mật khẩu mặc định là:{'  '}
            <strong className="text-base">123456a@</strong>
          </Button>
        </div>
        <MainAction
          isAddType
          cancelText="Trở về danh sách"
          onOk={form.submit}
          onCancel={() => navigate(EMPLOYEE_PATH)}
          isOkLoading={isLoading}
          isCancelDisabled={isLoading}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default EmployeeAdd;
