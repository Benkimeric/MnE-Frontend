import { AutoComplete, Form } from 'antd';
import React, { useState } from 'react';
import FormComponent from '../index';

import './UserRoleForm.scss';

interface Props {
  handleSubmit: (data: any) => void;
  isLoading: boolean;
  users: any[];
  form: any;
  handleChange: (data: string) => void;
}

const UserRoleForm: React.FC<Props> = (props) => {
  const { isLoading, users, handleSubmit, form, handleChange } = props;

  const [options, setOptions] = useState<{ value: string }[]>([]);

  const emails = users.map((user: any) => {
    return { value: user.email };
  });

  const onSearch = (searchText: string) => {
    setOptions(!searchText ? [] : emails);
  };

  const onChange = (data: string) => {
    handleChange(data);
  };

  return (
    <FormComponent
      handleSubmit={handleSubmit}
      formName="user-role-form"
      isLoading={isLoading}
      buttonText="Add User"
      form={form}
    >
      <Form.Item
        name="email"
        label={'Email'}
        rules={[
          { required: true, message: 'Please enter valid email' },
          () => ({
            validator(rule, value) {
              if (value && emails.find(email => email.value === value.toLowerCase())) {
                return Promise.resolve();
              }
              return Promise.reject(
                'An account with that email does not exist'
              );
            },
          }),
        ]}
      >
        <AutoComplete
          options={options}
          style={{}}
          onSearch={onSearch}
          onChange={onChange}
          filterOption={(inputValue, option: any) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
    </FormComponent>
  );
};

export default UserRoleForm;
