import React from "react";
import { Link } from "react-router-dom";
import { useFile } from "../contexts/FileContext"; // Importa el contexto

const Header = () => {
  const { fileContent, fileName, updateFile } = useFile();

  const handleOpenFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".nlex";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          updateFile(e.target.result, file.name);
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  const handleSaveFile = () => {
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "archivo.nlex";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAsFile = () => {
    const newName = prompt("Nombre del archivo:", fileName || "archivo.txt");
    if (newName) {
      const blob = new Blob([fileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = newName;
      link.click();
      URL.revokeObjectURL(url);
      updateFile(fileContent, newName); // Actualiza el nombre en el estado global
    }
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/analyze">Analizador Sintactico</Link></li>
          <li><Link to="/report">Grafica Arbol</Link></li>
          <li><Link to="/operations">Operaciones</Link></li>
          <li><Link to="/table">Tabla</Link></li>

        </ul>
        <div className="file-menu">
          <button className="file-button">Archivo</button>
          <div className="file-dropdown">
            <button onClick={handleOpenFile}>Abrir</button>
            <button onClick={handleSaveFile}>Guardar</button>
            <button onClick={handleSaveAsFile}>Guardar Como</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
