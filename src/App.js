import React from "react";
import "./App.css";
import Moment from "moment";
import "moment-timezone";

class App extends React.Component {
  state = {};

  getTime = () => {
    const time = Moment()
      .utcOffset(this.state.timezone / 60)
      .format("h:mm a");
  };

  getWeather = () => {
    let zipInput = document.getElementById("zipInput").value;
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zipInput +
        ",us&units=imperial&appid=bd69e99f47ae77d8818da6f10c9ee7af"
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log("There is some problem.Status Code: " + response.status);
          return;
        }
        response.json().then((data) => {
          console.log(data);
          this.setState({
            zip: zipInput,
            temperature: data.main.temp,
            city: data.name,
            description: data.weather[0].description,
            timezone: data.timezone,
          });
          this.getTime();
        });
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  render() {
    return (
      <div className="main">
        <div className="container">
          <h1>How's The Weather Today?</h1>
          <br></br>
          <br></br>
          <input
            type="text"
            id="zipInput"
            placeholder="Zip Code Please"
          ></input>
          <input
            type="submit"
            className="btn"
            onClick={this.getWeather}
            name="Click Here"
          ></input>
          <p>{this.state.city} </p>
          <p>{this.state.temperature} °</p>
          <p>{this.state.description}</p>
          <p>{this.state.time}</p>
        </div>
      </div>
    );
  }
}

export default App;
