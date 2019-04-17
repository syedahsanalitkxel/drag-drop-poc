import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ModalContextProvider } from '../../../context/ModalContext';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  visible?: boolean;
  toggle: () => void;
  primaryText: string;
  primaryAction: (data: any) => void;
  secondaryText: string;
  secondaryAction: 'reset' | 'dismiss';
  size?: string;
  parentClass?: string;
  defaultFilters?: any;
}

const ESModal: React.FunctionComponent<ModalProps> = ({
  title,
  children,
  visible,
  toggle,
  primaryAction,
  secondaryAction,
  primaryText,
  secondaryText,
  size,
  parentClass,
  defaultFilters,
}) => {
  const initialState = {};
  const [modalState, setModalState] = useState(initialState);

  const handlePrimaryAction = (event: React.MouseEvent) => {
    event.preventDefault();
    primaryAction(modalState);
  };

  const handleSecondaryAction = () => {
    if (secondaryAction === 'reset' && !defaultFilters) {
      setModalState(initialState);
      primaryAction(initialState);
    } else if (secondaryAction === 'reset' && defaultFilters) {
      setModalState(defaultFilters);
      primaryAction(defaultFilters);
    } else {
      toggle();
    }
  };

  return (
    <Modal modalClassName={parentClass} size={size} isOpen={visible} toggle={toggle}>
      <ModalContextProvider value={{ modalState, setModalState }}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <button type="button" onClick={handleSecondaryAction} className="btn btn-default" data-dismiss="modal">
            {secondaryText}
          </button>
          <button type="button" onClick={handlePrimaryAction} className="btn btn-primary">
            {primaryText}
          </button>
        </ModalFooter>
      </ModalContextProvider>
    </Modal>
  );
};

ESModal.defaultProps = {
  visible: false,
};

export default ESModal;
