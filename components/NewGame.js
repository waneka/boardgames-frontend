import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTrophy } from "@fortawesome/free-solid-svg-icons";

import Error from "./ErrorMessage";
import PlayerSearch from "./PlayerSearch";
import Button from "./styles/Button";
import Checkbox from "./styles/Checkbox";
import InputWithIcon from "./styles/InputWithIcon";
import UserAuthCheck from "./UserAuthCheck";

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
  border-top: 1px solid ${props => props.theme.darkGrey};
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
  const [players, setPlayers] = useState([{ ...blankPlayer }]);

  const [createGame, { error, loading, called, data }] = useMutation(
    CREATE_GAME_MUTATION
  );
  console.log("object :", { error, loading, called, data });

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

  const disableForm = players.filter(player => player.id).length < 1;

  return (
    <UserAuthCheck>
      <StyledForm
        onSubmit={async e => {
          e.preventDefault();
          if (disableForm) return;

          const res = await createGame({
            variables: { name, radioMilestone, cfoMilestone, players }
          });
          if (res.data.createGame.id) {
            console.log("created!!!");
            // clear form
            // redirect to... game page?
          }
        }}
      >
        <StyledFieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          <label htmlFor="name">Name:</label>
          <InputWithIcon
            id="name"
            name="name"
            placeholder="Game name"
            value={name}
            onChange={e => setName(e.target.value)}
            icon={faTrophy}
          />
          <HR />
          <Checkbox
            id="radioMilestone"
            name="radioMilestone"
            checked={radioMilestone}
            onChange={() => setRadioMilestone(!radioMilestone)}
            label="Radio Milestone"
          />
          <Checkbox
            id="cfoMilestone"
            name="cfoMilestone"
            checked={cfoMilestone}
            onChange={() => setCfoMilestone(!cfoMilestone)}
            label="CFO Milestone"
          />
          <HR />
          <div className="playerBar">
            <div>Players:</div>
            <Button
              className="addPlayer"
              type="button"
              size="compact"
              variant="openPrimary"
              disabled={players.length >= 4}
              onClick={() => {
                if (players.length >= 4) return;
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
                showRemove={index >= 1}
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
    </UserAuthCheck>
  );
}

export default NewGame;
