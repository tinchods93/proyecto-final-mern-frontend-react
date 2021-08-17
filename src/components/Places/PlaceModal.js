import Modal from 'react-modal';
import PlaceForm from './PlaceForm';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 10px 10px rgba(0,0,0,0.2)',
  },
};

Modal.setAppElement('#root');

export const ModalComponent = ({
  openModal,
  flipModal,
  place,
  title,
  formType,
  onSubmitF,
}) => {
  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={() => flipModal()}
        style={customStyles}
        contentLabel='Example Modal'>
        <div className='modal__close'>
          <i
            className='fas fa-times-circle closeIcon'
            onClick={() => flipModal()}></i>
        </div>
        <div className='modal__header'>{title}</div>
        <div className='modal__body'>
          <PlaceForm data={place} formType={formType} onSubmitF={onSubmitF} />
        </div>
      </Modal>
    </>
  );
};
