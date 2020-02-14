import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import Error from "./ErrorMessage";
import PlayerSearch from "./PlayerSearch";
import Button from "./styles/Button";

const CREATE_GAME_MUTATION = gql`
  mutation CREATE_GAME_MUTATION(
    $name: String!
    $radioMilestone: Boolean!
    $cfoMilestone: Boolean!
    $players: [PlayerInput]!
  ) {
    createGame(
      name: $name
      radioMilestone: $radioMilestone
      cfoMilestone: $cfoMilestone
      players: $players
    ) {
      id
    }
  }
`;

const StyledFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  margin: auto;
  max-width: 500px;
  fieldset {
    border: 1px solid ${props => props.theme.darkGrey};
    border-radius: 5px;
    padding: 12px;
  }
  input[type="text"] {
    border-radius: 0;
    border: 1px solid ${props => props.theme.grey};
    padding: 5px;
    font-size: 1.5rem;
    width: 100%;
  }
  .playerBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const HR = styled.div`
  width: 100%;
  border-top: 1px solid ${props => props.theme.grey};
  margin: 10px 0;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  button {
    font-size: 2rem;
  }
`;

function NewGame() {
  const blankPlayer = { id: "", username: "" };

  const [name, setName] = useState("");
  const [radioMilestone, setRadioMilestone] = useState(true);
  const [cfoMilestone, setCfoMilestone] = useState(true);
  const [players, setPlayers] = useState([
    { ...blankPlayer },
    { ...blankPlayer }
  ]);

  const addOrRemovePlayer = index => {
    if (index > players.length) {
      setPlayers([...players, { ...blankPlayer }]);
    } else {
      const newPlayers = [...players];
      newPlayers.splice(index, 1);
      setPlayers(newPlayers);
    }
  };

  const handlePlayerUpdate = (playerObj, index) => {
    const newPlayers = [...players];
    newPlayers[index] = playerObj;

    setPlayers(newPlayers);
  };

  const disableForm = players.filter(player => player.id).length < 2;

  return (
    <Mutation
      mutation={CREATE_GAME_MUTATION}
      variables={{ name, radioMilestone, cfoMilestone, players }}
    >
      {(createGame, { error, loading }) => (
        <StyledForm
          onSubmit={async e => {
            e.preventDefault();
            if (disableForm) return;

            await createGame();
          }}
        >
          <StyledFieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Game name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <HR />
            <label htmlFor="radioMilestone">
              Radio Milestone:
              <input
                type="checkbox"
                id="radioMilestone"
                name="radioMilestone"
                checked={radioMilestone}
                onChange={() => setRadioMilestone(!radioMilestone)}
              />
            </label>
            <label htmlFor="cfoMilestone">
              CFO Milestone:
              <input
                type="checkbox"
                id="cfoMilestone"
                name="cfoMilestone"
                checked={cfoMilestone}
                onChange={() => setCfoMilestone(!cfoMilestone)}
              />
            </label>
            <HR />
            <div className="playerBar">
              <div>Players:</div>
              <Button
                className="addPlayer"
                type="button"
                size="compact"
                variant="openPrimary"
                disabled={players.length >= 5}
                onClick={() => {
                  if (players.length >= 5) return;
                  addOrRemovePlayer(players.length + 1);
                }}
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <div className="pl">Add Player</div>
              </Button>
            </div>
            {players.map((player, index) => {
              return (
                <PlayerSearch
                  key={`player-${index}`}
                  player={player}
                  handlePlayerUpdate={handlePlayerUpdate}
                  players={players}
                  showRemove={index >= 2}
                  handleRemovePlayer={addOrRemovePlayer}
                  index={index}
                />
              );
            })}
            <HR />
            <ActionBar>
              <Button
                className="signPainter"
                type="submit"
                variant="primary"
                disabled={disableForm}
              >
                Create Game
              </Button>
            </ActionBar>
          </StyledFieldset>
        </StyledForm>
      )}
    </Mutation>
  );
}

export default NewGame;
