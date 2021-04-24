import React, { Component } from "react";

class Difficulty extends Component {
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
                    <h1 className="">
                        Difficulty
                    </h1>
                    <p className="fake-link" onClick={() => this.handleStepChange( 1 )}>
                        Go back
                    </p>
                </div>
            </>
        )
    }

}

export default Difficulty;
