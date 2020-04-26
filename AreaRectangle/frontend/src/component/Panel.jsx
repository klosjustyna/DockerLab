import './Panel.scss'
import React, { Component } from 'react';
import rectangle from './images/rectangle03.png';
import axios from 'axios';


class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          valueX: 0,
          valueY: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }   
    
    async handleSubmit(event){
        
        event.preventDefault();
        var response = await axios.post('/api', {param1: this.state.valueX, param2: this.state.valueY},  { validateStatus: false });
        this.setState({result: response.data.out});

    }

    handleChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });     
    }

    render() {
        return (
            <div className='Panel'>
                <div className='Panel__title'>Calculate the area of ​​a rectangle</div>
                <img src={rectangle}/> 
                <form onSubmit={this.handleSubmit}>
                    <div className='Panel__box'>
                        <label>
                        Length x
                        </label>
                        <input name="valueX" type="number" value={this.state.valueX} onChange={this.handleChange} />
                    </div>
                   
                    <div className='Panel__box'>
                        <label>
                        Length y
                        </label>
                        <input name="valueY"type="number" value={this.state.valueY} onChange={this.handleChange} />
                    </div>
                    
                    <div className='Panel__box'>
                        <label>
                            Answer: 
                        </label>
                        <div className='Panel__answer'>
                            {this.state.result}
                        </div>
                    </div> 
                    
                    <input type="submit" value='Calculate'/>

                </form>
            </div>
        );
      }
    }
  
export default Panel;
