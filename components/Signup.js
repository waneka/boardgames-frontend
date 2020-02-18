import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(username: $username, email: $email, password: $password) {
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
  }
  input {
    border-radius: 0;
    font-size: 1.5rem;
    padding: 10px;
    margin: 15px 0;
    width: 100%;
    outline-color: ${props => props.theme.lightBlue};
  }
  input ~ label {
    position: absolute;
    left: 14px;
    width: 100%;
    top: 20px;
    transition: 0.3s;
    z-index: 1;
    letter-spacing: 0.5px;
    font-size: 1.6rem;
    color: #a9a9a9;
    font-family: sans-serif;
  }
  input:focus ~ label,
  input.hasContent ~ label {
    top: -10px;
    left: 6px;
    font-size: 1.2rem;
    transition: 0.3s;
    color: ${props => props.theme.lightBlue};
  }
  .buttonWrapper {
    display: flex;
    justify-content: center;
  }
  button {
    margin-top: 25px;
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
  .horLine {
    width: 100%;
    border-top: 1px solid #a9a9a9;
    margin-top: 20px;
  }
`;

function Signup({ setAuthFlow }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION);

  return (
    <StyledForm
      method="post"
      onSubmit={async e => {
        e.preventDefault();

        if (!username || !email || !password) return;
        const res = await signup({
          variables: { username, email, password },
          refetchQueries: [{ query: CURRENT_USER_QUERY }]
        });

        setUsername("");
        setEmail("");
        setPassword("");
        if (res.data.signup.id) {
          router.push("/");
        }
      }}
    >
      <StyledFieldset disabled={loading} aria-busy={loading}>
        <Error error={error} />
        <div className="signupTitle">Sign up for an account</div>
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
            type="text"
            id="username"
            name="username"
            placeholder=""
            className={username ? "hasContent" : ""}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
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
        </div>
        <div className="buttonWrapper">
          <button type="submit">Sign Up!</button>
        </div>
        <div className="horLine"></div>
        <div className="signinToggle">
          Already have an account?{" "}
          <button
            onClick={() => setAuthFlow("SIGNIN")}
            className="link"
            type="button"
          >
            Sign In
          </button>
        </div>
      </StyledFieldset>
    </StyledForm>
  );
}

export default Signup;
