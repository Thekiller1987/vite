import { useNavigate } from "react-router-dom";
import "../App.css";

const Inicio = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="inicio-container">
      <div className="contenido-inicio">
        <h1 className="titulo-inicio">Inicio</h1>
        <div className="botones-inicio">
          <button className="btn-menu" onClick={() => handleNavigate("/categorias")}>
            Ir a Categorías
          </button>
          <button className="btn-menu" onClick={() => handleNavigate("/productos")}>
            Ir a Productos
          </button>
          <button className="btn-menu" onClick={() => handleNavigate("/catalogo")}>
            Ver Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
