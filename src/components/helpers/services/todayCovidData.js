const axios = require('axios');
const url = 'http://localhost:3000/';

module.exports = async () => {
  const todayData = await axios
    .get(url)
    .then((a) => a.data)
    .catch((e) => console.log('error getting Today data =>', e));

  return todayData;
};
