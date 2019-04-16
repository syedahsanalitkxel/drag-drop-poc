import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface Props {
  visible?: boolean;
  id?: string | number;
  toggle: () => void;
  actionHandler: (id: string) => void;
}

const DeleteModal: React.FunctionComponent<Props> = ({ visible, toggle, id, actionHandler }) => (
  <Modal isOpen={visible} toggle={toggle} style={{ width: '500px' }}>
    <ModalBody className="text-center">
      <FontAwesomeIcon icon="trash" size="4x" className="m-t-20 m-b-20" />
      <p className="font-size-22 font-weight-bold m-b-0 lh-1">Do you really want to delete?</p>
      <p className="font-size-20">All data will be removed.</p>
      <div>
        <button
          className="btn btn-lg btn-default font-size-18"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (id) {
              if (typeof id === 'string') {
                actionHandler(id);
              } else {
                actionHandler(id.toString());
              }
            }
          }}
        >
          Yes, I want to Delete
        </button>
        <button
          className="btn btn-lg btn-primary font-size-18 m-l-5"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            toggle();
          }}
        >
          No, Keep It
        </button>
      </div>
    </ModalBody>
  </Modal>
);

DeleteModal.defaultProps = {
  visible: false,
};

export default DeleteModal;
