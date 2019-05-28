import React, { Component } from 'react';
import { Container, Image, Modal, Header } from 'semantic-ui-react';
import ActionCable from 'actioncable';

import MenuContainer from './containers/MenuContainer';
import ScoreKeepGameContainer from './containers/ScoreKeepGameContainer';
import GamesContainer from './containers/GamesContainer';
import TeamsContainer from './containers/TeamsContainer';
import PlayersContainer from './containers/PlayersContainer';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';

const GAMES_URL = 'http://localhost:3000/games/';
const LOGIN_URL = 'http://localhost:3000/login';
const CREATE_ACCOUNT_URL = 'http://localhost:3000/players'
const WEBSOCKET = 'ws://localhost:3000/cable';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      displayThis: '',
      games: [],
      game: {},
      open: false,
      current_user: {},
      isLoggedIn: false,
    }
  }

  componentDidMount() {
    fetch(GAMES_URL)
    .then(res => res.json())
    .then(data => {
      this.setState( { games: data})
    })

    const cable = ActionCable.createConsumer(WEBSOCKET)

    this.sub = cable.subscriptions.create('GamesChannel', {
      received: this.handleReceiveData
    })
  }

  handleReceiveData = (data) => {
    if (data !==  this.state.games[data.id - 1] ) {
      let games = this.state.games;
      games[data.id - 1] = data;
      this.setState(games)
    }
  }

  // add game scores for team1 and team2
  addScore = (team) => {
    let updateGame = this.state.game;
    if (team.name === this.state.game.teams[0].name) {
      updateGame["team1score"] = this.state.game.team1score + 1;
    } else {
      updateGame["team2score"] = this.state.game.team2score + 1;
    }
    this.setState({ updateGame });
    this.sub.send(updateGame);
  }

  // subtract game scores for team1 and team2
  minusScore = (team) => {
    let updateGame = this.state.game;
    if (team.name === this.state.game.teams[0].name) {
      updateGame["team1score"] = this.state.game.team1score - 1;
    } else {
      updateGame["team2score"] = this.state.game.team2score - 1;
    }
    this.setState({ updateGame });
    this.sub.send(updateGame);
  }

  // render single game component through SingleGameContainer
  setSingleGame = (game) => {
    if (game.team1score === null || game.team2score === null) {
      this.setState({ game: {
        id: game.id,
        courtnum: game.courtnum,
        team1score: 0,
        team2score: 0,
        teams: game.teams,
        open: true,
      }})
    } else {
      this.setState({game, open: true})
    }
  }

  setDisplayState = (menuItem) => {
    this.setState({ displayThis: menuItem, game: {} })
  }

  getDisplay = () => {
    switch (this.state.displayThis) {
      case "allgames":
        return <GamesContainer games={this.state.games} setSingleGame={this.setSingleGame}/>;
      case "allteams":
        return <TeamsContainer />
      case "allplayers":
        return <PlayersContainer />
      case "login":
        return <LoginContainer loginPlayer={this.loginPlayer}/>
      case "signup":
        return <SignupContainer createPlayer={this.createPlayer}/>
      default:
        return <Image src="/images/vblogo4.png" style={{marginTop: "3px"}} centered />;
    }
  }

  close = () => {
    this.setState({open: false})
  }

  loginPlayer = (loginCred) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({player: loginCred})
    })
    .then(res => res.json())
    .then(data => this.setState({current_user: data, isLoggedIn: true, displayThis: ""}))
  }

  createPlayer = (playerCred) => {
    fetch(CREATE_ACCOUNT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({player: playerCred})
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  logout = () => {
    console.log("logout pressed")
    debugger
    this.setState({ current_user: {}, isLoggedIn: false, displayThis: ""})
  }

  render() {
    return (
      <Container>
        <MenuContainer
          setDisplayState={this.setDisplayState}
          isLoggedIn={this.state.isLoggedIn}
          logout={this.logout}
          current_user={this.state.current_user}
        />
        {this.getDisplay()}
        <Modal open={this.state.open} onClose={this.close} centered>
          <Header as='h1' textAlign='center'>
            Game #{this.state.game.id} - Court #{this.state.game.courtnum}
          </Header>
          <Modal.Content>
            <ScoreKeepGameContainer
              game={this.state.game}
              addScore={this.addScore}
              minusScore={this.minusScore}
            />
          </Modal.Content>
        </Modal>

      </Container>
    )
  }
}
