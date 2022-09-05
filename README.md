# Weather APP 🌤🌡

<img src="./imgs/banner.png" width="auto" />

### :muscle: Project

This application gets the weather data from the user's location, if the user wants and agrees to share their location.

The data is obtained through the [Weather API](https://openweathermap.org/api), where passing latitude and longitude gets current, future and historical data.

### :rocket: Used Technologies

This project was developed with the following technologies:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Radix-UI](https://www.radix-ui.com/)
- [React-Icons](https://react-icons.github.io/react-icons/)
- [Styled-Components](https://github.com/styled-components/styled-components)
- [Axios](https://github.com/axios/axios)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)

### 👨🏻‍💻 Execution

To run the project:

- First we have to:
  - Register at site [Weather API site](https://home.openweathermap.org/users/sign_up) to get the api key, as it is needed to get the climate data;
    - After registering, just go to [this address](https://home.openweathermap.org/api_keys) and copy the key already created by default;
  - Open the project folder and duplicate the .env.example file and rename the copy to .env;
    - Then, in the variable `VITE_API_KEY` put the key copied from the site;
- Open the project folder in the terminal and run:
  - `yarn` or `npm install` -> To install all dependencies;
  - `yarn dev` or `npm run dev` -> To run the project;
- To run the tests just run `yarn test` or `npm run test`.

### 🌆 More Images

<figure style="width: 400px">
  <img src="./imgs/default_location.png" alt="app with current location" width="400px">
  <figcaption style="text-align: center">Default location, when the application is opened a default location already appears</figcaption>
</figure>

<figure style="width: 400px">
  <img src="./imgs/current_location.png" alt="app with current location" width="400px">
  <figcaption style="text-align: center">When the user allows access to the location</figcaption>
</figure>

<figure style="width: 400px">
  <img src="./imgs/without_location.png" alt="app with current location" width="400px">
  <figcaption style="text-align: center">When the user does not allow access to the location</figcaption>
</figure>
