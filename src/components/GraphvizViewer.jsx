import { useEffect, useState } from "react";
import Cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

Cytoscape.use(dagre);

const GraphvizViewer = ({ elements }) => {
  const [cy, setCy] = useState(null);
  const [nodeShape, setNodeShape] = useState("ellipse"); // Forma por defecto
  const [nodeColor, setNodeColor] = useState("#0074D9");
  const [edgeColor, setEdgeColor] = useState("#333");
  const [layout, setLayout] = useState("dagre");

  useEffect(() => {
    const cyInstance = Cytoscape({
      container: document.getElementById("graph"),
      elements,
      style: [
        {
          selector: "node",
          style: {
            "background-color": nodeColor,
            label: "data(label)",
            shape: nodeShape,
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": edgeColor,
            "target-arrow-color": edgeColor,
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
      layout: { name: layout },
    });

    setCy(cyInstance);

    return () => cyInstance.destroy();
  }, [elements, nodeShape, nodeColor, edgeColor, layout]);

  const downloadImage = () => {
    if (cy) {
      const pngData = cy.png({ full: true, scale: 2 });
      const link = document.createElement("a");
      link.href = pngData;
      link.download = "graph.png";
      link.click();
    }
  };

  return (
    <div className="graphviz-viewer">
      <div className="controls">
        <label htmlFor="nodeShape">Forma de los nodos:</label>
        <select
          id="nodeShape"
          value={nodeShape}
          onChange={(e) => setNodeShape(e.target.value)}
        >
          <option value="ellipse">Círculo</option>
          <option value="triangle">Triángulo</option>
          <option value="diamond">Rombo</option>
          <option value="rectangle">Rectángulo</option>
          <option value="hexagon">Hexágono</option>
        </select>

        <label htmlFor="nodeColor">Color de los nodos:</label>
        <input
          id="nodeColor"
          type="color"
          value={nodeColor}
          onChange={(e) => setNodeColor(e.target.value)}
        />

        <label htmlFor="edgeColor">Color de las aristas:</label>
        <input
          id="edgeColor"
          type="color"
          value={edgeColor}
          onChange={(e) => setEdgeColor(e.target.value)}
        />

        <label htmlFor="layout">Distribución:</label>
        <select
          id="layout"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
        >
          <option value="dagre">Dagre</option>
          <option value="grid">Grid</option>
          <option value="circle">Círculo</option>
          <option value="breadthfirst">Breadthfirst</option>
        </select>

        <button onClick={downloadImage}>Descargar imagen</button>
      </div>

      <div
        id="graph"
        style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
      ></div>
    </div>
  );
};

export default GraphvizViewer;

/* import { useEffect, useState } from "react";
import { graphviz } from "d3-graphviz";

const GraphvizViewer = ({ dotString }) => {
  const [nodeShape, setNodeShape] = useState("circle"); // Forma por defecto

  useEffect(() => {
    if (dotString) {
      console.log("Rendering DOT string:", dotString);
      try {
        const shapedDotString = dotString.replace(
          /node \[shape=\w+\]/g,
          `node [shape=${nodeShape}]`
        );

        // Renderizar el gráfico dentro del div con id "graph"
        graphviz("#graph")
          .renderDot(shapedDotString)
          .zoom(true); // Activa el zoom por si el gráfico es muy grande
      } catch (error) {
        console.error("Error al renderizar el DOT:", error);
      }
    } else {
      console.error("DOT string vacío o inválido.");
    }
  }, [dotString, nodeShape]);

  const downloadImage = () => {
    const svgElement = document.querySelector("#graph svg");
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "graphviz-graph.svg";
      downloadLink.click();

      URL.revokeObjectURL(url);
    } else {
      console.error("No se encontró el elemento SVG para descargar.");
    }
  };

  return (
    <div className="graphviz-viewer">
      <div className="controls">
        <label htmlFor="nodeShape">Forma de los nodos:</label>
        <select
          id="nodeShape"
          value={nodeShape}
          onChange={(e) => setNodeShape(e.target.value)}
        >
          <option value="circle">Círculo</option>
          <option value="triangle">Triángulo</option>
          <option value="diamond">Rombo</option>
          <option value="box">Caja</option>
          <option value="ellipse">Elipse</option>
          <option value="plaintext">Texto plano</option>
        </select>
        <button onClick={downloadImage}>Descargar imagen</button>
      </div>

      <div id="graph" className="graph-container"></div>
    </div>
  );
};

export default GraphvizViewer; */

/* import { useEffect } from "react";
import { graphviz } from "d3-graphviz";

const GraphvizViewer = ({ dotString }) => {
  useEffect(() => {
    if (dotString) {
      console.log("Rendering DOT string:", dotString);
      try {
        // Renderizar el gráfico dentro del div con id "graph"
        graphviz("#graph")
          .renderDot(dotString)
          .zoom(true); // Activa el zoom por si el gráfico es muy grande
      } catch (error) {
        console.error("Error al renderizar el DOT:", error);
      }
    } else {
      console.error("DOT string vacío o inválido.");
    }
  }, [dotString]);

  return <div id="graph" className="graph-container"></div>;
};

export default GraphvizViewer;
 */