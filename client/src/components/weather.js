import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Weather extends Component{
    constructor(props) {
		super(props);
		this.state = {
			forecast:false
		};

	}

	componentWillMount() {

		this.props.getWeatherFromIP(()=>this.setState({forecast:true}));
		
	}


	render() {
      
        if(!this.state.forecast){
            return <div>Loading..</div>
        }
       
        
        var list = this.props.forecast.list;
        var high;
        if(this.props.forecast.err){
            return <div>{this.props.forecast.err}</div>
        }
		if(this.props.forecast){
            
			return (
				<div>
                    
                    <h1>{this.props.forecast.city.name}</h1>
                   
                    {this.props.forecast.list.map ((hour, index)=>{
                        if(high===undefined||hour.main.temp> high){
                            high = hour.main.temp;
                        }
                        console.log(high);
                        return <div key={index}>{hour.weather[0].main}</div>
                    })}
				</div>
			);
		}
		
	}
}

function mapStateToProps(state) {
 
   

	return { forecast: state.weather}
}




export default connect(mapStateToProps, actions)(Weather);