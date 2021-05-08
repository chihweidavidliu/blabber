import React from "react";
import styled, { css } from "styled-components";
import { IMessage } from "../../types/message";

const UserLabel = styled.div<{ isCurrentUser: boolean }>`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => (props.isCurrentUser ? "white" : "#3f3f3f")};
`;

const MessageWrapper = styled.div<{ isCurrentUser: boolean }>`
  position: relative;
  border: 1px solid lightgrey;
  padding: 15px;
  margin: 5px;
  width: 60%;
  min-width: 0;
  display: grid;
  grid-gap: 10px;
  border-radius: 4px;
  background-color: whitesmoke;
  animation: fadein 0.2s;
  ${(props) =>
    props.isCurrentUser &&
    css`
      align-self: flex-end;
      background-color: teal;
      color: white;
      border: 1px solid #2e6068;
    `}

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Timestamp = styled.div`
  font-size: 12px;
  position: absolute;
  bottom: 3px;
  right: 3px;
`;

interface IMessageProps {
  currentName: string;
  message: IMessage;
  isContinuation?: boolean;
}

const Message = ({ currentName, message, isContinuation }: IMessageProps) => {
  return (
    <MessageWrapper isCurrentUser={currentName === message.user}>
      {!isContinuation && (
        <UserLabel isCurrentUser={currentName === message.user}>
          {message.user}
        </UserLabel>
      )}

      {message.text}
      <Timestamp>{message.timestamp}</Timestamp>
    </MessageWrapper>
  );
};

export default Message;
