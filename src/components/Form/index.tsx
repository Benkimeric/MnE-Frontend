import { Button, Form } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';

import './Form.scss';

interface Props {
  handleSubmit?: (data: any) => void;
  isLoading?: boolean;
  initialValues?: any;
  buttonText?: string;
  children?: ReactNode;
  formName: string;
  className?: string;
  hasFooter?: boolean;
  form: any;
  isEditing?: boolean;
}

const FormComponent: React.FC<Props> = (props) => {
  const {
    handleSubmit,
    isLoading,
    initialValues,
    buttonText,
    children,
    formName,
    className,
    hasFooter,
    form,
    isEditing,
  } = props;
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: any) => {
    handleSubmit && handleSubmit(values);
  };

  return (
    <Form
      layout={'vertical'}
      form={form}
      name={formName}
      className={className}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      {children}
      {!hasFooter && (
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={
                (!isEditing && !form.isFieldsTouched(true)) ||
                form.getFieldsError().filter(({ errors }: any) => errors.length)
                  .length > 0
              }
            >
              {buttonText}
            </Button>
          )}
        </Form.Item>
      )}
    </Form>
  );
};

FormComponent.defaultProps = {
  buttonText: 'Submit',
  className: '',
  isLoading: false,
  hasFooter: false,
  isEditing: false,
};

export default FormComponent;
