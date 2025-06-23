import React from 'react';
import { Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadForm = ({ form, onSubmit }) => {
  const normFile = (e) => {
    return e && e.fileList && e.fileList.length > 0 ? e.fileList[0].originFileObj : null;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      className="upload-form"
    >
      <Form.Item
        name="image"
        label="Upload Image"
        valuePropName="file"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please upload an image' }]}
      >
        <Upload
          accept="image/*"
          beforeUpload={() => false}
          maxCount={1}
          showUploadList={{ showRemoveIcon: true }}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Predict
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadForm;
