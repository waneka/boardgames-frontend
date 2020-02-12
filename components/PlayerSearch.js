import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import styled from "styled-components";
import debounce from "lodash.debounce";

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
    top: 26px;
    background-color: white;
    border: 1px solid darkgrey;
    z-index: 2;
    .li {
      border-bottom: 1px solid darkgrey;
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
              <input
                type="text"
                autoComplete="off"
                name={playerId}
                value={playerInput}
                placeholder="Player username"
                onChange={e => {
                  setPlayerInput(e.target.value);
                  handleSearchChange(e.target.value, client.query);
                }}
              />
            </label>
            <div className="remove">
              {showRemove && (
                <button
                  type="button"
                  onClick={() => {
                    handleRemovePlayer(index);
                  }}
                  className=""
                >
                  - Remove Player
                </button>
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
