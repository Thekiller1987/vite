import React from "react";
import { Modal, Form, Button, Image } from "react-bootstrap";
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/jpeg", 0.7); // JPEG forzado
            resolve(dataURL);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = reject;
        img.src = reader.result;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleEditImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const base64 = await convertToBase64(compressedFile);
        setProductoEditado((prev) => ({ ...prev, imagen: base64 }));
      } catch (error) {
        console.error("Error al procesar imagen:", error);
        alert("Error al procesar la imagen.");
      }
    }
  };

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={productoEditado.nombre}
              onChange={handleEditInputChange}
              style={{ fontSize: "16px" }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={productoEditado.precio}
              onChange={handleEditInputChange}
              style={{ fontSize: "16px" }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={productoEditado.categoria}
              onChange={handleEditInputChange}
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
            <Form.Label>Imagen Actual</Form.Label>
            {productoEditado.imagen && (
              <Image src={productoEditado.imagen} width="100" className="mb-2" />
            )}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
              style={{ fontSize: "16px" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditProducto}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
