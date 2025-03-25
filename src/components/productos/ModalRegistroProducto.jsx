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
  const convertToCompressedBase64 = async (file) => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 600,
      useWebWorker: true
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const objectUrl = URL.createObjectURL(compressedFile);

      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const base64 = canvas.toDataURL("image/png");
            URL.revokeObjectURL(objectUrl);
            resolve(base64);
          } catch (err) {
            URL.revokeObjectURL(objectUrl);
            reject(err);
          }
        };

        img.onerror = (err) => {
          URL.revokeObjectURL(objectUrl);
          reject(err);
        };

        img.src = objectUrl;
      });
    } catch (error) {
      console.error("Error al comprimir imagen:", error);
      throw error;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (file.size > 5 * 1024 * 1024) {
          alert("La imagen supera los 5MB. Por favor, selecciona una más liviana.");
          return;
        }

        const base64 = await convertToCompressedBase64(file);
        setNuevoProducto((prev) => ({ ...prev, imagen: base64 }));
      } catch (error) {
        console.error("Error al procesar imagen:", error);
        alert("Error al procesar la imagen. Asegúrate de que sea una imagen válida.");
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
        <Form onSubmit={handleSubmitForm} className="formulario-producto">
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevoProducto.nombre}
              onChange={handleInputChange}
              required
              className="input-formulario"
            />
          </Form.Group>
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={nuevoProducto.precio}
              onChange={handleInputChange}
              required
              className="input-formulario"
            />
          </Form.Group>
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={nuevoProducto.categoria}
              onChange={handleInputChange}
              required
              className="input-formulario"
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-formulario"
            />
          </Form.Group>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              className="btn-formulario"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="btn-formulario"
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegistroProducto;
