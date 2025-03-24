import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  // Función de navegación
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <br />
      <br />
      <h1>Inicio</h1>
      <button onClick={() => handleNavigate("/categorias")} >Ir a Categorias</button>
      <button onClick={() => handleNavigate("/Productos")} >Ir a Productos</button>
      <button onClick={() => handleNavigate("/Catalogo")} >Ver Catalogo</button>


    </div>
  )
}

export default Inicio;
