/* 
    Defines Entities Schemas for use with normalizr to flatten the nested JSON
    received from server 
*/
import {schema} from normalizr;

const user = new shema.Entity('users', options);

const options = {
    idAttribute: '_id'
};

const task = new schema.Entity('tasks', options);

const milestone = new schema.Entity('milestones', {
    ...options,
    tasks: [task]
});

const project = new schema.Entity('projects', {
    ...options,
    milestones: [milestone]
});



