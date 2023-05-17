import html from "html-literal";
import myImage from "/assets/images/pexels-photo-3758435.jpeg";

export default state => html`
  <section id="Home">
    <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
    <link
      type="text/css"
      rel="stylesheet"
      href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"
    />
    <script type="text/javascript">
      window.onload = function() {
        L.mapquest.key = "BeevrxWLZK7u4i0jBeGstiFCs8GcA7C1";
        let map = L.mapquest.map("map", {
          center: [36.803449, -76.009947],
          layers: L.mapquest.tileLayer("map"),
          zoom: 12
        });
        map.addControl(L.mapquest.control());
      };
    </script>

    <img src="${myImage}" style="width:1450px;height:600px" />
    <header>Naval Air Station Oceana Visitor Control Center</header>
    <h1>Contact Info:</h1>
    <p>
      1450 Tomcat Blvd <br />
      Bldg 252 <br />
      Virginia Beach, VA <br />
      (757)-433-3212
    </p>

    <h2>
      Directions From Interstate 64 East or West: <br />
      From64, take 264 East to First Colonial Road, Exit 21A, Proceed on First
      Colonial Road past Virginia Beach Blvd. First Colonial becomes Oceana Blvd
      for the next 4 miles. Tomcat Blvd will be on the right , which leads to
      the main gate. The Visitor Control Center is the first building on the
      right, in building 252.
    </h2>

    <h3>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </h3>
  </section>
`;
