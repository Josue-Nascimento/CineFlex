import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function EscolhaAssentos({setPedidoCompleto}) {
  const { idHorario } = useParams();
  const [horarios, setHorarios] = useState([]);
  const [FilmeEscolhido, setFilmeEscolhido] = useState({});
  const [HorarioEscolhido, setHorarioEscolhido] = useState([]);
  const [poltrona, setPoltrona] = useState([]);
  const [Dia, setDia] = useState([]);
  const [inputs, setInputs] = useState({});
  const [nomePoltrona, setNomePoltrona] = useState([]);
  console.log(poltrona);

const navigate = useNavigate()

  const HandleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  function SelecionarAssento(assentoID, assentoNome) {
    if(!poltrona.includes(assentoID) ){
      setPoltrona([...poltrona, assentoID]);
      setNomePoltrona([...nomePoltrona, assentoNome]);
    }else{
     const Remover =  poltrona.filter(a => a !== assentoID)
     setPoltrona(Remover)

     const RemoverNome =  nomePoltrona.filter(a => a !== assentoNome)
     setNomePoltrona(RemoverNome)
    }
    
  }

  function MandarDados(e) {
    e.preventDefault();
    const body = {
      ids: poltrona,
      name: inputs.name,
      cpf: inputs.cpf,
    };

    const pCompleto = {
        filme: FilmeEscolhido.title,
        data: Dia.weekday,
        hora: HorarioEscolhido.name,
        nomeComprador: inputs.name,
        CPF: inputs.cpf,
        assentos: nomePoltrona
      }
    

    if(poltrona.length !== 0 && inputs.name && inputs.cpf){
      const promisse = axios.post(
        "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",body);
        console.log(body)
    
  
      promisse.then((res) =>  {
        setPedidoCompleto(pCompleto)
        navigate("/pedidoConcluido")
      });
      promisse.catch((err) => console.log(err));
      
    }else{
      alert("Preencha seus dados e selecione um ou mais assentos!")
    }

   
  }

  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idHorario}/seats`
    );
    promisse.then((res) => {
      setHorarios(res.data.seats);
      setFilmeEscolhido(res.data.movie);
      setHorarioEscolhido(res.data);
      setDia(res.data.day);
    });
  }, []);

  return (
    <>
      <SelecionarAssentos>
        <h1>Selecione o(s) assento(s)</h1>
      </SelecionarAssentos>

      <Assentos>
        {horarios.map((h) => (
          <h3
            onClick={() => SelecionarAssento(h.id, h.name)}
            className={
              poltrona.includes(h.id) && h.isAvailable
                ? "green"
                : h.isAvailable
                ? "white"
                : "yellow"
            }
            key={h.id}
          >
            {h.name}
          </h3>
        ))}
      </Assentos>
      <Info>
        <div>
          <div className="green"></div>
          <p>Selecionado</p>
        </div>

        <div>
          <div className="white"></div>
          <p>Disponível</p>
        </div>

        <div>
          <div className="yellow"></div>
          <p>Indisponível</p>
        </div>
      </Info>

      <InformacoesComprador>
        <h2>Nome do comprador :</h2>
        <form onSubmit={MandarDados}>
          <input
            required
            type="text"
            name="name"
            placeholder="Digite seu nome..."
            onChange={HandleInputChange}
          ></input>

          <h2>CPF do comprador :</h2>

          <input
            required
            type="number"
            name="cpf"
            placeholder="Digite seu CPF..."
            onChange={HandleInputChange}
          ></input>
        <BotaoReservar>
          <button onClick={MandarDados}>Reservar assento(s)</button>
        </BotaoReservar>
        </form>
      </InformacoesComprador>
      <Escolhas>
        <img src={FilmeEscolhido.posterURL} />
        <Horarios>
          <p>{FilmeEscolhido.title}</p>
          <p>
            {Dia.weekday} - {HorarioEscolhido.name}
          </p>
        </Horarios>
      </Escolhas>
    </>
  );
}

const SelecionarAssentos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58px;
  h1 {
    font-size: 25px;
  }
`;
const Assentos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  h3 {
    margin: 6px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  }
  .green {
    width: 23px;
    height: 23px;
    background-color: #0e7d71;
    border-radius: 20px;
  }
  .white {
    width: 23px;
    height: 23px;
    background-color: #c3cfd9;
    border-radius: 20px;
  }

  .yellow {
    width: 23px;
    height: 23px;
    background-color: #fbe192;
    border-radius: 20px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-around;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 18px;
  }

  .green {
    width: 20px;
    height: 20px;
    background-color: #0e7d71;
    border-radius: 10px;
  }
  .white {
    width: 20px;
    height: 20px;
    background-color: #c3cfd9;
    border-radius: 10px;
  }

  .yellow {
    width: 20px;
    height: 20px;
    background-color: #fbe192;
    border-radius: 10px;
  }
`;

const InformacoesComprador = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  input {
    margin-left: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 300px;
    height: 30px;
  }

  h2 {
    margin-left: 1px;
    font-size: 20px;
  }
`;
const BotaoReservar = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 180px;
    height: 40px;
    font-size: 18px;
    background-color: #e8833a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: none;
  }
`;

const Escolhas = styled.div`
  height: 100px;
  background-color: #dfe6ed;
  display: flex;
  align-items: center;
  img {
    width: 48px;
    border: 8px solid white;
    border-radius: 3px;
  }
`;
const Horarios = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 20px;
    margin-top: 10px;
    margin-left: 10px;
  }
`;
