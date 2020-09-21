import React,{useState} from 'react';
import './App.css';
import LeftConatiner from './LeftContainer'
import WeatherIcon from './icons/weather.svg'

function App() {
  const [city,SetCity] = useState('')
  const [showMore,SetShowMore] = useState({})
  const ShowMoreDetails = (data) => {
    SetShowMore(data)
  }
  const RightContainer = () => {
    return(
      <div className="right-container">
        {
          Object.keys(showMore).length > 0 ?
          (<div>
            <div className="place-container">
              <h2 className="header-text">{showMore.name}</h2>
              <i class="fa fa-refresh"></i>
            </div>
            <div className="weather-content">
              <div className="content-icon">
                <img alt="weather icon" src={WeatherIcon} />
              </div>
              <div className="content-detials">
                <p>{showMore.main.temp} F</p>
                <p>{showMore.weather[0].description}</p>
                <p>{showMore.wind.speed}s</p>
                <p>{showMore.main.pressure}</p>
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
          </div>)
          : null
        }
    </div>
    )
  }



  return (
    <div className="App">
      <div className="app-container">
       <LeftConatiner ShowMoreDetails={ShowMoreDetails} />
       <RightContainer />
      </div>
    </div>
  );
}

export default App;
