import React, {Component} from 'react';
import './App.css';
import LeftConatiner from './LeftContainer'
import Rain from './icons/amcharts_weather_icons_1.0.0/animated/rainy-7.svg'
import clouds from './icons/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg'
import clear from './icons/amcharts_weather_icons_1.0.0/animated/day.svg'
import Haze from './icons/amcharts_weather_icons_1.0.0/animated/haze.png'
import mist from './icons/amcharts_weather_icons_1.0.0/animated/mist.png'
import fog from './icons/amcharts_weather_icons_1.0.0/animated/fog.svg'
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state={
      city: '',
      OpenWeatherApiKey: 'c51223c219d6aec8cb8c5210449bd859',
      RecentlyAddedLocations: [],
      showMore: {},
      error: ''
    }
  }

  handleChange = (value) => {
    this.setState({city: value})
  }

  clearLocation= (each) => {
    let temp = this.state.RecentlyAddedLocations
    let newIndex = temp.findIndex(r=>r.id === each.id)
    if (newIndex !== -1) {
      temp.splice(newIndex,1)
      this.setState({RecentlyAddedLocations: temp})
    }
  }

  GetCityWeather = async() => {
    let tempdata = this.state.RecentlyAddedLocations
    try {
      let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.state.OpenWeatherApiKey}`)
      let Forecast = await  axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&cnt=5&appid=${this.state.OpenWeatherApiKey}`)
      data.Forecast = Forecast.data.list
      data.id = this.state.RecentlyAddedLocations.length + 1
      if (this.state.RecentlyAddedLocations.length > 7) {
          tempdata.splice(7,1)
      }
      this.setState({RecentlyAddedLocations: tempdata.concat(data),
        city: '',
        ShowMore: data,
        error: ''
      })
    } catch (error) {
      this.setState({error: 'Please enter valid city name'})
    }
    
  }
   handleClick = () => {
        this.GetCityWeather()
    }
   clearRecentAdded = () =>{
        this.setState({RecentlyAddedLocations:[],showMore: {}})
    }

  ShowMoreDetails = (data) => {
    this.setState({showMore: data})
  }
  toCelsius = (f) => {
    return (f-273.15);
  }

  customDate = (value) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date= new Date(value*1000);
    return date.getDate()+" "+days[date.getDay()];
  }

  RenderIcon = (data) => {
    switch (data) {
      case "Haze":
        return Haze

      case "Clouds":
        return clouds

      case "Clear":
        return clear

      case "Rain":
        return Rain

      case "fog":
        return fog

      case "Mist":
        return mist;
      default:
        break;
    }
  }

  reload = async(each) =>{
    let mydata = this.state.RecentlyAddedLocations
    let newIndex = mydata.findIndex(r=>r.id === each.id)
    let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${each.name}&appid=${this.state.OpenWeatherApiKey}`)
    let Forecast = await  axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${each.name}&cnt=5&appid=${this.state.OpenWeatherApiKey}`)
    data.Forecast = Forecast.data.list
    data.id = each.id
    mydata.splice(newIndex, 1, data);
    this.setState({RecentlyAddedLocations: mydata,showMore:data})
}
  render(){
    return (
      <div className="App">
        <div className="app-container">
         <LeftConatiner
         handleClick={this.handleClick}
         error={this.state.error}
         OpenWeatherApiKey={this.state.OpenWeatherApiKey}
         clearRecentAdded={this.clearRecentAdded}
         RecentlyAddedLocations={this.state.RecentlyAddedLocations}
         handleChange={this.handleChange}
         clearLocation={this.clearLocation}
         city={this.state.city} ShowMoreDetails={this.ShowMoreDetails}
         toCelsius={this.toCelsius} reload={this.reload}
         RenderIcon={this.RenderIcon} />
        <RightContainer
        showMore={this.state.showMore}
        RenderIcon={this.RenderIcon} reload={this.reload} toCelsius={this.toCelsius} customDate={this.customDate} />
        </div>
      </div>
    );
  }
}

const RightContainer = ({showMore,RenderIcon,reload,toCelsius,customDate}) => {
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

export default App;
