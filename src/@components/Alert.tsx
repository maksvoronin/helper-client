import React, { useEffect } from "react";
import { close } from "../@services";
import { IAlert } from "../@types";
import { keyframes, styled } from "styled-components";

const init = keyframes`
  from {
    margin-left: 30vw;
  }
  to {
    margin-left: 0vw;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  left: -8px;
  top: -8px;
  padding: 7px;
  border-radius: 100px;
  line-height: 0.5;
  background: rgba(255, 255, 255, 1);
  width: 3px;
  height: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  padding-top: 6px;
  padding-bottom: 8px;
  opacity: 0;
  transition: opacity 0.3s, box-shadow 0.3s;
  overflow: hidden;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.05);
  user-select: none;

  @media (prefers-color-scheme: dark) {
    background: rgba(80, 80, 80, 1);
    border: 1px solid rgb(90, 90, 90);
  }

  &:hover {
    box-shadow: 0px 3px rgba(0, 0, 0, 0.15);
  }
`;

const AlertBlock = styled.div`
  padding: 15px;
  backdrop-filter: blur(15px);
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #eee;
  border-radius: 12px;
  width: calc(100% - 32px);
  position: relative;
  transition: margin 0.3s;
  animation: ${init} 0.5s;

  &:hover {
    ${CloseBtn} {
      opacity: 1;
    }
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(80, 80, 80, 0.8);
    border: 1px solid rgb(90, 90, 90);
  }

  &.error {
    background: rgba(255, 63, 63, 0.5);
  }

  &:hover {
    .close {
      opacity: 1;
    }
  }
`;

const ATitle = styled.p`
  font-weight: bold;
`;

const AMessage = styled.p`
  word-wrap: wrap;
`;

const Alert: React.FC<IAlert> = ({ id, type, title, message, time, onClick }) => {
  useEffect(() => {
    if (time && id) {
      const timer = setTimeout(() => {
        close(id);
      }, time * 1_000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [id, time]);

  if (id) {
    return (
      <AlertBlock onClick={onClick} id={`alert${id}`}>
        <CloseBtn onClick={() => close(id)}>&times;</CloseBtn>
        <ATitle>{title}</ATitle>
        <AMessage>{message}</AMessage>
      </AlertBlock>
    );
  } else {
    return (
      <AlertBlock onClick={onClick}>
        <ATitle>{title}</ATitle>
        <AMessage>{message}</AMessage>
      </AlertBlock>
    );
  }
};

export default Alert;
