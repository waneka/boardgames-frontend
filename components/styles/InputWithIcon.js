import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  .icon {
    position: absolute;
    top: 9px;
    left: 8px;
    height: 14px;
    transition: all 0.3s ease;
  }

  input:focus + .icon {
    transform: scale(1.2);
    color: ${props => props.theme.darkBlue};
  }
`;

const Input = styled.input`
  text-indent: 26px;
`;

function InputWithIcon({ icon, ...props }) {
  return (
    <InputWrapper>
      <Input {...props} />
      <FontAwesomeIcon icon={icon} className="icon" />
    </InputWrapper>
  );
}

export default InputWithIcon;
