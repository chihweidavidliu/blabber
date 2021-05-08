import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { IUser } from "../../types/user";

const UserListWrapper = styled.div`
  padding: 15px;
  display: grid;
  grid-gap: 10px;
  overflow-y: auto;
`;

const UserListItem = styled.div<{ isInSidebar?: boolean }>`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 10px;
  color: ${(props) => (props.isInSidebar ? "white" : "#3f3f3f")};
`;

interface IUserListProps {
  users: IUser[];
  isInSidebar?: boolean;
}

const UserList = ({ users, isInSidebar }: IUserListProps) => {
  return (
    <UserListWrapper>
      {users.map((user) => {
        return (
          <UserListItem key={user.id} isInSidebar={isInSidebar}>
            <FontAwesomeIcon
              icon={faUser}
              color={isInSidebar ? "white" : "teal"}
            />
            <div>{user.name}</div>
          </UserListItem>
        );
      })}
    </UserListWrapper>
  );
};

export default UserList;
