import styled from "styled-components";

const variantMap = {
  primary: {
    color: "white",
    backgroundColor: "#2980b9",
    borderColor: "#2980b9"
  },
  secondary: {
    color: "white",
    backgroundColor: "#27ae60",
    borderColor: "#27ae60"
  },
  danger: {
    color: "white",
    backgroundColor: "#bf322d",
    borderColor: "#bf322d"
  },
  ghost: {
    color: "#393939",
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  openPrimary: {
    color: "#2980b9",
    backgroundColor: "transparent",
    borderColor: "#2980b9"
  },
  openSecondary: {
    color: "#27ae60",
    backgroundColor: "transparent",
    borderColor: "#27ae60"
  }
};

const sizeMap = {
  default: "12px",
  compact: "4px 12px"
};

const Button = styled.button`
  display: flex;
  overflow: hidden;
  padding: ${props => sizeMap[props.size || "default"]};
  cursor: pointer;
  user-select: none;
  transition: all 150ms linear;
  text-align: center;
  white-space: nowrap;

  font-size: 1.2rem;
  color: ${props => variantMap[props.variant || "primary"].color};
  background-color: ${props =>
    variantMap[props.variant || "primary"].backgroundColor};

  border: 3px solid
    ${props => variantMap[props.variant || "primary"].borderColor};
  border-radius: 4px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  justify-content: space-around;
  align-items: center;

  /* box-shadow: 1px 2px 4px ${props => props.theme.darkGrey}; */

  &:hover {
    transition: all 150ms linear;
    opacity: 0.85;
  }

  &:active {
    transition: all 150ms linear;
    opacity: 0.75;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    transition: all 150ms linear;
    opacity: 0.5;
  }

  .pl {
    padding-left: 10px;
  }
`;

export default Button;
