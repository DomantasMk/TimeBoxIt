const jsonWebToken = require('jsonwebtoken');
const axios = require('axios');
const setAuthToken = async () => {
    let token = localStorage.getItem('token');
    let query = `
    query{
        authenticate(token:"${token}")
      }`;
    let result = await axios({
      url: 'http://localhost:5000/graphiql',
      method: 'post',
      data: {
          query: query
        }
    });
    if (result.data.data.authenticate) {
        axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;
        return true;
    } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.clear();
        return false;
    }
};

export default setAuthToken;