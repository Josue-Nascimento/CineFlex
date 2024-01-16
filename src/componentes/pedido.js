import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";

export default function PedidoConcluido( pedidoCompleto ) {
  const { filme, data, hora, nomeComprador, CPF, assentos } = pedidoCompleto.pedidoCompleto;
console.log(assentos)
console.log(pedidoCompleto)

  return (
    <>
      <TextoPedido>Pedido feito com sucesso!</TextoPedido>
      <InfoPedidos>
        <h2>Filme e sessão</h2>
        <p>{filme}</p>
        <p>{data} {hora}</p>

        <h2>Ingresos</h2>
        {assentos.map(a => (
            <p>Assento {a}</p>
        ))}
        
        <h2>Comprador</h2>
        <p>Nome: {nomeComprador}</p>
        <p>CPF: {CPF} </p>
      </InfoPedidos>
      <BotaoHome>
        <Link to="/">
          <button>Voltar para home</button>
        </Link>
      </BotaoHome>
    </>
  );
}

const TextoPedido = styled.h1`
  height: 50px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #247a6b;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoPedidos = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;

  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 40px;
  }

  p {
    color: #4e5a65;
    font-size: 18px;
    margin-top: 5px;
  }
`;
const BotaoHome = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  button {
    width: 200px;
    height: 40px;
    font-size: 18px;
    color: wheat;
    border-radius: 8px;
    border: none;
    background-color: #e8833a;
  }
`;
