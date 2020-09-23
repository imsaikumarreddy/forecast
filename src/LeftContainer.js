import React from 'react'

export default function LeftContainer (props){

        let { toCelsius,error,RenderIcon,clearRecentAdded, clearLocation, handleChange ,ShowMoreDetails, city,
           RecentlyAddedLocations, handleClick, reload }= props;
        return(
            <div className="left-container">
                <div className="add-location-container">
                    <input type="text" name="city" value={city} placeholder="Search city name" onChange={(e)=>handleChange(e.target.value)} />
                    <i className="fa fa-plus-circle" onClick={handleClick}></i>
                </div>
                {error!=='' ?<p className="error-message">{error}</p>:null}
                <div className="divider"></div>
                <div className="recent-added-locations">
                    <p>Recent locations</p>
                    <div className="small-divider"></div>
                    <div className="added-locations">
                    {
                        RecentlyAddedLocations.sort((a,b)=>b.id - a.id).map((each,index)=>{
                        return(
                            <div className="recent-location" key={index}>
                                <p className="cursor" onClick={()=>ShowMoreDetails(each)}>{each.name}</p>
                                <div className="temp-container">
                                    <p>{Math.round(toCelsius(each.main.temp))}C</p>
                                    <img alt="weather icon" src={RenderIcon(each.weather[0].main)} />
                                </div>
                                <p>{each.weather[0].main}</p>
                                <div className="actions-container">
                                    <i className="fa fa-refresh" onClick={()=>reload(each)}></i>
                                    <i className="fa fa-close" onClick={()=>clearLocation(each)}></i>
                                </div>
                            </div>
                        )
                        })
                    }
                    </div>
                </div>
                <div className="clear-container">
                    <button className="clear-button" onClick={()=>clearRecentAdded()}>Clear</button>
                </div>
            </div>
        )
}
