import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function EscolhaData() {
  const { idFilmes } = useParams();
  const [filmeEscolhido, setFilmeEscolhido] = useState([]);
  const [filmeClicado, setFilmeClicado] = useState({})
  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilmes}/showtimes`
    );

    promisse
      .then((res) => {
        setFilmeEscolhido(res.data.days);
        setFilmeClicado(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ContainerHorarios>
        <h1>Selecione o horário</h1>
        {filmeEscolhido.map((f) => (
          <Data key={f.id}>
            <h2>
              {f.weekday} - {f.date}
            </h2>
            <Horarios>
              {f.showtimes.map((h) => (
                <Link key={h.id} to={`/sectionSeats/${h.id}`}>
                <h3>{h.name}</h3>
                </Link>
              ))}
            </Horarios>
  
          </Data>
        ))}
        <FilmeEscolhido>
          <img src={filmeClicado.posterURL}/>
          <h2>{filmeClicado.title}</h2>
        </FilmeEscolhido>

      </ContainerHorarios>
    </>
  );
}

const ContainerHorarios = styled.div`
  h1 {
    font-size: 25px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

const Data = styled.div`
  h2 {
    margin: 20px;
    font-size: 20px;
  }

`;

const Horarios = styled.div`
  display: flex;
  h3 {
    background-color: #e8833a;
    color: black;
    width: 60px;
    height: 40px;
    margin-left: 30px;
    border-radius: 4px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FilmeEscolhido = styled.div`
margin-top: 20px;
display:flex ;
align-items: center;
background-color: #DFE6ED;
padding: 10px;
img{
  width: 48px;
  border: 8px solid white ;
  border-radius: 3px;
}
h2{
  font-size: 20px;
  margin-left: 15px;
}
`;
