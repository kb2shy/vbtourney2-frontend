import React, { Component } from 'react';
import { Button, Grid, Image, Header } from 'semantic-ui-react';

export default class PlayerAccount extends Component {

  render(){
    const {image, firstname, lastname, position, jersey,
      team, isScoreKeeper, isTeamCaptain} = this.props.current_user;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image src={image} size="large"/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h1" block>{firstname} {lastname}</Header>
            <h3>Team: {!team ?  "Not on a team": team.name}   {isTeamCaptain ? "*Captain*" : null}</h3>
            <h3>Position: {position}</h3>
            <h3>Jersey: {jersey}</h3>
            <h3>Score Keeper status: {isScoreKeeper}</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column >
            <Button.Group floated="right" onClick={() => this.props.setDisplay('edit')}>
              <Button color="yellow">
                Update
              </Button>
              <Button.Or />
              <Button color="red" onClick={() => this.props.open()}>
                Delete
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    )
  }
}
