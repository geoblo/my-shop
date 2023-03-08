import styled from "styled-components";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// 방법1: 스타일드 컴포넌트로 스타일 확장
const StyledCol = styled(Col)`
  cursor: pointer;
`;
// 방법2: GlobalStyle에 공통 스타일로 작성

function ProductListItem(props) {
  const { product } = props;

  // 5-3. 이동 경로 설정하기
  const navigate = useNavigate();

  return (
    <StyledCol md={4} className="cursor-pointer">
      <img src={product.imagePath} width="80%" 
        // 5-3. 이동 경로 설정하기
        onClick={() => { 
          navigate(`/detail/${product.id}`);
        }}
      />
      <h4>{product.title}</h4>
      <p>{product.price}원</p>
    </StyledCol>
  );
};

export default ProductListItem;