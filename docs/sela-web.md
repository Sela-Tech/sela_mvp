# Sela Web App
This document intends to outline the structure of the web app architecture. Three main components are considered:

 - API Server
 - Web Client
 - Database

## API Server
The API Server runs with Express JS powered by Nodejs. It exposes endpoints thru which controllers enable CRUD operations on our MongoDB instance. Every endpoint is a subroute of `/api/v1` Here's a list of available endpoints:

 - `projects.json` **GET**
	- **Description:** 
Reads many projects from Database.
	-	**Query:**
```{ all fields }```
 - `project.json` **GET**
	- **Description:** 
Reads one project from Database.
	-	**Query:**
```{ id: String }```
 - `project.json` **PUT**
	- **Description:** 
Updates one project from Database.
	-	**Query:**
		```
		{ id: String (required),
		  project_name: String,
		}
		```
 - `project.json` **POST**
	- **Description:** 
Adds a new project to Database.
	-	**Query:**
		```
		{ project_name: String (required),
		  owner: Organization.ObjectId (required)
		}
		```
 - `tasks.json` **GET**
	- **Description:** 
Reads many tasks from Database.
	-	**Query:**
```{ all fields }```
 - `task.json` **GET**
	- **Description:** 
Reads one task from Database.
	-	**Query:**
```{ id: String }```
 - `task.json` **PUT**
	- **Description:** 
Updates one task from Database.
	-	**Query:**
		```
		{ id: String (required),
		  task_name: String,
		  due_date: Date || "AAAA/mm/dd",
		  start_date: Date || "AAAA/mm/dd",
		  end_date: Date || "AAAA/mm/dd"
		}
		```
 - `task.json` **POST**
	- **Description:** 
Adds a new task to Database.
	-	**Query:**
		```
		{ task_name: String (required),
		  project: Project.ObjectId (required),
		  due_date: Date || "AAAA/mm/dd" (required),
		  start_date: Date || "AAAA/mm/dd",
		  end_date: Date || "AAAA/mm/dd"
		}
		```
## Web Client
This is (what powers) the user interface thru which users create projects, tasks, and monitor the evolution of those. The web client runs on React.js with a Redux store for state management. Pagedraw.io is gradually used to easily turn mockups into React Components (Presentational) that will be then hydrated with data by parent Components (Container).

To understand how the client is layed out, [read this](./web-client.md).

## Database
Our MongoDB database currently lives on a **mlab** instance. The Express server sets up a connection with the database right after it's started. The relevant credentials lives in these environment variables:
```
MONGOLAB_URI=
SECRET=
``` 
