import { FiUser, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

import { Background, Container, Form } from "./styles";

import { useAuth } from "../../hooks/auth";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  function handleSignIn() {
    signIn({ username, password });
  }

  return (
    <Container>
      <Form>
        <h1>NGCash | Transfer</h1>
        <p>Aplicação para transferir dinheiro entre os usuários da NGCash</p>

        <h2>Faça seu login</h2>
        <Input
          icon={FiUser}
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          icon={FiLock}
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Entrar" onClick={handleSignIn} />

        <Link to="/signup">Criar conta</Link>
      </Form>
      <Background />
    </Container>
  );
}
