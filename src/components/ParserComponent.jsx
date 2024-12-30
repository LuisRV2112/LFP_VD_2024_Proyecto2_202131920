import React, { useState, useEffect } from "react";
import { analyzeCode } from "../utils/lexerUtils";
import { Parser } from "../utils/parserUtils";
import { useFile } from "../contexts/FileContext"; // Importa el contexto global

const ParserComponent = () => {
  const [input, setInput] = useState("");
  const [parseTree, setParseTree] = useState(null);
  const [errors, setErrors] = useState([]);
  const { fileContent } = useFile(); // Obtén el contenido del archivo desde el contexto
  const [hasEdited, setHasEdited] = useState(false); // Indica si el usuario ha editado


  const handleAnalyze = () => {
    const { tokens } = analyzeCode(input); // Analiza el código léxicamente
    const parser = new Parser(tokens); // Pasa los tokens al parser
    const tree = parser.parseProgram(); // Obtiene el árbol sintáctico
    setParseTree(tree);
    setErrors(parser.errors); // Registra errores sintácticos si los hay
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setHasEdited(true); // Indica que el usuario ha modificado el contenido
  };

  useEffect(() => {
    if (!hasEdited && fileContent !== input) {
      setInput(fileContent);
    }
  }, [fileContent, input, hasEdited]);

  // Función para renderizar el árbol sintáctico
  const renderTree = (node, level = 0) => {
    if (!node) return null;

    return (
      <div style={{ marginLeft: `${level * 20}px` }}>
        <strong>{node.type}</strong>
        {node.children &&
          node.children.map((child, index) => (
            <div key={index}>{renderTree(child, level + 1)}</div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <textarea
        rows="10"
        cols="50"
        placeholder="Escribe o pega el código aquí..."
        value={input}
        onChange={handleInputChange}
      ></textarea>
      <button onClick={handleAnalyze}>Analizar Sintáctico</button>

      <h3>Árbol Sintáctico</h3>
      <div style={{ border: "1px solid #ccc", padding: "10px", maxHeight: "300px", overflow: "auto" }}>
        {parseTree ? renderTree(parseTree) : <p>No se ha generado el árbol.</p>}
      </div>

      <h3>Errores Sintácticos</h3>
      <table>
        <thead>
          <tr>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {errors.length > 0 ? (
            errors.map((error, index) => (
              <tr key={index}>
                <td>{error}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No se encontraron errores.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParserComponent;
