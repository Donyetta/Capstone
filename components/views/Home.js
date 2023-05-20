import html from "html-literal";
import myImage from "/assets/images/pexels-photo-3758435.jpeg";

export default state => html`
  <section id="Home">
    <img src="${myImage}" style="width:1450px;height:600px" />
    <header>Naval Air Station Oceana Visitor Control Center</header>
    <h1>Contact Info:</h1>
    <p>
      1450 Tomcat Blvd <br />
      Bldg 252 <br />
      Virginia Beach, VA <br />
      (757)-433-3212 <br />
      Hours: Mon-Thurs 0600-1700 Fri 0600-1600
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
