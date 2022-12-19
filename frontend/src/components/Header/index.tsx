import { useEffect, useState } from "react";

import { Container, Profile, Name, SignOut } from "./styles";

import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

export function Header() {
  const { signOut, user } = useAuth();

  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      const response = await api.get(`/accounts/${user?.id}`);
      setBalance(response.data.balance);
    }

    fetchBalance();
  }, [balance]);

  return (
    <Container>
      <Profile>
        <div>
          <Name>Olá, {user?.username}</Name>
          <SignOut onClick={signOut}>sair</SignOut>
        </div>
      </Profile>
      <h3>Seu saldo é: R$ {balance}</h3>
      <h2>NGCash | Transfer</h2>
    </Container>
  );
}
