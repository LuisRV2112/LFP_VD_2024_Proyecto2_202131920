export const TOKEN_TYPES = {
  KEYWORD: "KEYWORD",
  IDENTIFIER: "IDENTIFIER",
  NUMBER: "NUMBER",
  STRING: "STRING",
  SYMBOL: "SYMBOL",
  COMMENT: "COMMENT",
  ERROR: "ERROR",
};

const keywords = [
  "Operaciones", "ConfiguracionesLex", "ConfiguracionesParser",
  "imprimir", "conteo", "promedio", "max", "min",
  "generarReporte"
];

export function analyzeCode(input) {
  const tokens = [];
  const errors = [];
  let line = 1;
  let col = 1;
  let state = 0;
  let buffer = "";

  for (let i = 0; i <= input.length; i++) {
      const char = input[i] || "\0"; // Usar "\0" como marcador de fin de archivo
      switch (state) {
          case 0: // Estado inicial
              if (char.match(/[a-zA-Z_]/)) {
                  buffer += char;
                  state = 1; // IDENTIFIER o KEYWORD
              } else if (char.match(/[0-9]/)) {
                  buffer += char;
                  state = 2; // Número
              } else if (char === '"') {
                  buffer += char;
                  state = 3; // Cadena
              } else if (char === "/") {
                  buffer += char;
                  state = 4; // Comentario potencial
              } else if (char.match(/[:{},[\]]/)) {
                  tokens.push({ type: TOKEN_TYPES.SYMBOL, lexeme: char, line, col });
              } else if (char.match(/[\s]/)) {
                  if (char === "\n") {
                      line++;
                      col = 0;
                  }
              } else if (char === "\0") {
                  break; // Fin de archivo
              } else {
                  errors.push({ type: TOKEN_TYPES.ERROR, lexeme: char, line, col });
              }
              col++;
              break;

          case 1: // Identificador o Palabra Clave
              if (char.match(/[a-zA-Z0-9_]/)) {
                  buffer += char;
              } else {
                  if (keywords.includes(buffer)) {
                      tokens.push({ type: TOKEN_TYPES.KEYWORD, lexeme: buffer, line, col });
                  } else {
                      tokens.push({ type: TOKEN_TYPES.IDENTIFIER, lexeme: buffer, line, col });
                  }
                  buffer = "";
                  state = 0;
                  i--; // Reprocesar el carácter actual
              }
              break;

          case 2: // Número
              if (char.match(/[0-9.]/)) {
                  buffer += char;
              } else {
                  tokens.push({ type: TOKEN_TYPES.NUMBER, lexeme: buffer, line, col });
                  buffer = "";
                  state = 0;
                  i--; // Reprocesar el carácter actual
              }
              break;

          case 3: // Cadena
              buffer += char;
              if (char === '"') {
                  tokens.push({ type: TOKEN_TYPES.STRING, lexeme: buffer, line, col });
                  buffer = "";
                  state = 0;
              }
              break;

          case 4: // Comentario
              if (char === "/") {
                  buffer += char;
                  state = 5; // Comentario simple
              } else if (char === "*") {
                  buffer += char;
                  state = 6; // Comentario de múltiples líneas
              } else {
                  errors.push({ type: TOKEN_TYPES.ERROR, lexeme: buffer, line, col });
                  buffer = "";
                  state = 0;
              }
              break;

          case 5: // Comentario Simple
              buffer += char;
              if (char === "\n" || char === "\0") {
                  tokens.push({ type: TOKEN_TYPES.COMMENT, lexeme: buffer, line, col });
                  buffer = "";
                  state = 0;
              }
              break;

          case 6: // Comentario de Múltiples Líneas
              buffer += char;
              if (buffer.endsWith("*/")) {
                  tokens.push({ type: TOKEN_TYPES.COMMENT, lexeme: buffer, line, col });
                  buffer = "";
                  state = 0;
              } else if (char === "\0") {
                  errors.push({ type: TOKEN_TYPES.ERROR, lexeme: buffer, line, col });
              }
              break;

          default:
              errors.push({ type: TOKEN_TYPES.ERROR, lexeme: char, line, col });
              state = 0;
              break;
      }
  }

  return { tokens, errors };
}

