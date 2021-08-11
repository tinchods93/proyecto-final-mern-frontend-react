const axios = require('axios');
const url = 'https://proyecto-final-mern-backend.herokuapp.com';

module.exports = async () => {
  const todayData = await axios
    .get(url)
    .then((a) => a.data)
    .catch((e) => console.log('error getting Today data =>', e));
  console.log('todaydata=>', todayData);
  return todayData;
};
