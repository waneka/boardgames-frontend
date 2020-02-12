import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import Error from "./ErrorMessage";
import PlayerSearch from "./PlayerSearch";

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
  input {
    border-radius: 0;
    font-size: 1.5rem;
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
              placeholder="Name of the game"
              value={name}
              onChange={e => setName(e.target.value)}
            />
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
            <div className="">Players:</div>
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
            <div>
              <button
                className="addPlayer"
                type="button"
                disabled={players.length >= 5}
                onClick={() => {
                  if (players.length >= 5) return;
                  addOrRemovePlayer(players.length + 1);
                }}
              >
                + Add Player
              </button>
            </div>
            <button type="submit" disabled={disableForm}>
              Create Game
            </button>
          </StyledFieldset>
        </StyledForm>
      )}
    </Mutation>
  );
}

export default NewGame;
