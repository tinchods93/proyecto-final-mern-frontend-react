import React, { useState } from 'react';
import { newAppointment } from '../../app/services/appointments';
import DataAppointment from '../../components/DataAppointment';

const NewAppointmentView = () => {
  const [data, setData] = useState({});
  const [appointment, setAppointment] = useState({});
  const [showData, setShowData] = useState(false);

  const setInput = (ev) => {
    const attribute = ev.target.name;

    const _data = data;
    _data[attribute] = ev.target.value;

    setData({ ..._data });
  };

  const postAppointmentData = async (ev) => {
    ev.preventDefault();
    try {
      if (data) {
        await newAppointment(data).then((a) => {
          setAppointment(a);
          setShowData(true);
        });
      }
    } catch (error) {
      console.log('ERROR=>', error);
    }
  };

  return (
    <>
      <div className='appointment__header'>
        <a href='/appointments'>
          <i className='fas fa-times-circle closeIcon' />
        </a>
      </div>
      <div className='appointment__body'>
        <div className='form__container'>
          <form className='basic__card'>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='name'>Nombre: </label>
              </div>
              <input
                onChange={setInput}
                type='text'
                name='name'
                placeholder='Ingrese su nombre'
              />
            </div>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='last_name'>Apellido: </label>
              </div>
              <input
                onChange={setInput}
                type='text'
                name='last_name'
                placeholder='Ingrese su apellido'
              />
            </div>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='born_date'>Fecha de Nacimiento: </label>
              </div>
              <input onChange={setInput} type='date' name='born_date' />
            </div>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='dni'>DNI: </label>
              </div>
              <input
                onChange={setInput}
                type='text'
                name='dni'
                placeholder='Ingrese su dni'
              />
            </div>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='address'>Dirección: </label>
              </div>
              <input
                onChange={setInput}
                type='text'
                name='address'
                placeholder='Ingrese su dirección'
              />
            </div>
            <button
              className='MyButton'
              style={{ fontWeight: 600 }}
              onClick={postAppointmentData}>
              Enviar
            </button>
          </form>
        </div>
        <>
          <>
            {showData ? (
              <DataAppointment appointmentData={appointment} />
            ) : (
              <></>
            )}
          </>
        </>
      </div>
    </>
  );
};

export default NewAppointmentView;
