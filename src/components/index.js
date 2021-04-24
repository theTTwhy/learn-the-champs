import React, { Component } from "react";
import Intro from "./intro";
import Difficulty from "./difficulty";

class Index extends Component {
    constructor(props) {
        super(props);

        // initiate all states
        this.state = {
            step: 1,
            difficulty: 0,
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
