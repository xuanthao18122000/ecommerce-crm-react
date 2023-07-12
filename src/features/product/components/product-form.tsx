import { ColorSelect, CustomDescriptions, UploadImage } from '@/components';
import { DescriptionsRecord } from '@/ts/types';
import { validator, validatorFn } from '@/utils';
import { Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { DataProduct } from '../services/type';
import { PRODUCT_STATUS_LIST } from '../constant';

type Props = {
  data?: DataProduct;
};

const UserForm: FC<Props> = ({ data }) => {
  const descriptionData: DescriptionsRecord[] = [
    {
      labelText: 'Hình sản phẩm',
      descriptionElement: (
        <Form.Item name={['images', 'avatar']} className="m-auto text-center">
          <UploadImage />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Tên sản phẩm',
      descriptionElement: (
        <Form.Item name="name" className="mb-0" rules={validator('required')}>
          <Input placeholder="Tên sản phẩm" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Mã sản phẩm',
      descriptionElement: (
        <Form.Item
          name="code"
          className="mb-0"
          rules={validator(['required'])}
        >
          <Input placeholder="Nhập mã sản phẩm" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Danh mục',
      descriptionElement: (
        <Form.Item name="type" className="mb-0" rules={validator('required')}>
          <Select options={PRODUCT_STATUS_LIST} placeholder="Chọn danh mục" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Giá sản phẩm',
      descriptionElement: (
        <Form.Item
          name="price"
          className="mb-0"
          rules={validator('required')}
        >
          <Input placeholder="Nhập giá sản phẩm" />
        </Form.Item>
      ),
    },

    {
      isShow: !!data,
      labelText: 'Trạng thái',
      descriptionElement: (
        <Form.Item name="status" className="mb-0">
          <ColorSelect options={PRODUCT_STATUS_LIST} className="!w-40" />
        </Form.Item>
      ),
    },
    {
      isShow: !!data,
      labelText: 'Thời điểm tạo',
      descriptionElement: dayjs(data?.createdAt).format('DD/MM/YYYY HH:mm:ss'),
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

export default UserForm;
