import React from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaCategorias = ({ categorias, openEditModal, openDeleteModal }) => {
  return (
    <div className="tabla-wrapper fade-in">
      <Table bordered={false} className="tabla-categorias">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
              <td>
                <Button
                  className="btn-accion"
                  size="sm"
                  onClick={() => openEditModal(categoria)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  className="btn-accion"
                  size="sm"
                  onClick={() => openDeleteModal(categoria)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaCategorias;
