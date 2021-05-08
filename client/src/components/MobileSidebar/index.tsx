import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { IUser } from "../../types/user";
import UserList from "../UserList";
import { Topbar } from "../Topbar";

const MobileSidebarWrapper = styled.div<{ isVisible?: boolean }>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  ${(props) => (props.isVisible ? `right: 0;` : `right: 200vw;`)}
  background-color: teal;
  z-index: 2;
  transition: right 0.4s;
`;

const Header = styled.div`
  font-size: 20px;
  color: white;
  padding: 15px;
`;

interface IMobileSidebarProps {
  isVisible: boolean;
  closeSidebar: () => void;
  activeUsers: IUser[];
  currentRoom: string;
}

const MobileSidebar = ({
  closeSidebar,
  isVisible,
  activeUsers,
  currentRoom,
}: IMobileSidebarProps) => {
  return (
    <MobileSidebarWrapper isVisible={isVisible}>
      <Topbar>
        {currentRoom}{" "}
        <FontAwesomeIcon onClick={closeSidebar} icon={faTimes} color="white" />
      </Topbar>

      <Header>Active users</Header>

      <UserList isInSidebar users={activeUsers} />
    </MobileSidebarWrapper>
  );
};

export default MobileSidebar;
