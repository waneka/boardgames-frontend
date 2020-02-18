import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "../../components/ErrorMessage";

// const GAME_EVENTS_SUBSCRIPTION = gql`
//   subscription GAME_EVENTS_SUBSCRIPTION($gameId: ID!) {
//     gameEvent(gameId: $gameId) {
//       node {
//         type
//         game {
//           id
//           name
//         }
//       }
//       mutation
//       updatedFields
//     }
//   }
// `;

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
  // const { data, loading } = useSubscription(GAME_EVENTS_SUBSCRIPTION, {
  //   variables: { gameId: game }
  // });
  // console.log("game :", game);
  // console.log("data", data);
  // console.log("loading", loading);
  const { data, error, loading } = useQuery(CURRENT_GAME_QUERY, {
    variables: { id: game }
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <Error error={error} />;

  const [createGameEvent, gameEventData] = useMutation(
    CREATE_GAME_EVENT_MUTATION
  );
  console.log("gameEventData :", gameEventData);

  return (
    <div>
      Game: {data.game.name}
      <button
        className=""
        onClick={() =>
          createGameEvent({
            variables: {
              gameId: data.game.id,
              type: "TRASH_FOOD"
            }
          })
        }
      >
        Click
      </button>
    </div>
  );
}

export default Game;
