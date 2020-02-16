import React from "react";
import styled from "styled-components";

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  input[type="checkbox"] {
    position: absolute; // take it out of document flow
    opacity: 0; // hide it

    & + label {
      position: relative;
      cursor: pointer;
      padding: 0;
    }

    // Box.
    & + label:before {
      content: "";
      margin-right: 10px;
      display: inline-block;
      vertical-align: text-top;
      width: 20px;
      height: 20px;
      background: white;
      border: 1px solid ${props => props.theme.grey};
    }

    // Box hover
    &:hover + label:before {
      background: ${props => props.theme.darkBlue};
    }

    // Box focus
    &:focus + label:before {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
    }

    // Box checked
    &:checked + label:before {
      background: ${props => props.theme.darkBlue};
    }

    // Disabled state label.
    &:disabled + label {
      color: #b8b8b8;
      cursor: auto;
    }

    // Disabled box.
    &:disabled + label:before {
      box-shadow: none;
      background: #ddd;
    }

    // Checkmark. Could be replaced with an image
    &:checked + label:after {
      content: "";
      position: absolute;
      left: 5px;
      top: 14px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
        4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
      transform: rotate(45deg);
    }
  }
`;

function Checkbox({ label, id, ...rest}) {
  return (
    <CheckboxWrapper>
      <input
        type="checkbox"
        id={id}
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </CheckboxWrapper>
  );
}

export default Checkbox;
