import { Component } from "react";
import { Container, Info } from "./styles";

interface Data {
  data: TransactionTypes;
}

interface TransactionTypes {
  id: string;
  value: string;
  createdAt: string;
}

export function Transaction({ data, ...rest }: Data) {
  const d = new Date(data.createdAt);
  const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

  return (
    <Container {...rest}>
      <Info>
        <h1>Transação nº{data.id}</h1>
        <span>Valor: R${data.value}</span>
      </Info>
      <p>Data:</p>
      <footer>{date}</footer>
    </Container>
  );
}
