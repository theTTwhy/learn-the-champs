import React, { Component } from "react";

class Intro extends Component {
    constructor(props) {
        super(props);

        // initiate all states
        this.state = {
            difficulty: 0,
        };
    }

    handleStepChange = ( stepValue ) => {
        this.props.onChangeStep( stepValue );
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
                    <div className="button button-start" onClick={() => this.handleStepChange( 3 )}>
                        Start
                    </div>
                </div>
            </>
        )
    }

}

export default Intro;
