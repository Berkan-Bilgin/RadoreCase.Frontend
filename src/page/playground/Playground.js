import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

// getAllProducts fonksiyonunu kullanarak tüm ürünleri çeker
const getAllProducts = async () => {
  try {
    const response = await fetch("https://localhost:7245/api/Products");

    if (!response.ok) {
      throw new Error("Veri çekilirken hata oluştu");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Veri çekilirken hata oluştu:", error);
    return [];
  }
};

const Playground = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getAllProducts();
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Playground;
