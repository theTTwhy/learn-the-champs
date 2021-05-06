import React, { Component } from "react";

class Intro extends Component {
    constructor(props) {
        super(props);

        // initiate all states
        this.state = {
            difficulty: null,
        };
    }

    handleStepChange = () => {
        this.props.onChangeStep( Number(this.state.difficulty) );
    }

    changeDifficulty(e) {
        this.setState({
            difficulty: e.target.value
        });
    }

    render() {

        return (
            <>
                <div className="col-12 text-center mt-5 mb-5">
                    <h1 className="logo mt-5 mb-1">
                        Learn the <span>Champions</span>
                    </h1>
                    <p>
                        The tool to learn all the champions in the Rift!
                    </p>
                </div>
                <div className="col-12 text-center mt-5">
                    <h3>
                        Select your difficulty
                    </h3>
                    <p className="fake-link" onClick={() => this.handleStepChange( 2 )}>
                        click here to learn more about the difficulties
                    </p>
                    <select name="difficulty" className="mt-2 mb-4 select-standard" id="difficulty" onChange={this.changeDifficulty.bind(this)}>
                        <option value="none" selected disabled>Please select a difficulty</option>
                        <option value="3">Iron</option>
                        <option value="4">Bronze</option>
                        <option value="5">Silver</option>
                        <option value="6">Gold</option>
                        <option value="7">Diamond</option>
                        <option value="8">Challenger</option>
                    </select>
                    { this.state.difficulty !== null ?
                        <div className="button button-start mx-auto" onClick={() => this.handleStepChange()}>
                            Start
                        </div>
                        : ""
                    }
                </div>
            </>
        )
    }

}

export default Intro;
