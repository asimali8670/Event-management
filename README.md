# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Installed EsLint and prettier plugins for better code quality and code consistency.
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks --save-dev


using redux for state management:
 manage the state for events, user authentication, and profile information

A slice is a collection of Redux logic for a single feature of the application. It includes the state, actions, and reducers for that feature.

Event Slice (eventsSlice)
Initial State: An empty array (initialState: []), which will hold a list of events.
Reducers:
addEvent: Adds a new event to the state.
editEvent: Finds an event by id and updates it with the new data.
deleteEvent: Removes an event from the state by its id.


API Integration:
In this step, we'll set up API integration using a mock API to fetch, create, update, and delete events. We'll use json-server to create a mock server and axios for making HTTP requests.

npm install json-server --save-dev

Create a db.json file in the root of your project with some initial event data:
Add a script in package.json to run json-server:
"scripts": {
  "start:server": "json-server --watch db.json --port 5000"
}

npm install axios
Create an Axios instance to manage API calls:

src/api/axios.js

jsx
Copy
Edit
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

export default axiosInstance;





====PropTypes in recat for type checking ========
PropTypes is a utility library that provides a way to specify the expected data types of props passed to React components. ...
PropTypes provides a variety of validators to check the data type of props. ...
Default props in React allow you to set fallback values for component properties.



================Tailwind css ================================

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
