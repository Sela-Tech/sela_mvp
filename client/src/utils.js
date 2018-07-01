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