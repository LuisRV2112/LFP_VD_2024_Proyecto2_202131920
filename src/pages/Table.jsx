import React from "react";
import TableTokensWithHTML from "../components/TableTokens";

const Home = () => {
  console.log("prueba")

  return (
    <div style={{ padding: "20px" }}>
        <h1>Reporte de Tokens y Errores</h1>
        <TableTokensWithHTML />
    </div>
  );
};

export default Home;
