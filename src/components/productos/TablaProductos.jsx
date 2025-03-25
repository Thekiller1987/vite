import React from "react";
import { Button, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaProductos = ({ productos, openEditModal, openDeleteModal }) => {
  return (
    <div className="tabla-wrapper">
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                {producto.imagen && (
                  <Image src={producto.imagen} width="50" height="50" rounded />
                )}
              </td>
              <td>{producto.nombre}</td>
              <td>C${producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="btn-accion"
                  onClick={() => openEditModal(producto)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="btn-accion"
                  onClick={() => openDeleteModal(producto)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;
