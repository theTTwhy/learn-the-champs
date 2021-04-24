import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);

    // initiate all states
    this.state = {
      step: 1
    };
  }

  componentDidMount(){
    // set title on page
    document.title = "Learn the champs";
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            jo
          </div>
        </div>
      </div>
    );
  }

}

export default Index;
