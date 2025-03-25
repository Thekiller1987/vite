import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import { db } from "../database/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import TarjetaProducto from "../components/catalogo/TarjetaProducto";
import VistaProducto from "../components/catalogo/VistaProducto";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

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

  const productosFiltrados = categoriaSeleccionada === "Todas"
    ? productos
    : productos.filter((producto) => producto.categoria === categoriaSeleccionada);

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
                    <TarjetaProducto key={producto.id} producto={producto} />
                  ))
                ) : (
                  <p>No hay productos en esta categoría.</p>
                )}
              </Row>
            </>
          }
        />

        <Route path="producto/:id" element={<VistaProducto productos={productos} />} />
      </Routes>
    </Container>
  );
};

export default Catalogo;
