import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCategoria = ({
  showModal,
  setShowModal,
  nuevaCategoria,
  handleInputChange,
  handleAddCategoria,
}) => {
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (document.activeElement) document.activeElement.blur();
    setTimeout(() => {
      handleAddCategoria();
    }, 100);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="formulario-producto" onSubmit={handleSubmitForm}>
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevaCategoria.nombre}
              onChange={handleInputChange}
              className="input-formulario"
              placeholder="Ingresa el nombre"
              required
            />
          </Form.Group>
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={nuevaCategoria.descripcion}
              onChange={handleInputChange}
              className="input-formulario"
              placeholder="Ingresa la descripción"
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} className="btn-formulario">
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="btn-formulario">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegistroCategoria;
