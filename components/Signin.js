import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      username
    }
  }
`;

const StyledFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
`;

const StyledForm = styled.form`
  margin: auto;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  .signupTitle {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2rem;
  }
  .inputWrapper {
    position: relative;
    margin-top: 30px;
  }
  input {
    border-radius: 0;
    font-size: 1.5rem;
    padding: 10px;
    width: 100%;
    outline-color: ${props => props.theme.lightBlue};
  }
  input ~ label {
    position: absolute;
    left: 14px;
    width: 100%;
    top: 6px;
    transition: 0.3s;
    z-index: 1;
    letter-spacing: 0.5px;
    font-size: 1.6rem;
    color: #a9a9a9;
    font-family: sans-serif;
  }
  input:focus ~ label,
  input.hasContent ~ label {
    top: -22px;
    left: 6px;
    font-size: 1.2rem;
    transition: 0.3s;
    color: ${props => props.theme.lightBlue};
  }
  .signinToggle {
    margin-top: 25px;
  }
  .buttonWrapper {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
  button {
    padding: 10px 40px;
    border-radius: 0;
    font-size: 1.5rem;
    font-weight: 700;
    background-color: transparent;
    border: 2px solid;
    &:hover,
    &:focus {
      outline: 0;
    }
    transition: box-shadow 200ms ease-in-out, color 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px ${props => props.theme.red} inset;
      border-color: ${props => props.theme.red};
      color: ${props => props.theme.white};
    }
    &:active {
      box-shadow: 0 0 40px 40px ${props => props.theme.darkRed} inset;
      border-color: ${props => props.theme.darkRed};
      color: ${props => props.theme.white};
    }
  }
  .link {
    background: none;
    border: none;
    padding: 0;
    font-family: arial, sans-serif;
    color: #069;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: #069;
      box-shadow: none;
    }
  }
  .forgotPassword {
    font-size: 1.2rem;
    text-decoration: none;
    text-align: center;
    width: 100%;
  }
  .horLine {
    width: 100%;
    border-top: 1px solid #a9a9a9;
    margin-top: 20px;
  }
`;

function Signin({ setAuthFlow }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={{ username, email, password }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => (
        <StyledForm
          method="post"
          onSubmit={async e => {
            e.preventDefault();

            if (!email || !password) return;
            await signup();
            setUsername("");
            setEmail("");
            setPassword("");
          }}
        >
          <StyledFieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <div className="signupTitle">Sign into your account</div>
            <div className="inputWrapper">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=""
                className={email ? "hasContent" : ""}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="inputWrapper">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=""
                className={password ? "hasContent" : ""}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <button
                onClick={() => setAuthFlow("REQUEST_RESET")}
                type="button"
                className="link forgotPassword"
              >
                Forgot Password?
              </button>
            </div>
            <div className="buttonWrapper">
              <button type="submit">Sign In!</button>
            </div>
            <div className="horLine"></div>
            <div className="signinToggle">
              Don't have an account?{" "}
              <button
                onClick={() => setAuthFlow("SIGNUP")}
                className="link"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </StyledFieldset>
        </StyledForm>
      )}
    </Mutation>
  );
}

export default Signin;
