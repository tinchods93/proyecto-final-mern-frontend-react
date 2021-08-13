import React from 'react';
import '../../assets/Appointments.css';
import { Link } from 'react-router-dom';

const Appointments = () => {
  return (
    <div className='centered__container'>
      <div className='basic__card'>
        <div className='basic__card__header --center'>
          <span>¿Qué desea hacer?</span>
        </div>
        <div className='appointmentMenu__buttonContainer'>
          <Link to='/appointments/new' className='MyButton'>
            Sacar Turno
          </Link>
          <Link to='/appointments/search' className='MyButton'>
            Buscar Turno
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
