import React, { Component } from "react";
import Intro from "./intro";
import Difficulty from "./difficulty";
import axios from 'axios';

class Index extends Component {
    constructor(props) {
        super(props);

        // initiate all states
        this.state = {
            step: 1,
            difficulty: 0,
            champions: null
        };
    }

    handleStep = ( stepValue ) => {

        this.setState({
           step : stepValue
        });
    }

    componentDidMount(){
        // set title on page
        document.title = "Learn the champs";

        //Fetch all Champions from ddragon with basic info (no abilities)
        axios.get(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json`)
            .then(res => {
                this.setState({
                   champions: res.data.data
                });
            })
    }

    render() {

        console.log(this.state);

        return (
            <div className="container">
                <div className="row">
                    { this.state.step === 1 ? //Intro text
                        <Intro onChangeStep={ this.handleStep } />
                        : ""
                    }
                    { this.state.step === 2 ? //Difficulty explanation
                        <Difficulty onChangeStep={ this.handleStep } />
                        : ""
                    }
                </div>
            </div>
        );
    }

}

export default Index;
