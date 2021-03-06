import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";
import Signout from "./Signout";

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  .user,
  a {
    padding: 0.5rem 1rem;
    background-color: ${props => props.theme.lightBlue};
    color: ${props => props.theme.darkRed};
    text-transform: uppercase;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const Nav = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: ${props => props.theme.black};
  text-align: center;
  align-items: center;
  .user,
  .signout,
  a {
    color: ${props => props.theme.white};
    padding: 10px;
    text-transform: uppercase;
  }
  .signout {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

const Header = props => {
  const { data: { me } = {}, loading } = useQuery(CURRENT_USER_QUERY);
  return (
    <div>
      <Logo>
        <Link href="/">
          <a>Food Chain Magnate</a>
        </Link>
      </Logo>
      <Nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        {me && (
          <>
            <Link href="/games/new">
              <a>New Game</a>
            </Link>
            <Link href="/account">
              <a>Account</a>
            </Link>
            <Signout />
          </>
        )}
        {!me && (
          <Link href="/signin">
            <a>Sign In</a>
          </Link>
        )}
      </Nav>
    </div>
  );
};

export default Header;
