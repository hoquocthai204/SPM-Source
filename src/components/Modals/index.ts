import { Modal, ModalProps as AntdModalProps } from 'antd';

interface ModalProps extends AntdModalProps {
  message: string;
  title?: string;
  onOk?: any;
  onCancel?: any;
  okText?: string;
}
export const showErrorModal = ({ message, onOk, title, ...rest }: ModalProps) => {
  Modal.error({
    ...rest,
    content: message,
    className: 'base-modal',
    centered: true,
    onOk: onOk,
    title: title,
  });
};

export const showInfoModal = ({ message, onOk, ...rest }: ModalProps) => {
  Modal.info({
    ...rest,
    content: message,
    className: 'base-modal',
    centered: true,
    onOk: onOk,
    // title: title
  });
};

export const showSuccessModal = ({ message, onOk, ...rest }: ModalProps) => {
  Modal.success({
    ...rest,
    content: message,
    className: 'base-modal',
    centered: true,
    onOk: onOk,
  });
};

export const showConfirmModal = ({
  title,
  message,
  onOk,
  okText,
  onCancel,
  ...rest
}: ModalProps) => {
  Modal.confirm({
    ...rest,
    title: title,
    content: message,
    className: 'base-modal-confirm',
    centered: true,
    onOk: onOk,
    okText: okText,
    onCancel: onCancel,
    cancelText: rest.cancelText,
  });
};
