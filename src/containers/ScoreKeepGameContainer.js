import React, { Component } from 'react';
import ActionCable from 'actioncable';
import { Segment, Grid, Divider } from 'semantic-ui-react';
import ScoreKeepGame from '../components/ScoreKeepGame'

// const GAMES_URL = 'http://localhost:3000/games/';
// const WEBSOCKET = 'ws://localhost:3000/cable';

// const IMAGE = [
//   'https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=Hearts&eyebrowType=AngryNatural&mouthType=Disbelief&skinColor=Yellow',
//   'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription01&facialHairType=MoustacheFancy&facialHairColor=Blonde&clotheType=BlazerShirt&clotheColor=PastelYellow&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Concerned&skinColor=Yellow',
// ]

export default class ScoreKeepGameContainer extends Component {

  // state = {
  //   team1score: 0,
  //   team2score: 0,
  //   image1: IMAGE[0],
  //   image2: IMAGE[1],
  //   teams: {
  //     team1: '',
  //     team2: ''
  //   },
  // }

  // componentDidMount() {
  //   fetch(GAME_URL + "1")
  //   .then(res => res.json())
  //   .then(data => {
  //     if (data.team1score !== null && data.team2score !== null) {
  //       this.setState(data);
  //     } else {
  //       return this.state;
  //     }
  //   })
  //
  //   const cable = ActionCable.createConsumer(WEBSOCKET)
  //
  //   this.sub = cable.subscriptions.create('GamesChannel', {
  //     received: this.handleReceiveData
  //   })
  // }

  // this method copied to the App.js - may want to use here
  // handleReceiveData = (data) => {
  //   if (data !==  this.state ) {
  //     this.setState(data)
  //   }
  // }
  //
  // addScorePlayer1 = () => {
  //   this.setState({ team1: this.state.team1score + 1})
  //   let data = {id: 1, team1score: this.state.team1score + 1, team2score: this.state.team2score};
  //   this.sub.send(data);
  // }
  //
  // addScorePlayer2 = () => {
  //   this.setState({ team2score: this.state.team2score + 1})
  //   let data = {id: 1, team1score: this.state.team1score, team2score: this.state.team2score + 1};
  //   this.sub.send(data);
  // }

  render() {
    console.log(this.props.game)
    const { id, courtnum, team1score, team2score, teams } = this.props.game
    return (
      <Segment placeholder>
        <Grid centered>
          <Grid.Row centered columns={2}>
            <Grid.Column centered>
            <ScoreKeepGame team={teams[0]} score={team1score}/>
            </Grid.Column>
            <Grid.Column>
            <ScoreKeepGame team={teams[1]} score={team2score}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider vertical hidden>versus</Divider>
      </Segment>
    )
  }
}