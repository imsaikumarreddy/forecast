import React,{useState} from 'react';
import './App.css';
import LeftConatiner from './LeftContainer'
import Rain from './icons/amcharts_weather_icons_1.0.0/animated/rainy-7.svg'
import clouds from './icons/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg'
import clear from './icons/amcharts_weather_icons_1.0.0/animated/day.svg'
import Haze from './icons/amcharts_weather_icons_1.0.0/animated/snowy-5.svg'
import mist from './icons/amcharts_weather_icons_1.0.0/animated/mist.svg'
import axios from 'axios'

function App() {
  const [city,SetCity] = useState('')
  const [OpenWeatherApiKey] = useState('c51223c219d6aec8cb8c5210449bd859')
  const [RecentlyAddedLocations,SetRecentlyAddedLocations] = useState([])
  const [showMore,SetShowMore] = useState({})

  const GetCityWeather = async() => {
    let tempdata = RecentlyAddedLocations
    let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OpenWeatherApiKey}`)
    let Forecast = await  axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${OpenWeatherApiKey}`)
    data.Forecast = Forecast.data.list
    if (RecentlyAddedLocations.length > 7) {
        tempdata.splice(0,1)
    }
    SetRecentlyAddedLocations(tempdata.concat(data))
    SetCity('')
    ShowMoreDetails(data)
  }
   const handleClick = () => {
        GetCityWeather()
    }
   const clearRecentAdded = () =>{
        SetRecentlyAddedLocations([])
        SetShowMore({})
    }

  const ShowMoreDetails = (data) => {
    SetShowMore(data)
  }
  const toCelsius = (f) => {
    return (f-273.15);
  }

  const customDate = (value) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date= new Date(value*1000);
    return date.getDate()+" "+days[date.getDay()];
  }

  const RenderIcon = (data) => {
    switch (data) {
      case "Haze":
        return Haze

      case "Clouds":
        return clouds

      case "Clear":
        return clear

      case "Rain":
        return Rain

      case "Mist":
        return mist;
      default:
        break;
    }
  }

  const reload = async(each) =>{
    let mydata = RecentlyAddedLocations
    let newIndex = mydata.findIndex(r=>r.id === each.id)
    let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${each.name}&appid=${OpenWeatherApiKey}`)
    let Forecast = await  axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${each.name}&cnt=5&appid=${OpenWeatherApiKey}`)
    data.Forecast = Forecast.data.list
    mydata.splice(newIndex, 1, data);
    SetRecentlyAddedLocations(mydata)
}
  const RightContainer = () => {
    return(
      <div className="right-container">
        {
          Object.keys(showMore).length > 0 ?
          (<div>
            <div className="place-container">
              <h2 className="header-text">{showMore.name}</h2>
              <i onClick={()=> reload(showMore)} className="fa fa-refresh"></i>
            </div>
            <div className="weather-content">
              <div className="content-icon">
                <img alt="weather icon" src={RenderIcon(showMore.weather[0].main)}/>
              </div>
              <div className="content-detials">
                <p>{Math.round(toCelsius(showMore.main.temp))} C</p>
                <p>{showMore.weather[0].description}</p>
                <p>Wind: {showMore.wind.speed}ms {showMore.wind.deg} deg </p>
                <p>Pressure: {showMore.main.pressure}</p>
              </div>
            </div>
              <div className="upcoming-forecast">
                
                {
                    showMore.Forecast.map((each,index)=>{
                      return(
                        <div key={index}>
                          <p>{customDate(each.dt)}</p>
                          <img alt="weather icon" src={RenderIcon(each.weather[0].main)} />
                          <p>{Math.round(toCelsius(each.temp.day))} C</p>
                        </div>
                      )
                    })
                }
              </div>
            </div>
          )
          : null
        }
    </div>
    )
  }

  const clearLocation= (each) => {
    let newIndex = RecentlyAddedLocations.findIndex(r=>r.id === each.id)
    if (newIndex !== -1) {
      RecentlyAddedLocations.splice(newIndex,1)
      SetRecentlyAddedLocations(RecentlyAddedLocations)
    }
}

  return (
    <div className="App">
      <div className="app-container">
       <LeftConatiner 
       handleClick={handleClick}
       OpenWeatherApiKey={OpenWeatherApiKey}
       clearRecentAdded={clearRecentAdded}
       RecentlyAddedLocations={RecentlyAddedLocations}
       SetCity={SetCity}
       clearLocation={clearLocation}
       city={city} ShowMoreDetails={ShowMoreDetails} 
       toCelsius={toCelsius} reload={reload}
       RenderIcon={RenderIcon} />
       <RightContainer />
      </div>
    </div>
  );
}

export default App;
