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
            showResults: false,
            resultThis: null,
            resultQuestion: false,
            currentQuestion: 1,
            championCorrect: null,
            championImageURL: null,
            championFalse: null,
            championFalseImageURL: null,
        };
    }

    componentDidMount(){
        // set title on page
        document.title = "Learn the Champs | Iron";

        //Fetch all Champions from ddragon with basic info (no abilities)
        axios.get(`https://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json`)
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
            start: true,
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
        let championImageURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + championImageName[0] + "_0.jpg"
        let championFalseImageName = championFalse.image.full.split(".");
        let championFalseImageURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + championFalseImageName[0] + "_0.jpg"

        this.setState({
            championCorrect: champion,
            championFalse: championFalse,
            championImageURL: championImageURL,
            championFalseImageURL: championFalseImageURL,
        })
    }

    checkAnswer(answer) {
        if( answer === true ) {
            this.setState({
                score: this.state.score + 1,
                resultThis: "Correct",
            });
        }
        else {
            this.setState({
                resultThis: "False",
            });
        }

        this.setState({
            resultQuestion: true,
            currentQuestion: this.state.currentQuestion + 1,
        })
    }

    newQuestion(){
        this.generateNewQuestion();

        this.setState({
            resultQuestion: false,
        })
    }

    showResults() {
        this.setState({
            showResults: true,
        })
    }

    tryAgain() {
        window.location.reload(false);
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
                        <div className="score-overview">
                            { this.state.score } / { this.state.currentQuestion - 1 }
                        </div>
                        { this.state.resultQuestion === false ? //Show result question or the game
                        <>
                            <div className="col-12 text-center mt-5 mb-5">
                                <h1 className="mt-5 mb-5">
                                    Choose the correct name for this champion
                                </h1>
                                <img src={ this.state.championImageURL } alt="Champion" className="champion-image" />
                            </div>
                            <div className="col-12 col-md-6 offset-md-3">
                                <div className="row">
                                    <div className={"col-12 col-md-6 text-center champion-name order-" + randomOrder1 } onClick={this.checkAnswer.bind(this, true)}>
                                        { this.state.championCorrect.name }
                                    </div>
                                    <div className={"col-12 col-md-6 text-center champion-name order-" + randomOrder2 } onClick={this.checkAnswer.bind(this, false)}>
                                        { this.state.championFalse.name }
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="col-12 text-center mt-5 mb-5">
                                { this.state.showResults === false ? //show result single or total
                                    <>
                                        <h1 className="mt-md-5 mb-md-5 mt-2 mb-2">
                                            { this.state.resultThis }
                                        </h1>
                                        { this.state.resultThis === "False" ?
                                            <>
                                                <p className="mb-5">
                                                    You guessed incorrectly, view below what the 2 champions look like!
                                                </p>
                                            </>
                                            : ""
                                        }
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="image-wrapper">
                                                    <img src={ this.state.championImageURL } alt="Champion" className="img-fluid champion-image-answer"/>
                                                    <div className="champion-name">
                                                        { this.state.championCorrect.name }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 mt-4 mt-md-4">
                                                <div className="image-wrapper">
                                                    <img src={ this.state.championFalseImageURL } alt="Champion" className="img-fluid champion-image-answer"/>
                                                    <div className="champion-name">
                                                        { this.state.championFalse.name }
                                                    </div>
                                                </div>
                                            </div>
                                            { this.state.currentQuestion === 21 ? //show results
                                                <div className="button button-start mt-5" onClick={() => this.showResults()}>
                                                    Show Results
                                                </div>
                                                :
                                                <div className="button button-start mt-5" onClick={() => this.newQuestion()}>
                                                    Next Question
                                                </div>
                                            }

                                        </div>
                                    </>
                                    :
                                    <>
                                        <h1 className="mt-5 mb-5">
                                            Results
                                        </h1>
                                        <p>
                                            your score is { this.state.score } / { this.state.currentQuestion - 1 }
                                        </p>
                                        { (( this.state.score / ( this.state.currentQuestion - 1 ) ) * 100 ) >= 60 ?
                                            <>
                                                <img src="/ranked-emblems/Emblem_Bronze.png" alt="Bronze" className="bronze-emblem" />
                                                <p>
                                                    Very nice!, you have been promoted to bronze!
                                                </p>

                                            </>
                                            :
                                            <p>
                                                Nice try, maybe try again before promoting to bronze
                                            </p>
                                        }
                                        <div className="fake-link" onClick={() => this.tryAgain()}>
                                            Try again!
                                        </div>
                                    </>
                                }
                            </div>
                        </> }
                    </>
                    : ""
                }
            </>
        )
    }

}

export default GameIron;
