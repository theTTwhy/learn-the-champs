import React, { Component } from "react";
import Intro from "./intro";
import Difficulty from "./difficulty";
import GameIron from "./game-iron";

class Index extends Component {
    constructor(props) {
        super(props);

        // initiate all states
        this.state = {
            scene: 1,
            difficulty: 0,
        };
    }

    handleStep = ( stepValue ) => {

        this.setState({
           scene : stepValue
        });
    }

    componentDidMount(){
        // set title on page
        document.title = "Learn the champs";
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    { this.state.scene === 1 ? //Intro text
                        <Intro onChangeStep={ this.handleStep } />
                        : ""
                    }
                    { this.state.scene === 2 ? //Difficulty explanation
                        <Difficulty onChangeStep={ this.handleStep } />
                        : ""
                    }
                    { this.state.scene === 3 ? //Game Iron
                        <GameIron />
                        : ""
                    }
                </div>
            </div>
        );
    }

}

export default Index;
