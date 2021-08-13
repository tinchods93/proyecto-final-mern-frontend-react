import axios from 'axios';
const url = 'https://proyecto-final-mern-backend.herokuapp.com';

export const getPlaces = async () => {
  try {
    const places = await axios
      .get(`${url}/vaccination/places`)
      .catch((e) => console.log(e));
    return places.data;
  } catch (error) {
    return { message: 'FAILED', error };
  }
};

export const getPlacesById = async (id) => {
  try {
    const places = await axios
      .get(`${url}/vaccination/places/${id}`)
      .catch((e) => console.log(e));
    return places.data;
  } catch (error) {
    return { message: 'FAILED', error };
  }
};

export const updatePlace = async (data) => {
  try {
    delete data.dosesCompleted;
    delete data.dosesInProgress;
    delete data.__v;
    console.log('DATA=>', data);
    await axios
      .patch(`${url}/vaccination/places`, data)
      .catch((e) => console.log(e));
    return 'SUCCESS';
  } catch (error) {
    return { message: 'FAILED', error };
  }
};

export const deletePlacesById = async (id) => {
  try {
    let response = '';
    await axios
      .delete(`${url}/vaccination/places/${id}`)
      .then((a) => (response = 'SUCCESS'))
      .catch((e) => (response = 'FAILED'));

    return response;
  } catch (error) {
    return { message: 'FAILED', error };
  }
};

export const newPlace = async (data) => {
  try {
    const savedPlace = await axios
      .post(`${url}/vaccination/places`, data)
      .catch((e) => console.log(e));

    return savedPlace;
  } catch (error) {
    return { message: 'FAILED', error };
  }
};
