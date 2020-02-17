import React from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

const UserAuthCheck = props => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {(data, loading) => {
        if (loading) return <div>Loading...</div>;
        if (!data.data.me) {
          return <Signin />;
        }
        return props.children;
      }}
    </Query>
  );
};

export default UserAuthCheck;
