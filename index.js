/* eslint-disable no-undef */
import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav(store.Links)}
    ${Main(state)}
    ${Footer()}
  `;
  afterRender(state);

  router.updatePageLinks();
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
  if (state.view === "Home") {
    document.querySelector("form").addEventListener("submit", () => {
      event.preventDefault();
      const Home = event.target.elements;
      console.log("Home", Home);
      if (state.view === "Events") {
        router.navigate("/Links");
      }

      const requestData = {
        customer: Home.customer.value,
        input: Home.input.value
      };
      console.log("request body", requestData);
      axios
        // Get request to retrieve the current weather data using the API key and providing a city name
        .post(`${process.env.API_URL}/Home`, requestData)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          router.navigate("/home");
        })
        .catch(error => {
          console.log("it puked", error);
        });
    });
  }
}
window.addEventListener("DOMContentLoaded", function() {
  L.mapquest.key = process.env.MAPQUEST_API_KEY;

  var map = L.mapquest.map("map", {
    center: [36.80349, -76.009934],
    layers: L.mapquest.tileLayer("map"),
    zoom: 18
  });
  //map marker below this line
  L.marker([36.80349, -76.009934], {
    icon: L.mapquest.icons.marker({
      primaryColor: "#0E1F2F",
      secondaryColor: "#F5BC00",
      shadow: true,
      size: "md"
      // symbol: 'T'
    })
  }).addTo(map);
  //map marker above this line
  map.addControl(L.mapquest.control());
});

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home"; //happened before the page is loaded
    // Add a switch case statement to handle multiple routes
    switch (view) {
      // New Case for the Home View
      case "Home":
        axios
          // Get request to retrieve the current weather data using the API key and providing a city name
          .get(
            `https://api.openweathermap.org/data/2.5/weather?zip=23460,us&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
          )
          .then(response => {
            // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            // Create an object to be stored in the Home state from the response
            store.Home.weather = {
              city: response.data.name,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };

            // An alternate method would be to store the values independently
            /*
                  store.Home.weather.city = response.data.name;
                  store.Home.weather.temp = kelvinToFahrenheit(response.data.main.temp);
                  store.Home.weather.feelsLike = kelvinToFahrenheit(response.data.main.feels_like);
                  store.Home.weather.description = response.data.weather[0].main;
                  */
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        axios
          .get(
            `https://www.mapquestapi.com/staticmap/v5/map?key=${process.env.MAPQUEST_API_KEY}&center=Boston,MA&size=600,400@2x`
          )
          // eslint-disable-next-line no-unused-vars
          .then(response => {
            // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
            // Create an object to be stored in the Home state from the response
            // console.log(response.data);
            store.Home.mapquest = {};
            // An alternate method would be to store the values independently
            /*
          store.Home.weather.city = response.data.name;
          store.Home.weather.temp = kelvinToFahrenheit(response.data.main.temp);
          store.Home.weather.feelsLike = kelvinToFahrenheit(response.data.main.feels_like);
          store.Home.weather.description = response.data.weather[0].main;
          */
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;
      default:
        done();
    }
  },

  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      if (view in store) {
        render(store[view]);
      } else {
        console.log(`View ${view} not defined`);
        render(store.Home);
      }
    }
  })
  .resolve();
