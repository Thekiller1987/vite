import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionCategoria = ({
  showEditModal,
  setShowEditModal,
  categoriaEditada,
  handleEditInputChange,
  handleEditCategoria,
}) => {
  if (!categoriaEditada) return null;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (document.activeElement) document.activeElement.blur();
    setTimeout(() => {
      handleEditCategoria();
    }, 100);
  };

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="formulario-producto" onSubmit={handleSubmitForm}>
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={categoriaEditada.nombre}
              onChange={handleEditInputChange}
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
              value={categoriaEditada.descripcion}
              onChange={handleEditInputChange}
              className="input-formulario"
              placeholder="Ingresa la descripción"
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)} className="btn-formulario">
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="btn-formulario">
              Actualizar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEdicionCategoria;
