import React, { Component } from "react";
import axios from "axios";
import "./default.scss"

class GameBronze extends Component {
    constructor(props) {
        super(props);

        // initiate all states
        this.state = {
            difficulty: 0,
            start: false,
            champions: null,
            totalChampions: 0,
            score: 0,
            showResults: true,
            resultThis: null,
            resultQuestion: false,
            currentQuestion: 1,
            championCorrect: null,
            championImageURL: null,
            guess: "",
            attempts: 0,
        };
    }

    componentDidMount(){
        // set title on page
        document.title = "Learn the Champs | Bronze";

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

    startBronze() {
        this.setState({
            start: true,
        });

        this.generateNewQuestion();
    }

    generateNewQuestion() {
        let randomNumber = Math.floor(Math.random() * this.state.totalChampions);
        let key1 = Object.keys(this.state.champions)[randomNumber];
        let champion = this.state.champions[key1];
        let championImageName = champion.image.full.split(".");
        let championImageURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + championImageName[0] + "_0.jpg"

        this.setState({
            championCorrect: champion,
            championImageURL: championImageURL,
            guess: "",
            attempts: 0
        })
    }

    changeAnswer(e) {
        this.setState({
            guess: e.target.value,
        })
    }

    similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    checkAnswer() {
        console.log(this.state.attempts);

        if( this.similarity(this.state.championCorrect.name,this.state.guess) > 0.75 ) {
            this.newQuestion();
            this.setState({
                score: this.state.score + 1,
                currentQuestion: this.state.currentQuestion + 1
            });
        }
        else {
            if(this.state.attempts >= 2){
                this.newQuestion();
                this.setState({
                    currentQuestion: this.state.currentQuestion + 1
                });
            }
            else{
                alert("Dit was helaas fout u heeft in totaal 3 pogingen per champion");
                this.setState({
                    attempts: this.state.attempts + 1
                })
            }
        }
    }

    newQuestion(){
        if(this.state.currentQuestion === 20){
            this.setState({
                resultQuestion: true,
            });
        }
        else {
            this.generateNewQuestion();
        }
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
                                You will get to see 20 champions in total,<br /> after having all the champions you will an overview of your results!
                            </p>
                            <div className="button button-start" onClick={() => this.startBronze()}>
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
                            <div className="col-12">
                                <div className="row">
                                    <div className={"col-12 text-center d-flex justify-content-center align-items-center"}>
                                        <div>
                                            <input type="text" name="champion-name" value={this.state.guess} onChange={this.changeAnswer.bind(this)} />
                                            <div className="button button-start mt-5" onClick={() => this.checkAnswer()}>
                                                Next Question
                                            </div>
                                        </div>
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
                                            { this.state.currentQuestion === 20 ? //show results
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
                                                <img src="/ranked-emblems/Emblem_Silver.png" alt="Bronze" className="bronze-emblem" />
                                                <p>
                                                    Very nice!, you have been promoted to silver!
                                                </p>

                                            </>
                                            :
                                            <p>
                                                Nice try, maybe try again before promoting to silver
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

export default GameBronze;
