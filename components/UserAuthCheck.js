import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

const UserAuthCheck = props => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <div>Loading...</div>;
  if (!data.me) {
    return <Signin />;
  }
  return props.children;
};

export default UserAuthCheck;
