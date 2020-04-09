import { LeftOutlined } from '@ant-design/icons';
import React from 'react';
import Button from '../Button';
import './BackButton.scss';

interface Props {
  onClick?: () => void;
  backText?: string;
  backUrl?: string;
  history?: any;
}

const BackButtonComponent: React.FC<Props> = (props) => {
  const { backText, history, backUrl, onClick } = props;

  const handleBack = () => {
    if (backUrl) {
      history?.push(backUrl);
    }
    onClick && onClick();
  };

  return (
    <div className="back-button">
      <Button shape="circle" onClick={handleBack}>
        <LeftOutlined style={{ color: '#fff' }} />
      </Button>
      <h1 className="back-text">{backText}</h1>
    </div>
  );
};

BackButtonComponent.defaultProps = {
  backText: '',
  backUrl: '',
};

export default BackButtonComponent;
