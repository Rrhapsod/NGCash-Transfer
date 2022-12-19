import { Background, Container, Form } from "./styles";

import { FiUser, FiLock, FiArrowLeft } from "react-icons/fi";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    if (!username || !password) {
      return alert("Preencha todos os campos!");
    }

    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Usuário criado com sucesso!");
          return navigate("/");
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .catch((e) => {
        if (e) {
          const errorObject = JSON.parse(e.message);
          alert(errorObject.message);
        } else {
          alert("Um erro ocorreu!");
        }
      });
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>NGCash | Transfer</h1>
        <p>Aplicação para transferir dinheiro entre os usuários da NGCash</p>

        <h2>Crie sua conta</h2>
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

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">
          <FiArrowLeft size={20} />
          Voltar para o login
        </Link>
      </Form>
    </Container>
  );
}
