import styled from "styled-components";

export const Topbar = styled.div<{ backgroundColor?: string; color?: string }>`
  padding: 15px;
  font-size: 20px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "teal"};
  color: ${(props) => (props.color ? props.color : "whitesmoke")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
