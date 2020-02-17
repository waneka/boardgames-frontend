import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation {
    signout {
      message
    }
  }
`;

function Signout() {
  const router = useRouter();

  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {signout => (
        <div
          className="signout"
          onClick={async () => {
            const res = await signout();

            if (res.data.signout.message) {
              router.push("/signin");
            }
          }}
        >
          Sign Out
        </div>
      )}
    </Mutation>
  );
}

export default Signout;
