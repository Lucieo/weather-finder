import React, { Component } from 'react';


const API_KEY="188d5570ed0037727db6a9bb3839ca9d"

const WeatherTitles = props =>(
  <div className="title-container">
    <h1 className="title-container__main-title">Let the sunshine in!</h1>
    <p className="title-container__subtitle">Find out temperature, conditions and more.</p>
  </div>
)

const WeatherForm =props=>(
  <form onSubmit={props.getWeather}>
    <input type="text" name="city" placeholder="City"/>
    <input type="text" name="country" placeholder="Country"/>
    <div>
      <select name="system">
        <option value="imperial">Imperial</option>
        <option value="metric">Metric</option>
      </select>
    </div>
    <button>Get Weather</button>
  </form>
)


const WeatherInfo =props=>(
    <div className="weather__info">
      {
        (props.city && props.country) &&<p className="weather__key">Location : {props.city}, {props.country}</p>
      }
      {
        props.temperature && <p className="weather__key">Temperature : {Math.round(props.temperature)}{props.system==="imperial"?"°F":"°C"}</p>
      }
      {
        props.humidity && <p className="weather__key">Humidity: {props.humidity}%</p>
      }
      {
        props.description && <p className="weather__key">Conditions : {props.description}</p>
      }
      {
        props.error && <p className="weather__key">{props.error}</p>
      }
    </div>
  )



class WeatherApp extends React.Component{
  state={
    city:undefined,
    country:undefined,
    temperature:undefined,
    humidity:undefined,
    description:undefined,
    error:undefined,
    system:undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    const system=e.target.elements.system.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${system}`);
    const data = await api_call.json();
    if(city && country && data.cod!='404'){
      this.setState({
        temperature:data.main.temp,
        city:city,
        country:country,
        humidity:data.main.humidity,
        description: data.weather[0].description,
        error:"",
        system:system
      })
    }
    else{
      this.setState({
        temperature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description: undefined,
        error:"Please provide a correct value!",
        system:undefined
      })
    }
  }
  render(){
    return(
      <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row card-wrap">
              <div className="col-sm-5 illustration-container">
              </div>
              <div className="col-sm-7 form-container">
              <WeatherTitles/>
              <WeatherForm getWeather={this.getWeather}/>
              <WeatherInfo
                temperature={this.state.temperature}
                country={this.state.country}
                city={this.state.city}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
                system={this.state.system}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default WeatherApp;
