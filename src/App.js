import "./App.css";
import styled from "styled-components";
import FilmesRenderizados from "./componentes/filmes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EscolhaData from "./componentes/escolhadata";
import EscolhaAssentos from "./componentes/escolhaassento";
import PedidoConcluido from "./componentes/pedido";
import { useState } from "react";

function App() {
  const [pedidoCompleto, setPedidoCompleto] = useState({})

  return (
    <BrowserRouter>
      <Topo>
        <h1>CineFlex</h1>
      </Topo>
      <Routes>
        <Route path="/" element={<FilmesRenderizados />} />
        <Route path="/sectionFilmes/:idFilmes" element={<EscolhaData />} />
        <Route path="/sectionSeats/:idHorario" element={<EscolhaAssentos  setPedidoCompleto={setPedidoCompleto} />}/>
        <Route path="/pedidoConcluido" element={<PedidoConcluido pedidoCompleto={pedidoCompleto} />}/>
      </Routes>
    </BrowserRouter>
  );
}

const Topo = styled.div`
  height: 70px;
  background-color: #c3cfd9;
  color: #e8833a;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 40px;
  }
`;

const SecaoFilmes = styled.div``;

export default App;
