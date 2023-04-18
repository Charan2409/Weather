import React, { useState } from "react";
import "./App.css";
import "./index.css";
import Image from "./Image.jpg";

function App({ data }) {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1fe4c65616186b87571934f0ae487d6e`
    )
      .then((response) => response.json())
      .then(data => {
        console.log(data);
        const kelvin = data.main.temp;
        const desc = data.weather[0].description;
        console.log(desc);
        const celsius = kelvin - 273.15;
        setResult(Math.round(celsius));
      }).catch(error => console.log(error))
      setCity("");
  };

  return (
    <div className="App" style={{ backgroundImage: "url(/Image.jpeg)" }}>
      <center>
        <h1>Weather App</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="City"
            placeholder="please enter city name"
            onChange={changeHandler}
          />
          <input type="submit" value="Get Temperature" />
        </form>

        <h4>Temperature : {result} °C </h4>
      </center>
    </div>
  );
}

export default App;
