import React, { createContext, useState, useContext } from "react";

const FileContext = createContext();

// Hook personalizado para acceder al contexto
export const useFile = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
  const [fileContent, setFileContent] = useState(""); // Contenido del archivo
  const [fileName, setFileName] = useState(""); // Nombre del archivo

  const updateFile = (content, name) => {
    setFileContent(content);
    setFileName(name);
  };

  return (
    <FileContext.Provider value={{ fileContent, fileName, updateFile }}>
      {children}
    </FileContext.Provider>
  );
};
