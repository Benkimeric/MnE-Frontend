import { Button } from 'antd';
import React, { ReactNode } from 'react';

interface Props {
  buttonText?: string;
  size?: any;
  icon?: any;
  shape?: any;
  onClick?: () => void;
  children?: ReactNode;
}

const ButtonComponent: React.FC<Props> = props => {
  const { buttonText, size, icon, onClick, shape, children } = props;

  return (
    <Button onClick={onClick} shape={shape} type="primary" icon={icon} size={size}>
      {children}{!children && buttonText}
    </Button>
  );
};

ButtonComponent.defaultProps = {
  buttonText: '',
  size: 'large',
  shape: '',
};

export default ButtonComponent;
