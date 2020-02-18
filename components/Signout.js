import React from "react";
import { useMutation } from "@apollo/react-hooks";
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
  const [signout, data] = useMutation(SIGN_OUT_MUTATION);

  return (
    <div
      className="signout"
      onClick={async () => {
        const res = await signout({
          refetchQueries: [{ query: CURRENT_USER_QUERY }]
        });

        if (res.data.signout.message) {
          router.push("/signin");
        }
      }}
    >
      Sign Out
    </div>
  );
}

export default Signout;
