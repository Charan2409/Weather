import React, { useState } from "react";
import "./App.css";
import "./index.css";
import bg_image from "./bg_image.jpeg";

function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState({});

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1fe4c65616186b87571934f0ae487d6e`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        setResult(Math.round(celsius));
      })
      .catch((error) => console.log(error));
    setCity("");
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg_image})` }}>
      <center>
        <h1>Weather App</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="City"
            placeholder="please enter city name"
            onChange={changeHandler}
          />
          <input
            type="submit"
            className="bg-green-100"
            value="Get Temperature"
          />
        </form>
        <br></br>
        <h3>Temperature : {result} °C </h3>
        <h3>Weather description : {data?.weather?.[0]?.description}</h3>
        <h3>WindSpeed: {data?.wind?.speed}</h3>
      </center>
    </div>
  );
}

export default App;
