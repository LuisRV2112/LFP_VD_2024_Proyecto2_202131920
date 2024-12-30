import React, { useContext } from "react";
import Lexer from "../components/Lexer";

const Home = () => {
  console.log("prueba")

  return (
    <div style={{ padding: "20px" }}>
        <h1>Analizador Léxico</h1>
        <Lexer />
    </div>
  );
};

export default Home;
