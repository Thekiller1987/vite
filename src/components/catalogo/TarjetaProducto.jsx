// TarjetaProducto.jsx
import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TarjetaProducto = ({ producto, onEditar }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/catalogo/producto/${producto.id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEditar(producto);
  };

  return (
    <Col lg={3} md={4} sm={6} className="mb-4 fade-in">
      <Card
        className="h-100 tarjeta-producto"
        onClick={handleCardClick}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <Card.Img variant="top" src={producto.imagen} className="card-img-top" />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>Precio: C${producto.precio}</Card.Text>
          <Card.Text>Categoría: {producto.categoria}</Card.Text>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleEditClick}
            className="mt-2"
          >
            Editar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaProducto;
