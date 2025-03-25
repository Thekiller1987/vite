import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const VistaProducto = ({ productos }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const producto = productos.find((p) => p.id === id);

  if (!producto) return <p className="text-white">Producto no encontrado</p>;

  return (
    <div className="vista-producto fade-in">
      <button className="btn-formulario btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Volver
      </button>

      <div className="producto-detalle">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="img-detalle"
          style={{ maxWidth: "300px", borderRadius: "12px", marginBottom: "20px" }}
        />
        <div className="detalle-info">
          <h2>{producto.nombre}</h2>
          <p><strong>Precio:</strong> C${producto.precio}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
        </div>
      </div>
    </div>
  );
};

export default VistaProducto;
