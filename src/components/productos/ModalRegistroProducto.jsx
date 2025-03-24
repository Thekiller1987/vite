import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import imageCompression from "browser-image-compression";

const ModalRegistroProducto = ({
  showModal,
  setShowModal,
  nuevoProducto,
  handleInputChange,
  setNuevoProducto,
  handleAddProducto,
  categorias
}) => {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
        setNuevoProducto((prev) => ({ ...prev, imagen: base64 }));
      } catch (error) {
        console.error("Error al comprimir imagen:", error);
        alert("Error al procesar la imagen.");
      }
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (document.activeElement) {
      document.activeElement.blur();
    }
    setTimeout(() => {
      handleAddProducto();
    }, 100);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevoProducto.nombre}
              onChange={handleInputChange}
              required
              style={{ fontSize: "16px" }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={nuevoProducto.precio}
              onChange={handleInputChange}
              required
              style={{ fontSize: "16px" }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={nuevoProducto.categoria}
              onChange={handleInputChange}
              required
              style={{ fontSize: "16px" }}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ fontSize: "16px" }}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegistroProducto;
