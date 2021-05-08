import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import styled from "styled-components";

import { PageWrapper } from "../../components/PageWrapper";
import { Card } from "../../components/Card";

const LoginForm = styled.form`
  margin-top: 30px;
  display: grid;
  grid-gap: 20px;
  width: 60%;
`;

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    history.push(`/chat?room=${room}&name=${name}`);
  };

  return (
    <PageWrapper>
      <Card elevation={2}>
        <h1>Blabber</h1>
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Room"
            required
            value={room}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRoom(e.target.value)
            }
          />

          <Button type="submit">Join</Button>
        </LoginForm>
      </Card>
    </PageWrapper>
  );
};

export default Home;
