import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TarjetaProducto = ({ producto }) => {
  const navigate = useNavigate();

  return (
    <Col lg={3} md={4} sm={6} className="mb-4 fade-in"> {/* Agregamos fade-in aquí */}
      <Card
        className="h-100 tarjeta-producto"
        onClick={() => navigate(`/catalogo/producto/${producto.id}`)}
        style={{ cursor: "pointer" }}
      >
        <Card.Img variant="top" src={producto.imagen} className="card-img-top" />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>Precio: C${producto.precio}</Card.Text>
          <Card.Text>Categoría: {producto.categoria}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaProducto;
