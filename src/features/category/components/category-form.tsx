import { ColorSelect, CustomDescriptions, UploadImage } from '@/components';
import { DescriptionsRecord } from '@/ts/types';
import { validator, validatorFn } from '@/utils';
import { Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { CATEGORY_STATUS_LIST } from '../constant';
import { DataCategory, DetailCategory } from '../services/type';

type Props = {
  data?: DetailCategory;
};

const CategoryFormCreate: FC<Props> = ({ data }) => {
  const descriptionData: DescriptionsRecord[] = [
    {
      labelText: 'Ảnh danh mục',
      descriptionElement: (
        <Form.Item name={['images', 'avatar']} className="m-auto text-center">
          <UploadImage />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Tên danh mục',
      descriptionElement: (
        <Form.Item name="name" className="mb-0" rules={validator('required')}>
          <Input placeholder="Tên danh mục" />
        </Form.Item>
      ),
    },

    {
      isShow: !!data,
      labelText: 'Trạng thái',
      descriptionElement: (
        <Form.Item name="status" className="mb-0">
          <ColorSelect options={CATEGORY_STATUS_LIST} className="!w-40" />
        </Form.Item>
      ),
    },
    {
      isShow: !!data,
      labelText: 'Thời điểm tạo',
      descriptionElement: dayjs(data?.data.createdAt).format('DD/MM/YYYY HH:mm:ss'),
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

export default CategoryFormCreate;
