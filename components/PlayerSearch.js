import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "./styles/Button";
import InputWithIcon from "./styles/InputWithIcon";

const PLAYER_SEARCH_QUERY = gql`
  query PLAYER_SEARCH_QUERY($searchValue: String!) {
    usersByUsername(searchValue: $searchValue) {
      id
      username
    }
  }
`;

const StyledPlayerSearch = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;
  label {
    width: 50%;
  }
  input {
    width: 100%;
  }
  .remove {
    width: 50%;
    padding-left: 10px;
  }
  .options {
    width: 50%;
    position: absolute;
    top: 36px;
    background-color: white;
    border: 1px solid darkgrey;
    z-index: 2;
    .li {
      border-bottom: 1px solid darkgrey;
      padding: 2px 5px;
      cursor: pointer;
      &:hover {
        background-color: ${props => props.theme.grey};
      }
    }
  }
`;

function PlayerSearch({
  player,
  handlePlayerUpdate,
  players,
  index,
  showRemove,
  handleRemovePlayer
}) {
  const [playerInput, setPlayerInput] = useState(player.username);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setPlayerInput(player.username);
  }, [player]);

  const playerId = `player-${index}`;

  const handleSearchChange = debounce(async (value, query) => {
    if (!value || value.length < 3) {
      // don't query
      return;
    }

    const res = await query({
      query: PLAYER_SEARCH_QUERY,
      variables: {
        searchValue: playerInput
      }
    });

    const filteredUsers = res.data.usersByUsername
      .filter(user => {
        return !players.find(player => player.id === user.id);
      })
      .map(user => ({ id: user.id, username: user.username }));

    setOptions(filteredUsers);
  }, 300);

  return (
    <ApolloConsumer>
      {client => {
        return (
          <StyledPlayerSearch>
            <label htmlFor={playerId}>
              <InputWithIcon
                type="text"
                autoComplete="off"
                name={playerId}
                value={playerInput}
                placeholder="Player username"
                onChange={e => {
                  setPlayerInput(e.target.value);
                  handleSearchChange(e.target.value, client.query);
                }}
                icon={faUser}
              />
            </label>
            <div className="remove">
              {showRemove && (
                <Button
                  type="button"
                  size="compact"
                  variant="openPrimary"
                  onClick={() => {
                    handleRemovePlayer(index);
                  }}
                >
                  <FontAwesomeIcon icon={faUserMinus} />
                  <div className="pl">Remove Player</div>
                </Button>
              )}
            </div>
            {options.length ? (
              <div className="options">
                {options.map(option => {
                  return (
                    <div
                      className="li"
                      key={option.id}
                      onClick={() => {
                        handlePlayerUpdate(option, index);
                        setOptions([]);
                      }}
                    >
                      {option.username}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </StyledPlayerSearch>
        );
      }}
    </ApolloConsumer>
  );
}

export default PlayerSearch;
