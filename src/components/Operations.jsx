import React, { useState } from "react";
import { processOperations } from "../utils/operationsHandler"; // Función que procesa las operaciones
import { useFile } from "../contexts/FileContext"; // Importa el contexto global

const OperationsApp = () => {
  const { fileContent } = useFile(); // Obtén el contenido del archivo desde el contexto
  const [results, setResults] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);

  const executeOperations = () => {
    console.log(fileContent);
    const { output, results } = processOperations(fileContent); // Llama la función para procesar el archivo
    setConsoleOutput(output); // Salida tipo consola
    setResults(results); // Resultados de las operaciones
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sección de Entrada */}
      <div style={{ flex: 1, padding: "20px", borderRight: "1px solid #ccc" }}>
        <button onClick={executeOperations}>Ejecutar</button>
        <textarea
          style={{ width: "100%", height: "calc(100% - 100px)", marginTop: "20px" }}
          value={fileContent}
          readOnly
        />
      </div>

      {/* Sección de Consola */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#000", color: "#0f0" }}>
        <h2>Consola</h2>
        <pre>{consoleOutput.join("\n")}</pre>
        <h3>Resultados</h3>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    </div>
  );
};

export default OperationsApp;
