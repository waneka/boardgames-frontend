import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

const StyledGame = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  align-items: center;
`;

const Game = ({ game }) => {
  const {
    name,
    radioMilestone,
    cfoMilestone,
    currentTurn,
    currentPhase
  } = game;
  return (
    <StyledGame>
      <div>name: {name}</div>
      <div>radio milestone: {`${radioMilestone}`}</div>
      <div>cfo milestone: {`${cfoMilestone}`}</div>
      <div>current turn: {currentTurn}</div>
      <div>current phase: {currentPhase}</div>
    </StyledGame>
  );
};

Game.propTypes = {};
Game.defaultProps = {};

export default Game;
