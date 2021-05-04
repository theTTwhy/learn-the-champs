import React, { Component } from "react";
import Intro from "./intro";
import Difficulty from "./difficulty";
import GameIron from "./game-iron";
import GameBronze from "./game-bronze";
import GameSilver from "./game-silver";
import GameGold from "./game-gold";

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
                    { this.state.scene === 4 ? //Game Bronze
                        <GameBronze />
                        : ""
                    }
                    { this.state.scene === 5 ? //Game Silver
                        <GameSilver />
                        : ""
                    }
                    { this.state.scene === 6 ? //Game Silver
                        <GameGold />
                        : ""
                    }
                </div>
            </div>
        );
    }

}

export default Index;
