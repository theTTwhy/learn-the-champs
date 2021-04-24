import React, { Component } from "react";
import axios from "axios";
import "./default.scss"

class GameIron extends Component {
    constructor(props) {
        super(props);

        // initiate all states
        this.state = {
            difficulty: 0,
            start: false,
            champions: null,
            totalChampions: 0,
            score: 0,
            currentQuestion: 0,
            championCorrect: null,
            championFalse: null,
            championImageURL: null
        };
    }

    componentDidMount(){
        // set title on page
        document.title = "Learn the Champs | Iron";

        //Fetch all Champions from ddragon with basic info (no abilities)
        axios.get(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json`)
            .then(res => {
                let total = Object.keys(res.data.data).length

                this.setState({
                    champions: res.data.data,
                    totalChampions: total
                });
            })
    }

    startIron() {
        this.setState({
            start: true
        });

        this.generateNewQuestion();
    }

    generateNewQuestion() {
        let randomNumber = Math.floor(Math.random() * this.state.totalChampions);
        let randomNumberFalse = Math.floor(Math.random() * this.state.totalChampions);
        let key1 = Object.keys(this.state.champions)[randomNumber];
        let key2 = Object.keys(this.state.champions)[randomNumberFalse];
        let champion = this.state.champions[key1];
        let championFalse = this.state.champions[key2];
        let championImageName = champion.image.full.split(".");
        let championImageURL = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + championImageName[0] + "_0.jpg"

        this.setState({
            championCorrect: champion,
            championFalse: championFalse,
            championImageURL: championImageURL
        })
    }

    render() {
        let randomOrder1 = Math.floor(Math.random() * 2) + 1;
        let randomOrder2;

        if(randomOrder1 === 1){
            randomOrder2 = 2;
        }
        else {
            randomOrder2 = 1;
        }

        return (
            <>
                { this.state.start === false ? //Explanation
                    <>
                        <div className="col-12 text-center mt-5 mb-5">
                            <h1 className="mt-5 mb-5">
                                Explanation Learn the Champions Iron
                            </h1>
                            <p>
                                Every Slide you the Summoner will get to see a random champion without a name. <br />
                                The challenge for you is to correctly choose which name this champion has. <br />
                                You will get to see 20 20 champions in total,<br /> after having all the champions you will an overview of your results!
                            </p>
                            <div className="button button-start" onClick={() => this.startIron()}>
                                Start
                            </div>
                        </div>
                    </>
                    : ""
                }
                { this.state.start === true ? //Game
                    <>
                        <div className="col-12 text-center mt-5 mb-5">
                            <h1 className="mt-5 mb-5">
                                Choose the correct name for this champion
                            </h1>
                            <img src={ this.state.championImageURL } alt="Champion image" className="championImage" />
                        </div>
                        <div className="col-12 col-md-6 offset-md-3">
                            <div className="row">
                                <div className={"col-12 col-md-6 text-center champion-name order-" + randomOrder1 }>
                                    { this.state.championCorrect.name }
                                </div>
                                <div className={"col-12 col-md-6 text-center champion-name order-" + randomOrder2 }>
                                    { this.state.championFalse.name }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center mt-5 mb-5">
                            <div className="button button-start" onClick={() => this.generateNewQuestion()}>
                                New Question
                            </div>
                        </div>
                    </>
                    : ""
                }
            </>
        )
    }

}

export default GameIron;
