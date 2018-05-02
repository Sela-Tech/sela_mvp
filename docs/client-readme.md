# Sela React Client
This document intends to clarify the design and inner workings of the React webapp. But first things first...

## How to run
While at the root of the repository:
```
npm i
cd client && npm i && cd ..
```
At this point you've installed all the project dependencies and you are back at the root, ready to run:
`npm start`
That's it. The Express server should now be running along with the webpackDevServer. You can visit the app at localhost:3001/client (Your browser has probably automatically opened a new tab at localhost:3000 which also serves the app... Use either.).

## State Shape
We use [Redux](https://redux.js.org/introduction/core-concepts), a really simple library for neat state management. This section describes the app-level state structure (Redux store structure). This is important, to know what to expect when accessing the **store** from any container component.

```
   state = {
	   projects: {
		   isFetching: boolean,
		   didInvalidate: boolean,
		   items: {
			   [_id]: {
				   _id: String,
				   project_name: String,
				   milestones: Array<milestone._id> 			   
			   },
			   ...
			}
	   },
	  milestones: {
		   isFetching: boolean,
		   didInvalidate: boolean,
		   items: {
			   [_id]: {
				   _id: String,
				   tasks: Array<task._id> 			   
			   },
			   ...
			}
	   },
	   tasks: {
		   isFetching: boolean,
		   didInvalidate: boolean,
		   items: {
			   [_id]: {
				   _id: String,
				   task_name: String,
				   task_description: String,
				   completed: boolean,		    			   
			   },
			   ...
			}
	   }
   }
```
### Where is this relevant ?
Anytime you are writing a component that interacts with the app level state (a.k.a the store). For instance:
```js
// (L1-L17) client/src/containers/filteredProjectsList)
/* Container component for a list of projects tiles */
import { connect } from 'react-redux';
import ProjectsList from '../components/projectsList';
import { projectActionTors as creators } from '../ducks';

/* Generate props from app-level state 
 state {Object}: current store state (see the app state design)
 ownProps {Object}: all props available to this component at the moment
*/
const mapStateToProps = (state, ownProps) => {
    // Anything returned here will be passed as props to the component.
    // And any app level state change will be picked up.
    return {
        projects: state.projects
    }
};
``` 
