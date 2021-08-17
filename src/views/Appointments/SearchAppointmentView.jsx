import React, { useState } from 'react';
import { getAppointmentByDni } from '../../app/services/appointments';
import DataAppointment from '../../components/DataAppointment';

const SearchAppointmentView = () => {
  const [dni, setDni] = useState(undefined);
  const [appointment, setAppointment] = useState({});
  const [showData, setShowData] = useState(false);

  const getAppointmentData = async (ev) => {
    ev.preventDefault();

    try {
      if (dni) {
        await getAppointmentByDni(dni).then((appo) => {
          setAppointment(appo);
          setShowData(true);
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const setInput = (ev) => {
    setDni(ev.target.value);
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
                <label htmlFor='dni'>DNI: </label>
              </div>
              <input
                onChange={setInput}
                type='text'
                name='dni'
                placeholder='Ingrese su DNI'
              />
            </div>
            <button
              className='MyButton'
              style={{ fontWeight: 600 }}
              onClick={getAppointmentData}>
              Enviar
            </button>
          </form>
        </div>
        <>
          {showData ? <DataAppointment appointmentData={appointment} /> : <></>}
        </>
      </div>
    </>
  );
};

export default SearchAppointmentView;
