import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

export const GET_CLIENTE = gql`
  {
    cliente {
      nome
      celular
    }
  }
`;

const Cliente = () => {
  const { data, error, loading } = useQuery(GET_CLIENTE);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <ul>
      {data.cliente.map(dog => (
        <li key={dog.id}>{dog.breed}</li>
      ))}
    </ul>
  );
};

export default Cliente;
