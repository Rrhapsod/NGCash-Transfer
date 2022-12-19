import { useEffect, useState } from "react";
import { FiDollarSign, FiUser } from "react-icons/fi";

import { Container, Title, TransactionList } from "./styles";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Transaction } from "../../components/Transaction";

import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

export function Home() {
  const { user } = useAuth();

  const [creditUsername, setCreditUsername] = useState("");
  const [balance, setBalance] = useState("");

  const [dTransactions, setDTransactions] = useState([]);
  const [cTransactions, setCTransactions] = useState([]);

  async function handleTransaction() {
    if (!creditUsername || !balance) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    let debitAccountId = user?.id;
    let creditAccountId = 0;
    let yourBalance = 0;

    try {
      const response = await api.get(`/users/${creditUsername}`);
      creditAccountId = response.data;
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
        return;
      } else {
        alert("Não foi possível buscar o usuário");
        return;
      }
    }

    if (String(creditAccountId) == debitAccountId) {
      alert("Você não pode enviar dinheiro para si mesmo");
      return;
    }

    try {
      const resp = await api.get(`/accounts/${debitAccountId}`);
      yourBalance = Number(resp.data.balance);
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
        return;
      } else {
        alert("Não foi possível consultar seu saldo");
        return;
      }
    }

    if (yourBalance < Number(balance)) {
      alert("Você não tem saldo suficiente");
      return;
    }

    const value = balance.split(",").join(".");

    try {
      await api.post(
        `/transactions/${debitAccountId}/${String(creditAccountId)}`,
        {
          value: Number(value),
        }
      );

      alert("Transação realizada com sucesso");
      window.location.reload();
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
        return;
      } else {
        alert("Não foi possível realizar a transação");
        return;
      }
    }
  }

  useEffect(() => {
    async function fetchTransactions() {
      const response = await api.get(`/transactions/${user?.id}`);
      setDTransactions(response.data.debitTransactions);
      setCTransactions(response.data.creditTransactions);
    }

    fetchTransactions();
  }, []);

  return (
    <Container>
      <Header key={63} />
      <Title>
        <div>
          <Input
            icon={FiUser}
            placeholder="Usuário recebedor"
            type="text"
            onChange={(e) => setCreditUsername(e.target.value)}
          />
          <Input
            icon={FiDollarSign}
            placeholder="Valor da transação"
            type="text"
            onChange={(e) => setBalance(e.target.value)}
          />
          <Button title="Transferir" onClick={handleTransaction} />
        </div>
      </Title>
      <TransactionList>
        <div>
          <h1>Débitos</h1>
          {dTransactions.map((transaction) => (
            <Transaction key={String(transaction.id)} data={transaction} />
          ))}
        </div>
        <div>
          <h1>Créditos</h1>
          {cTransactions.map((transaction) => (
            <Transaction key={String(transaction.id)} data={transaction} />
          ))}
        </div>
      </TransactionList>
    </Container>
  );
}
