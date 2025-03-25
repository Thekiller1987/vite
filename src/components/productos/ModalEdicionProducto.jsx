import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import BootstrapImage from "react-bootstrap/Image";
import imageCompression from "browser-image-compression";

const ModalEdicionProducto = ({
  showEditModal,
  setShowEditModal,
  productoEditado,
  setProductoEditado,
  handleEditInputChange,
  handleEditProducto,
  categorias
}) => {
  if (!productoEditado) return null;

  const convertToCompressedBase64 = async (file) => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 600,
      useWebWorker: true,
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

  const handleEditImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (file.size > 5 * 1024 * 1024) {
          alert("La imagen supera los 5MB. Por favor, selecciona una más liviana.");
          return;
        }

        const base64 = await convertToCompressedBase64(file);
        setProductoEditado((prev) => ({ ...prev, imagen: base64 }));
      } catch (error) {
        console.error("Error al procesar imagen:", error);
        alert("Error al procesar la imagen. Asegúrate de que sea una imagen válida.");
      }
    }
  };

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="formulario-producto">
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={productoEditado.nombre}
              onChange={handleEditInputChange}
              className="input-formulario"
            />
          </Form.Group>
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={productoEditado.precio}
              onChange={handleEditInputChange}
              className="input-formulario"
            />
          </Form.Group>
          <Form.Group className="grupo-formulario">
            <Form.Label className="label-formulario">Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={productoEditado.categoria}
              onChange={handleEditInputChange}
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
            <Form.Label className="label-formulario">Imagen Actual</Form.Label>
            {productoEditado.imagen && (
              <BootstrapImage
                src={productoEditado.imagen}
                width="100"
                className="mb-2"
              />
            )}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
              className="input-formulario"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowEditModal(false)}
          className="btn-formulario"
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleEditProducto}
          className="btn-formulario"
        >
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
