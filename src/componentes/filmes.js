import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function FilmesRenderizados() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const promessa = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    promessa.then((res) => {
      setFilmes(res.data);
    });
  }, []);

  return (
    <>
      <Filmes>
        <h2>Selecione o fime</h2>
        {filmes.map((item) => (
          <Link key={item.id} to={`/sectionFilmes/${item.id}`}>
            <img src={item.posterURL} />
          </Link>
        ))}
      </Filmes>
    </>
  );
}

const Filmes = styled.ul`
  h2 {
    height: 40px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 100px;
    margin: 10px;
  }
`;
