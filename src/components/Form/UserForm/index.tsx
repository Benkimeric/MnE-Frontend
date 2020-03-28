import { Form, Input, Select } from 'antd';
import React from 'react';
import FormComponent from '../index';

const { Option } = Select;

interface Props {
  handleSubmit: (data: any) => void;
  isLoading: boolean;
  users: any[];
  handleChange: (data: string) => void;
  form: any;
  isEditing: boolean;
}

const UserForm: React.FC<Props> = (props) => {
  const { isLoading, handleSubmit, form, isEditing, users } = props;

  const availableEmails = users.map((user) => user.email);

  return (
    <FormComponent
      handleSubmit={handleSubmit}
      formName="user-role-form"
      isLoading={isLoading}
      buttonText={isEditing ? 'Save' : 'Submit'}
      form={form}
      isEditing={isEditing}
    >
      <Form.Item
        name="fullName"
        label="Name"
        rules={[
          { required: true, message: 'Please input Name' },
          { pattern: /^[A-Za-z]+$/, message: 'Please input a valid Name' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input Email' },
          { type: 'email', message: 'Please input a valid Email' },
          () => ({
            validator(rule, value) {
              if (value && !availableEmails.includes(value.toLowerCase())) {
                return Promise.resolve();
              }
              return Promise.reject(
                'An account with the same email already exists'
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select Gender' }]}
      >
        <Select size={'large'} allowClear>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>
    </FormComponent>
  );
};

export default UserForm;
