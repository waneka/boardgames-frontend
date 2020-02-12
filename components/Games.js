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
    }
  }
`;

const GamesList = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${props => props.theme.maxWidth};
  margin: auto;
`;

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Query query={ALL_GAMES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <GamesList>
                {data.games.map(game => (
                  <Game game={game} key={game.id} />
                ))}
              </GamesList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Games;
