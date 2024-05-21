import React from 'react';
import {useParams} from "react-router-dom";

const PaginaClub = () => {
  const { clubId } = useParams();
  return (
    <div>
      <h1>questa è la pagina di questo club</h1>
      <h1>{clubId}</h1>
    </div>
  );
}

export default PaginaClub;
