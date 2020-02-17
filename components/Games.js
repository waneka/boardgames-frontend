import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Game from "./Game";

const ALL_GAMES_QUERY = gql`
  query ALL_GAMES_QUERY {
    games {
      id
      name
      radioMilestone
      cfoMilestone
      currentTurn
      currentPhase
      updatedAt
      players {
        username
        id
      }
    }
  }
`;

const GamesList = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${props => props.theme.maxWidth};
  background-color: ${props => props.theme.grey};
  padding: 0 5px 5px 5px;
  margin: auto;
`;

const GameListHeader = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr 0.5fr 0.8fr 1fr;
  align-items: center;
  margin-top: 20px;
`;

const Games = () => (
  <Query query={ALL_GAMES_QUERY}>
    {({ data, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      return (
        <>
          <h1>Active Games</h1>
          <GameListHeader>
            <div>
              <strong>Name</strong>
            </div>
            <div>
              <strong>Players</strong>
            </div>
            <div>
              <strong>Current Turn</strong>
            </div>
            <div>
              <strong>Current Phase</strong>
            </div>
            <div>
              <strong>Last Activity</strong>
            </div>
          </GameListHeader>
          <GamesList>
            {data.games.map(game => (
              <Game game={game} key={game.id} />
            ))}
          </GamesList>
        </>
      );
    }}
  </Query>
);

export default Games;