/* 
export const TOKEN_TYPES = {
    KEYWORD: "KEYWORD",
    IDENTIFIER: "IDENTIFIER",
    NUMBER: "NUMBER",
    STRING: "STRING",
    SYMBOL: "SYMBOL",
    COMMENT: "COMMENT",
    ERROR: "ERROR",
  };
  
  const keywords = [
    "Operaciones", 
    "ConfiguracionesLex", 
    "ConfiguracionesParser",
    "imprimir", "conteo", "promedio", "max", "min", "generarReporte"
  ];
  
  export function analyzeCode(input) {
    const tokens = [];
    const errors = [];
    let line = 1;
    let col = 1;
    let state = 0;
    let buffer = "";
  
    for (let i = 0; i <= input.length; i++) {
      const char = input[i] || "\0"; // Use "\0" as end-of-file marker
  
      switch (state) {
        case 0: // Initial state
          if (char.match(/[a-zA-Z_]/)) {
            buffer += char;
            state = 1; // Transition to IDENTIFIER/KEYWORD state
          } else if (char.match(/[0-9]/)) {
            buffer += char;
            state = 2; // Transition to NUMBER state
          } else if (char === '"') {
            buffer += char;
            state = 3; // Transition to STRING state
          } else if (char === "/") {
            buffer += char;
            state = 4; // Potential COMMENT state
          } else if (char.match(/[\s]/)) {
            if (char === "\n") {
              line++;
              col = 0;
            }
          } else if (char.match(/[:{},[\]]/)) {
            tokens.push({ type: TOKEN_TYPES.SYMBOL, lexeme: char, line, col });
          } else if (char === "\0") {
            // End of file
            break;
          } else {
            errors.push({ type: TOKEN_TYPES.ERROR, lexeme: char, line, col });
          }
          col++;
          break;
  
        case 1: // Identifier or Keyword
          if (char.match(/[a-zA-Z0-9_]/)) {
            buffer += char;
          } else {
            if (keywords.includes(buffer)) {
              tokens.push({ type: TOKEN_TYPES.KEYWORD, lexeme: buffer, line, col });
            } else {
              tokens.push({ type: TOKEN_TYPES.IDENTIFIER, lexeme: buffer, line, col });
            }
            buffer = "";
            state = 0; // Return to initial state
            i--; // Reevaluate current character
          }
          break;
  
        case 2: // Number
          if (char.match(/[0-9.]/)) {
            buffer += char;
          } else {
            tokens.push({ type: TOKEN_TYPES.NUMBER, lexeme: buffer, line, col });
            buffer = "";
            state = 0; // Return to initial state
            i--; // Reevaluate current character
          }
          break;
  
        case 3: // String
          buffer += char;
          if (char === '"') {
            tokens.push({ type: TOKEN_TYPES.STRING, lexeme: buffer, line, col });
            buffer = "";
            state = 0; // Return to initial state
          }
          break;
  
        case 4: // Comment
          if (char === "/") {
            buffer += char;
            state = 5; // Single-line comment
          } else if (char === "*") {
            buffer += char;
            state = 6; // Multi-line comment
          } else {
            errors.push({ type: TOKEN_TYPES.ERROR, lexeme: buffer, line, col });
            buffer = "";
            state = 0; // Return to initial state
          }
          break;
  
        case 5: // Single-line comment
          buffer += char;
          if (char === "\n" || char === "\0") {
            tokens.push({ type: TOKEN_TYPES.COMMENT, lexeme: buffer, line, col });
            buffer = "";
            state = 0; // Return to initial state
          }
          break;
  
        case 6: // Multi-line comment
          buffer += char;
          if (buffer.endsWith("")) {
            tokens.push({ type: TOKEN_TYPES.COMMENT, lexeme: buffer, line, col });
            buffer = "";
            state = 0; // Return to initial state
          } else if (char === "\0") {
            errors.push({ type: TOKEN_TYPES.ERROR, lexeme: buffer, line, col });
          }
          break;
  
        default:
          errors.push({ type: TOKEN_TYPES.ERROR, lexeme: char, line, col });
          state = 0; // Return to initial state
          break;
      }
    }
  
    return { tokens, errors };
  }
   */