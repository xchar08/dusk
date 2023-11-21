import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { GameContext } from '../services/gameState';
import {PHASE_NOT_STARTED, PHASE_TALK, PHASE_TEAM_VOTE, PHASE_TEAM_REVOTE, PHASE_NODE_VOTE, PHASE_OUTCOME, PHASE_COMPLETE, missionAdvance } from '../services/api.service';
import ChatPhase from './ChatPhase';
import NotStartedPhase from './NotStartedPhase';
import TeamVotePhase from './TeamVotePhase';
import NodeVotePhase from './NodeVotePhase';
import OutcomePhase from './OutcomePhase';
import CompletePhase from './CompletePhase';

export default function GameLobby({ navigation, route }) {
  const game = useContext(GameContext);
  const [phasekey, setPhaseKey] = useState(PHASE_NOT_STARTED);

  const hostHandleStart = () =>
  {
    console.log("Handle Start Pressed");
    setPhaseKey(PHASE_TALK);
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_CHAT);
      game.mission = mission;
    });
  };



  const handleChatEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_TEAM_VOTE);
      game.mission = mission;
    });
  };

  const handleTeamVoteEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_NODE_VOTE);
      game.mission = mission;
    });
  }

  const handleNodeVoteEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_OUTCOME);
      game.mission = mission;
    });
  }

  

  return (
    <View style={styles.container}>
      <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
        <Text>GameId: {game.code}</Text>
        {phasekey === PHASE_NOT_STARTED && <NotStartedPhase onStart={hostHandleStart} game={game}/>}
        {phasekey === PHASE_TALK && <ChatPhase onEnd={handleChatEnd} />}
        {phasekey === PHASE_TEAM_VOTE && <TeamVotePhase onEnd={handleTeamVoteEnd} />}
        {phasekey === PHASE_TEAM_REVOTE && <TeamVotePhase onEnd={handleTeamVoteEnd} />}
        {phasekey === PHASE_NODE_VOTE && <NodeVotePhase onEnd={handleNodeVoteEnd} />}
        {phasekey === PHASE_OUTCOME && <OutcomePhase />}
        {phasekey === PHASE_COMPLETE && <CompletePhase />}
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'stretch',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',

    marginLeft: 20,
    marginRight: 20,
  },
  GameLobbyButton: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'darkblue',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timer: {
    //alignSelf: 'top', doesnt work
  },


})