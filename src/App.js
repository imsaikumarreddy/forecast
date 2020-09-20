import React from 'react';
import './App.css';
import WeatherIcon from './icons/weather.svg'

function App() {
  const RecentLocations = [
    {
      place: 'london'
    },
    {
      place: 'usa'
    },
    {
      place: 'aus'
    }
  ]

  /*function Forecast(){
    const UpcomingForecast = [
      {
        date: 10
        day: "mon"

             <p>day</p>
             <img alt="weather icon" src={WeatherIcon} />
              <p>temp</p>
      }
    ]
  }*/
  const LeftConatiner = () => {
    return(
      <div className="left-container">
          <div className="add-location-container">
            <input type="text" name="search" value="search" placeholder="Type city name" />
            <button>send</button>
          </div>
          <div className="divider"></div>
          <div className="recent-added-locations">
            <p>Recent locations</p>
            <div className="small-divider"></div>
            <div className="added-locations">
              {
                RecentLocations.map((each,index)=>{
                  return(
                    <div className="recent-location" key={index}>
                    <p>{each.place}</p>
                  </div>
                  )
                })
              }
            </div>
          </div>
          <div className="clear-container">
            <button className="clear-button">Clear</button>
          </div>
        </div>
    )
  }

const RightContainer = () => {
  return(
    <div className="right-container">
          <div className="place-container">
            <h2>Halifax</h2>
            <i class="fa fa-refresh"></i>
          </div>
          <div className="weather-content">
            <div className="content-icon">
              <img alt="weather icon" src={WeatherIcon} />
            </div>
            <div className="content-detials">
              <p>15c</p>
              <p>clear sky</p>
              <p>wind: 3s</p>
              <p>pressure</p>
            </div>
          </div>
          <div className="upcoming-forecast">
            <div>
              <p>date</p>
             <p>day</p>
             <img alt="weather icon" src={WeatherIcon} />
              <p>temp</p>
            </div>
            <div>
              <p>date</p>
             <p>day</p>
             <img alt="weather icon" src={WeatherIcon} />
              <p>temp</p>
            </div>
            <div>
              <p>date</p>
             <p>day</p>
             <img alt="weather icon" src={WeatherIcon} />
              <p>temp</p>
            </div>
            <div>
              <p>date</p>
             <p>day</p>
             <img alt="weather icon" src={WeatherIcon} />
              <p>temp</p>
            </div>
            <div>
              <p>date</p>
             <p>day</p>
             <img alt="weather icon" src={WeatherIcon} />
              <p>temp</p>
            </div>
            
          </div>
   </div>
  )
}

  return (
    <div className="App">
      <div className="app-container">
       <LeftConatiner />
       <RightContainer/>
      </div>
    </div>
  );
}

export default App;
