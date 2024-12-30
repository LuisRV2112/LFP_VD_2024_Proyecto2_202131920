import React from "react";
import GraphvizViewer from "../components/GraphvizViewer";
import {generarEstructura} from "../services/dotService"
import { useFile } from "../contexts/FileContext";

const Home = () => {
  console.log("prueba")
  const {fileContent} = useFile()
  const elements = generarEstructura(fileContent)
  return (
    <div style={{ padding: "20px" }}>
        <h1>Arbol de Derivaciones</h1>
        <GraphvizViewer elements={elements}/>
    </div>
  );
};

export default Home;