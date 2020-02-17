import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

const StyledGame = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr 0.5fr 0.8fr 1fr;
  align-items: center;
  grid-gap: 5px;
  margin-top: 5px;
  .cell {
    border: 1px solid ${props => props.theme.darkGrey};
    align-self: stretch;
    padding: 5px;
    background-color: white;
  }
  .players {
    display: flex;
    flex-wrap: wrap;
    .player {
      margin-right: 10px;
    }
  }
`;

const Game = ({ game }) => {
  const { name, id, currentTurn, currentPhase, players, updatedAt } = game;

  const date = new Date(updatedAt);

  return (
    <StyledGame>
      <div className="cell">
        <Link href="/games/[game]" as={`/games/${id}`}>
          <a>{name}</a>
        </Link>
      </div>
      <div className="players cell">
        {players.map(player => (
          <div key={player.id} className="player">
            {player.username}
          </div>
        ))}
      </div>
      <div className="cell">{currentTurn}</div>
      <div className="cell">{currentPhase}</div>
      <div className="cell">
        {date.toLocaleDateString(undefined, {
          dateStyle: "medium",
          timeStyle: "short"
        })}
      </div>
    </StyledGame>
  );
};

Game.propTypes = {};
Game.defaultProps = {};

export default Game;
