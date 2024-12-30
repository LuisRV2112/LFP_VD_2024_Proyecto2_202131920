import { TOKEN_TYPES } from "./lexerUtils";

export class Parser {
    constructor(tokens) {
        this.tokens = tokens; // Entrada de tokens
        this.currentIndex = 0; // Índice actual del token
        this.errors = []; // Lista de errores encontrados
    }

    currentToken() {
        return this.tokens[this.currentIndex] || null;
    }

    nextToken() {
        this.currentIndex++;
    }

    match(type) {
        const token = this.currentToken();
        if (token && token.type === type) {
            this.nextToken();
            return token;
        }
        this.addError(`Se esperaba '${type}', pero se encontró '${token?.type || "EOF"}'`);
        return null;
    }

    addError(message) {
        const token = this.currentToken();
        const errorInfo = token
            ? `Error en línea ${token.line}, columna ${token.col}: ${message}`
            : `Error: ${message}`;
        this.errors.push(errorInfo);
    }

    parseProgram() {
        const program = { type: "Program", children: [] };
        program.children.push(this.parseOperaciones());
        program.children.push(this.parseConfiguraciones("ConfiguracionesLex"));
        program.children.push(this.parseConfiguraciones("ConfiguracionesParser"));
        program.children.push(this.parseInstrucciones());
        return program;
    }

    parseOperaciones() {
        const operaciones = [];
        if (this.match(TOKEN_TYPES.KEYWORD)?.lexeme === "Operaciones") {
            this.match(TOKEN_TYPES.SYMBOL); // "="
            this.match(TOKEN_TYPES.SYMBOL); // "["
            while (this.currentToken()?.lexeme === "{") {
                operaciones.push(this.parseOperacion());
            }
            this.match(TOKEN_TYPES.SYMBOL); // "]"
        }
        return { type: "Operaciones", children: operaciones };
    }
    
    parseListaOperaciones() {
        this.match(TOKEN_TYPES.SYMBOL); // "["
        const lista = [];
        while (this.currentToken()?.lexeme === "{" || this.currentToken()?.lexeme === "[") {
            lista.push(
                this.currentToken()?.lexeme === "{"
                    ? this.parseOperacion()
                    : this.parseListaOperaciones()
            );
        }
        this.match(TOKEN_TYPES.SYMBOL); // "]"
        return lista;
    }
    

    parseOperacion() {
        const operacion = {};
        this.match(TOKEN_TYPES.SYMBOL); // "{"
        do {
            const key = this.match(TOKEN_TYPES.IDENTIFIER)?.lexeme;
            this.match(TOKEN_TYPES.SYMBOL); // ":"
            let value;
            if (this.currentToken()?.lexeme === "[") {
                value = this.parseListaOperaciones();
            } else if (this.currentToken()?.lexeme === "{") {
                value = this.parseOperacion();
            } else {
                value =
                    this.match(TOKEN_TYPES.NUMBER)?.lexeme ||
                    this.match(TOKEN_TYPES.STRING)?.lexeme;
            }
            if (key) operacion[key] = value;
        } while (this.currentToken()?.lexeme === "," && this.nextToken());
        this.match(TOKEN_TYPES.SYMBOL); // "}"
        return { type: "Operacion", details: operacion };
    }
    
    /* parseOperacion() {
        const operacion = {};
        this.match(TOKEN_TYPES.SYMBOL); // "{"
        do {
            const key = this.match(TOKEN_TYPES.IDENTIFIER)?.lexeme;
            this.match(TOKEN_TYPES.SYMBOL); // ":"
            const value = this.currentToken()?.lexeme === "["
                ? this.parseListaOperaciones()
                : this.match(TOKEN_TYPES.NUMBER)?.lexeme || this.match(TOKEN_TYPES.STRING)?.lexeme;
            if (key) operacion[key] = value;
        } while (this.currentToken()?.lexeme === "," && this.nextToken());
        this.match(TOKEN_TYPES.SYMBOL); // "}"
        return { type: "Operacion", details: operacion };
    } */
/* 
    parseListaOperaciones() {
        this.match(TOKEN_TYPES.SYMBOL); // "["
        const lista = [];
        while (this.currentToken()?.lexeme === "{") {
            lista.push(this.parseOperacion());
        }
        this.match(TOKEN_TYPES.SYMBOL); // "]"
        return lista;
    }
 */
    parseConfiguraciones(section) {
        const configuraciones = [];
        if (this.match(TOKEN_TYPES.KEYWORD)?.lexeme === section) {
            this.match(TOKEN_TYPES.SYMBOL); // "="
            this.match(TOKEN_TYPES.SYMBOL); // "["
            while (this.currentToken()?.type === TOKEN_TYPES.IDENTIFIER) {
                const key = this.match(TOKEN_TYPES.IDENTIFIER)?.lexeme;
                this.match(TOKEN_TYPES.SYMBOL); // ":"
                const value = this.match(TOKEN_TYPES.STRING)?.lexeme;
                if (key && value) configuraciones.push({ key, value });
            }
            this.match(TOKEN_TYPES.SYMBOL); // "]"
        }
        return { type: section, children: configuraciones };
    }

    parseInstrucciones() {
        const instrucciones = [];
        while (this.currentToken()?.type === TOKEN_TYPES.KEYWORD) {
            instrucciones.push(this.parseInstruccion());
        }
        return { type: "Instrucciones", children: instrucciones };
    }

    parseInstruccion() {
        const name = this.match(TOKEN_TYPES.KEYWORD)?.lexeme;
        const params = [];
        if (this.currentToken()?.lexeme === "(") {
            this.match(TOKEN_TYPES.SYMBOL); // "("
            while (this.currentToken()?.lexeme !== ")") {
                const param = this.match(TOKEN_TYPES.STRING)?.lexeme;
                if (param) params.push(param);
                if (this.currentToken()?.lexeme === ",") this.nextToken();
            }
            this.match(TOKEN_TYPES.SYMBOL); // ")"
        }
        return { type: "Instruccion", name, params };
    }
}
