import React from "react";
import styled from "styled-components";
import { Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

import { selectProductList } from "../features/product/productSlice";

const LatestViewWrapper = styled(Card)`
  position: fixed;
  top: 100px;
  right: 20px;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.25);
  width: 8rem;
`;

function LatestView() {
  const productList = useSelector(selectProductList); // 처음 새로고침 시 한번 빈 배열
  const latestViewed = JSON.parse(localStorage.getItem('latestViewed')); // 못찾으면 null
  const latestViewedProducts = latestViewed?.map((id) => productList.find((product) => product.id === id)); // 옵셔널 체이닝에 의해 undefined 반환

  if (productList.length < 1 || !latestViewedProducts) {
    return null;
  }

  return (
    <LatestViewWrapper>
      <Card.Header>최근 본 상품</Card.Header>
      <ListGroup variant="flush">
        {latestViewedProducts.map((product, index) => (
          <React.Fragment key={product.id}>
            <img src={product.imagePath} alt={`img-${index}`} />
            <ListGroup.Item className="text-ellipsis">{product.title}</ListGroup.Item>
          </React.Fragment>
        ))}
      </ListGroup>
    </LatestViewWrapper>
  );
};

export default LatestView;