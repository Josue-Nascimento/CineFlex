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
    <Container>
        <h2>Selecione o fime</h2>
      <Filmes>
        {filmes.map((item) => (
          <Link key={item.id} to={`/sectionFilmes/${item.id}`}>
            <img src={item.posterURL} />
          </Link>
        ))}
      </Filmes>
      </Container>
    </>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
h2{
  margin-top: 20px;
  height: 40px;
    font-size: 25px;
}
`

const Filmes = styled.ul`
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: center;
  img {
    width: 100px;
    margin: 10px;
  }
`;
