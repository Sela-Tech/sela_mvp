import Axios from 'axios';

export const isValidProject = project => (
	!!project && !!project.project_name
);

const {NODE_ENV, SERVER_PORT} = process.env;
console.log(SERVER_PORT);
export const axios = Axios.create({
    baseURL:
     NODE_ENV === 'development' ? `http://localhost:${SERVER_PORT || 3001}/api/v1/` : '/api/v1/'
});

export const handleRequestError = (error, handleData) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      handleData && handleData(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error in setting the request ', error.message);
    }
    console.log(error.config);
}