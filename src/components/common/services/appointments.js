import axios from 'axios';
import env from 'react-dotenv';
const url = 'https://proyecto-final-mern-backend.herokuapp.com';

export const newAppointment = async (appointmentData) => {
  const appointment = await axios
    .post(`${url}/vaccination/appointments`, appointmentData)
    .then(async (a) => {
      const resp = await a.data;
      return resp.appointment;
    })
    .catch((e) =>
      console.error('ERROR ON APPOINTMENT POST REQUEST', e.message)
    );
  return appointment;
};

export const getAppointmentByDni = async (dni) => {
  console.log('ENV', env);
  const appointments = await axios
    .get(
      `${url}/vaccination/appointments?state_process=IN_PROGRESS&user_dni=${dni}&populate=true`
    )
    .then(async (a) => {
      const resp = await a.data;
      return resp.appointments.shift();
    })
    .catch((e) => console.log(e));

  return appointments;
};
