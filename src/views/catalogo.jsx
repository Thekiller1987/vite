// Catalogo.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { db } from "../database/firebaseconfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import TarjetaProducto from "../components/catalogo/TarjetaProducto";
import VistaProducto from "../components/catalogo/VistaProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const [showEditModal, setShowEditModal] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);

  const productosCollection = collection(db, "productos");
  const categoriasCollection = collection(db, "categorias");

  const fetchData = async () => {
    try {
      const productosData = await getDocs(productosCollection);
      const fetchedProductos = productosData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductos(fetchedProductos);

      const categoriasData = await getDocs(categoriasCollection);
      const fetchedCategorias = categoriasData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategorias(fetchedCategorias);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaSeleccionada);

  // 🛠 Funciones para edición
  const handleEditarClick = (producto) => {
    setProductoEditado(producto);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProducto = async () => {
    try {
      const productoRef = doc(db, "productos", productoEditado.id);
      await updateDoc(productoRef, productoEditado);
      setShowEditModal(false);
      fetchData(); // Recargar los productos actualizados
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h4>Catálogo de Productos</h4>
              <Row>
                <Col lg={3} md={3} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Filtrar por categoría:</Form.Label>
                    <Form.Select
                      value={categoriaSeleccionada}
                      onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    >
                      <option value="Todas">Todas</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.nombre}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {productosFiltrados.length > 0 ? (
                  productosFiltrados.map((producto) => (
                    <TarjetaProducto
                      key={producto.id}
                      producto={producto}
                      onEditar={handleEditarClick}
                    />
                  ))
                ) : (
                  <p>No hay productos en esta categoría.</p>
                )}
              </Row>

              {/* Modal de edición */}
              <ModalEdicionProducto
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                productoEditado={productoEditado}
                setProductoEditado={setProductoEditado}
                handleEditInputChange={handleEditInputChange}
                handleEditProducto={handleEditProducto}
                categorias={categorias}
              />
            </>
          }
        />

        <Route path="producto/:id" element={<VistaProducto productos={productos} />} />
      </Routes>
    </Container>
  );
};

export default Catalogo;
