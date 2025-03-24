import { Card, Col } from "react-bootstrap";

const TarjetaProducto = ({ producto }) => {
  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Card style={{ height: "400px" }}> {/* Establecer altura fija */}
        {producto.imagen && (
          <Card.Img
            variant="top"
            src={producto.imagen}
            alt={producto.nombre}
            style={{ maxHeight: "200px", objectFit: "contain" }} // Ajustar tamaño de imagen
          />
        )}
        <Card.Body className="d-flex flex-column justify-content-between"> {/* Mejorar diseño */}
          <div>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Text>
              Precio: C${producto.precio} <br />
              Categoría: {producto.categoria}
            </Card.Text>
          </div>
          <div className="mt-2">
            {/* Puedes agregar botones u otros elementos aquí */}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaProducto;