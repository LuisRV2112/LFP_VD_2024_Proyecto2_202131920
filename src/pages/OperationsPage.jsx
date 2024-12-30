import React from "react";
import OperationsApp from "../components/Operations";

const Home = () => {
  console.log("prueba")

  return (
    <div style={{ padding: "20px" }}>
        <h1>Operaciones</h1>
        <OperationsApp />
    </div>
  );
};

export default Home;
