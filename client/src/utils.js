import Axios from 'axios';

export const isValidProject = project => (
	!!project && !!project.project_name
);

export const axios = Axios.create({
    baseUrl: '/api/v1/'
});