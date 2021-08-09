import axios from 'axios';
const url = 'http://192.168.1.18:3000';

export const getPlaces = async () => {
  const places = await axios
    .get(`${url}/vaccination/places`)
    .catch((e) => console.log(e));
  return places.data;
};
