import React, { useEffect, useState } from "react";
import { useFile } from "../contexts/FileContext"; // Importa el contexto global
import { analyzeCode } from "../utils/lexerUtils";

const Lexer = () => {
  const { fileContent } = useFile(); // Obtén el contenido del archivo desde el contexto
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState([]);
  const [errors, setErrors] = useState([]);
  const [hasEdited, setHasEdited] = useState(false); // Indica si el usuario ha editado

  // Sincroniza el contenido del archivo con el textarea solo si no ha sido editado
  useEffect(() => {
    if (!hasEdited && fileContent !== input) {
      setInput(fileContent);
    }
  }, [fileContent, input, hasEdited]);//Cambios de estado a detectar

  const handleAnalyze = () => {
    const result = analyzeCode(input);
    setTokens(result.tokens);
    setErrors(result.errors);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setHasEdited(true); // Indica que el usuario ha modificado el contenido
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
      <button onClick={handleAnalyze}>Analizar</button>
      <h3>Tokens</h3>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Lexema</th>
            <th>Línea</th>
            <th>Columna</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td>{token.type}</td>
              <td>{token.lexeme}</td>
              <td>{token.line}</td>
              <td>{token.col}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Errores</h3>
      <table>
        <thead>
          <tr>
            <th>Lexema</th>
            <th>Línea</th>
            <th>Columna</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error, index) => (
            <tr key={index}>
              <td>{error.lexeme}</td>
              <td>{error.line}</td>
              <td>{error.col}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lexer;
