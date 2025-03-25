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
  // Convertir archivo a base64 PNG desde <canvas>
  const convertToBase64PNG = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const img = new Image();

      reader.onload = () => {
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png"); // 🔥 Forzar PNG
            resolve(dataURL);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = reject;
        // delay extra por compatibilidad Safari/iOS
        setTimeout(() => {
          img.src = reader.result;
        }, 50);
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Manejar carga de imagen, comprimir y convertir a PNG
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (file.size > 5 * 1024 * 1024) {
          alert("La imagen supera los 5MB. Por favor, selecciona una más liviana.");
          return;
        }

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        const base64 = await convertToBase64PNG(compressedFile);

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
