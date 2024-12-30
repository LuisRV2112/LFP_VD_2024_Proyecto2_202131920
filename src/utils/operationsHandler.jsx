import {extractAnidado} from '../services/dotService';

export const processOperations = (fileContent) => {
    let output = [];
    let results = [];
  
    try {
      // Parsear las operaciones del archivo
      const operations = parseOperations(fileContent);
        console.log(operations)
      // Procesar cada operación
      operations.forEach((op, index) => {
        try {
          const result = executeOperation(op); // Calcula la operación
          results.push({ nombre: op.nombre, resultado: result });
          output.push(`Resultado ${op.nombre}: ${result}`);
        } catch (error) {
          output.push(`Error en ${op.nombre}: ${error.message}`);
        }
      });
    } catch (error) {
      output.push(`Error al procesar el archivo: ${error.message}`);
    }
  
    return { output, results };
  };
  
  
  // Función para parsear las operaciones
  const parseOperations = (content) => {
    const matches = content.match(/Operaciones\s*=\s*(\[.*\])/s);
    if (!matches) throw new Error("No se encontraron operaciones.");
    return Function(`"use strict"; return (${`[${extractAnidado(content.replace(/\s+/g, ' ').trim(), "Operaciones = [")}]`});`)();
  };
  
  // Función para ejecutar operaciones
  const executeOperation = (operation) => {
    switch (operation.operacion) {
      case "suma":
        return resolveValue(operation.valor1) + resolveValue(operation.valor2);
      case "resta":
        return resolveValue(operation.valor1) - resolveValue(operation.valor2);
      case "multiplicacion":
        return resolveValue(operation.valor1) * resolveValue(operation.valor2);
      case "division":
        return resolveValue(operation.valor1) / resolveValue(operation.valor2);
      case "potencia":
        return Math.pow(resolveValue(operation.valor1), resolveValue(operation.valor2));
      case "raiz":
        return Math.pow(resolveValue(operation.valor1), 1 / resolveValue(operation.valor2));
      case "seno":
        return Math.sin(toRadians(resolveValue(operation.valor1)));
      case "coseno":
        return Math.cos(toRadians(resolveValue(operation.valor1)));
      case "tangente":
        return Math.tan(toRadians(resolveValue(operation.valor1)));
      case "inverso":
        return 1 / resolveValue(operation.valor1);
      case "mod":
        return resolveValue(operation.valor1) % resolveValue(operation.valor2);
      default:
        throw new Error(`Operación desconocida: ${operation.operacion}`);
    }
  };
  
  // Resuelve valores que pueden ser números u operaciones anidadas
  const resolveValue = (value) => {
    if (Array.isArray(value)) {
      return executeOperation(value[0]);
    }
    return value;
  };
  
  // Convierte grados a radianes
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  