import Games from "../components/Games";
import UserAuthCheck from "../components/UserAuthCheck";

const Home = props => (
  <UserAuthCheck>
    <Games />
  </UserAuthCheck>
);

export default Home;
