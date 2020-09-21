import React from 'react'
import axios from 'axios'

export default class LeftContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            city: '',
            RecentlyAddedLocations: []
        }
    }
    GetCityWeather = async() => {
        let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=6315533839f238d2210a6f0919e199b8`)
        let Forecast = await  axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&cnt=5&appid=6315533839f238d2210a6f0919e199b8`)
        console.log(Forecast);
        this.setState({RecentlyAddedLocations: this.state.RecentlyAddedLocations.concat(data),city:''})
        this.props.ShowMoreDetails(data)
    }
    handleClick = () => {
        this.GetCityWeather()
    }
    clearRecentAdded(){
        this.setState({RecentlyAddedLocations: []})
    }
    clearLocation(){
        this.setState({})
    }

    render(){
        return(
            <div className="left-container">
                <div className="add-location-container">
                    <input type="text" name="city" value={this.state.city} placeholder="Type city name" onChange={(e)=>this.setState({city:e.target.value})} />
                    <i class="fa fa-plus-circle" onClick={this.handleClick}></i>
                </div>
                <div className="divider"></div>
                <div className="recent-added-locations">
                    <p>Recent locations</p>
                    <div className="small-divider"></div>
                    <div className="added-locations">
                    {
                        this.state.RecentlyAddedLocations.map((each,index)=>{
                        return(
                            <div className="recent-location" key={index}>
                            <p onClick={()=>this.props.ShowMoreDetails(each)}>{each.name}</p>
                            <i class="fa fa-refresh" onClick={()=>this.reload()}></i>
                            <i class="fa fa-close" onClick={()=>this.clearLocation()}></i>
                        </div>
                        )
                        })
                    }
                    </div>
                </div>
                <div className="clear-container">
                    <button className="clear-button" onClick={()=>this.clearRecentAdded()}>Clear</button>
                </div>
            </div>
        )
    }
}