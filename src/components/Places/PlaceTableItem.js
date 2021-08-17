import { ModalComponent } from './PlaceModal';
import { useState } from 'react';

export const PlaceTableItem = ({ item, deleteFunction }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const flipModal = () => {
    setIsOpen(!modalIsOpen);
  };

  return (
    <>
      <ModalComponent
        openModal={modalIsOpen}
        flipModal={flipModal}
        place={item}
        title={'Editando Lugar'}
        onSubmitF={() => {
          flipModal();
        }}
      />
      <tr>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>{item.latitude}</td>
        <td>{item.longitude}</td>
        <td>{item.url}</td>
        <td id='actions'>
          <i className='fas fa-edit editIcon' onClick={() => flipModal()}></i>
          <i
            className='fas fa-trash deleteIcon'
            onClick={() => deleteFunction(item._id)}></i>
        </td>
      </tr>
    </>
  );
};
