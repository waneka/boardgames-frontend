import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation {
    signout {
      message
    }
  }
`;

function Signout() {
  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {signout => (
        <div className="signout" onClick={signout}>
          Sign Out
        </div>
      )}
    </Mutation>
  );
}

export default Signout;
