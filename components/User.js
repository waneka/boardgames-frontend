// import { Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      username
      permissions
    }
  }
`;

function User(props) {
  const payload = useQuery(CURRENT_USER_QUERY);

  return <>{props.children}</>;
}

// const User = props => (
//   <Query {...props} query={CURRENT_USER_QUERY}>
//     {payload => props.children(payload)}
//   </Query>
// );

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
