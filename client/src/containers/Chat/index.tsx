import React, { useEffect, useState, createRef } from "react";
import { Button } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import { PageWrapper } from "../../components/PageWrapper";
import { IMessage } from "../../types/message";
import Message from "../../components/Message";

import { IUser } from "../../types/user";
import MobileSidebar from "../../components/MobileSidebar";
import UserList from "../../components/UserList";
import { Topbar } from "../../components/Topbar";

const socket = io("/api");

const Grid = styled.div`
  display: grid;
  grid-template-columns: 400px 300px;
  grid-gap: 30px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const ChatWrapper = styled.div`
  overflow: hidden;
  background-color: white;
  box-shadow: -7px 9px 30px -8px rgba(59, 59, 59, 1);
  display: grid;
  grid-template-rows: min-content 400px min-content;

  @media (max-width: 376px) {
    height: 100vh;
    width: 100vw;
    grid-template-rows: min-content 1fr min-content;
  }
`;

const MessagesWrapper = styled.div`
  background-color: white;
  border-bottom: 1px solid grey;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: 15px;
`;

const BottomBar = styled.div``;

const StyledInput = styled.input`
  height: 100%;
  border: none;
  padding: 10px;
  height: 50px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const UserListWrapper = styled.div`
  background-color: white;
  box-shadow: -7px 9px 30px -8px rgba(59, 59, 59, 1);
  min-width: 200px;

  @media (max-width: 376px) {
    display: none;
  }
`;

const Chat = () => {
  const location = useLocation();
  const history = useHistory();
  const isMobile = useMediaQuery({ query: "(max-width: 376px)" });

  const [inputRef] = useState(createRef<HTMLInputElement>());
  const [bottomBarRef] = useState(createRef<HTMLDivElement>());

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState<IUser[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const queries = queryString.parse(location.search);

    const { room, name } = queries;
    if (!room || !name) {
      return history.push("/");
    }

    socket.emit("join", { name, room }, () => {});
    setCurrentRoom(room as string);
    setCurrentName(name as string);

    return () => {
      socket.emit("disconnect");
      socket.close();
    };
  }, [location.search, history]);

  useEffect(() => {
    socket.on("message", (newMessage: IMessage) => {
      setMessages((messages) => [
        ...messages,
        {
          ...newMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });
  }, []);

  useEffect(() => {
    socket.on(
      "roomData",
      ({ room, users }: { room: string; users: IUser[] }) => {
        if (room === currentRoom) {
          setUsers(users);
        }
      }
    );
  }, [currentRoom]);

  useEffect(() => {
    bottomBarRef?.current?.scrollIntoView();
  }, [messages, bottomBarRef]);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

  const sendMessage = () => {
    socket.emit("sendMessage", message, ({ error }: { error?: string }) => {
      if (error) {
        alert(error);
      }

      setMessage("");
    });
  };

  return (
    <PageWrapper>
      {isMobile && (
        <MobileSidebar
          isVisible={isMobileSidebarOpen}
          closeSidebar={() => setIsMobileSidebarOpen(false)}
          activeUsers={users}
          currentRoom={currentRoom}
        />
      )}

      <Grid>
        <ChatWrapper>
          <Topbar>
            {currentRoom}

            {isMobile && (
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => setIsMobileSidebarOpen(true)}
              />
            )}
          </Topbar>

          {currentName && (
            <MessagesWrapper>
              {messages.map((message, index) => {
                return (
                  <Message
                    key={`${message.text}-${index}`}
                    isContinuation={
                      index > 0 && messages[index - 1].user === message.user
                    }
                    currentName={currentName}
                    message={message}
                  />
                );
              })}
              <BottomBar ref={bottomBarRef} />
            </MessagesWrapper>
          )}

          <InputWrapper>
            <StyledInput
              ref={inputRef}
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button size="large" onClick={sendMessage}>
              Submit
            </Button>
          </InputWrapper>
        </ChatWrapper>
        <UserListWrapper>
          <Topbar>Active Users</Topbar>
          <UserList users={users} />
        </UserListWrapper>
      </Grid>
    </PageWrapper>
  );
};

export default Chat;
