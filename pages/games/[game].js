import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../../components/ErrorMessage";

const CREATE_GAME_EVENT_MUTATION = gql`
  mutation CREATE_GAME_EVENT_MUTATION($gameId: ID!, $type: GameEventType!) {
    createGameEvent(gameId: $gameId, type: $type) {
      id
      type
      game {
        name
      }
    }
  }
`;

const CURRENT_GAME_QUERY = gql`
  query CURRENT_GAME_QUERY($id: ID!) {
    game(where: { id: $id }) {
      id
      name
      events {
        type
      }
    }
  }
`;

function Game({ query: { game } }) {
  console.log("game :", game);
  return (
    <Query query={CURRENT_GAME_QUERY} variables={{ id: game }}>
      {({ data, error, loading }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <Error error={error} />;
        console.log("data.game :", data.game);

        return (
          <div>
            Game: {data.game.name}
            <Mutation
              mutation={CREATE_GAME_EVENT_MUTATION}
              variables={{
                gameId: data.game.id,
                type: "CREATE_BOARD"
              }}
            >
              {(createGameEvent, { error, loading, data }) => {
                console.log("data :", data);
                return (
                  <button className="" onClick={() => createGameEvent()}>
                    Click
                  </button>
                );
              }}
            </Mutation>
          </div>
        );
      }}
    </Query>
  );
}

export default Game;
