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
  editingKey: any;
}

const UserForm: React.FC<Props> = (props) => {
  const { isLoading, handleSubmit, form, isEditing, users, editingKey } = props;

  const filterOutEditedUser = isEditing ? users.filter(user => user.userId !== editingKey): users;
  const availableEmails = filterOutEditedUser.map((user: any) => user.email);

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
          { pattern: /^[A-Za-z\s]+$/, message: 'Please input a valid Name' },
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
              if (!availableEmails.includes(value.toLowerCase())) {
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
