import { ColorSelect, CustomDescriptions, UploadImage } from '@/components';
import { DescriptionsRecord } from '@/ts/types';
import { validator, validatorFn } from '@/utils';
import { Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { EMPLOYEE_ROLE_LIST, EMPLOYEE_STATUS_LIST } from '../constant';
import { DataEmployee } from '../services/type';

type Props = {
  data?: DataEmployee;
};

const EmployeeForm: FC<Props> = ({ data }) => {
  const descriptionData: DescriptionsRecord[] = [
    {
      labelText: 'Ảnh đại diện',
      descriptionElement: (
        <Form.Item name={['images', 'avatar']} className="m-auto text-center">
          <UploadImage />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Họ và tên',
      descriptionElement: (
        <Form.Item name="name" className="mb-0" rules={validator('required')}>
          <Input placeholder="Họ và tên" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Số điện thoại',
      descriptionElement: (
        <Form.Item
          name="phoneNumber"
          className="mb-0"
          rules={validator(['required', 'number'])}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Chức vụ',
      descriptionElement: (
        <Form.Item name="type" className="mb-0" rules={validator('required')}>
          <Select options={EMPLOYEE_ROLE_LIST} placeholder="Chọn chức vụ" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Địa chỉ',
      descriptionElement: (
        <Form.Item
          name="address"
          className="mb-0"
          rules={validator('required')}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>
      ),
    },

    {
      isShow: !!data,
      labelText: 'Trạng thái',
      descriptionElement: (
        <Form.Item name="status" className="mb-0">
          <ColorSelect options={EMPLOYEE_STATUS_LIST} className="!w-40" />
        </Form.Item>
      ),
    },
    {
      isShow: !!data,
      labelText: 'Thời điểm tạo',
      descriptionElement: dayjs(data?.createdAt).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      isShow: !data,
      labelText: 'Mật khẩu',
      descriptionElement: (
        <Form.Item
          name="password"
          className="mb-0"
          rules={validator(['required', 'noWhiteSpace']).concat(
            validatorFn('minAndMax')(8, 16)
          )}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
      ),
    },
  ];

  return (
    <CustomDescriptions
      data={descriptionData}
      labelStyle={{
        width: 200,
      }}
    />
  );
};

export default EmployeeForm;
