import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getAllProducts, getMoreProducts, getMoreProductsAsync, selectProductList, selectStatus } from "../features/product/productSlice";
import ProductListItem from "../components/ProductListItem";
import LatestView from "../components/LatestView";
import { getProducts } from "../api/productAPI";

// 3-2. 리액트(JS)에서 이미지 파일 import 하는법
import yonexImg from "../images/yonex.jpg";

// 3-5. 서버에서 받아온 데이터라고 가정
import data from "../data.json";

// 3-2. 메인 이미지 스타일드 컴포넌트
const MainBackground = styled.div`
  height: 500px;
  background-image: url(${yonexImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function Main() {
  // const [products, setProducts] = useState(data); // 데이터를 수정해서 바뀐 정보가 렌더링 되어야 한다면 state에 넣음

  // 3-5.
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  // const productList = useSelector(selectProductList); // 리팩터링

  // 8-9. 요청 상태 가져오기
  const status = useSelector(selectStatus); // API 요청 상태(로딩 상태)
  // 로딩 만들기 추천: react-spinners, Lottie Files

  // 3-5. 처음 마운트 됐을때 서버에 상품 목록 데이터를 요청하고 
  // 그 결과를 리덕스 스토어에 저장
  useEffect(() => {
    // 서버에 데이터 요청했다고 가정
    // ... api call ...
    dispatch(getAllProducts(data));
  }, []);

  // 8-4. handleGetMoreProducts() 함수 작성
  const handleGetMoreProducts = async () => {
    const result = await getProducts();
    if (!result) return; // 결과값이 없으면 함수 종료

    dispatch(getMoreProducts(result));
  };

  return (
    <>
      {/* 3-2. 메인 이미지 섹션 */}
      <section>
        <MainBackground />
        {/* <img src={yonexImg} /> */}
      </section>

      {/* 3-4. 상품 목록 레이아웃 섹션 */}
      <section>
        <Container>
          <Row>
            {/* <Col md={4}>
              <img src="https://www.yonexmall.com/shop/data/goods/1645767865278s0.png" width="80%" />
              <h4>상품명</h4>
              <p>상품가격</p>
            </Col>
            <Col md={4}>
              <img src="https://www.yonexmall.com/shop/data/goods/1659329583483s0.png" width="80%" />
              <h4>상품명</h4>
              <p>상품가격</p>
            </Col>
            <Col md={4}>
              <img src="https://www.yonexmall.com/shop/data/goods/1667190100104s0.png" width="80%" />
              <h4>상품명</h4>
              <p>상품가격</p>
            </Col> */}

            {/* 3-6. ProductListItem 컴포넌트 만들어서 반복 렌더링으로 바꾸고 데이터 바인딩 */}
            {/* Quiz1: 반복적인 상품 목록 ProductListItem 컴포넌트화 시키기 */}
            {/* Quiz2: productList 배열을 반복하며 상품 목록 아이템 컴포넌트 렌더링 해보기 */}
            {/* Quiz3: 상품 정보를 props로 넘겨서 데이터 바인딩 */}
            {productList.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </Row>
        </Container>

        {/* 7-1. 상품 더보기 버튼 만들기 */}
        <Button className="mb-4" variant="secondary" 
          // 7-3. 더보기 버튼 클릭 시 axios를 사용하여 데이터 요청
          onClick={() => {
            axios.get('http://localhost:4000/products')
              .then((response) => {
                console.log(response.data);
                // 7-5. 스토어에 dispatch로 요청 보내기
                dispatch(getMoreProducts(response.data));
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          더보기
        </Button>

        {/* 8-1. 위 HTTP 요청 코드를 함수로 만들어서 api폴더로 추출하고 async/await로 바꾸기 */}
        <Button className="mb-4" variant="secondary" onClick={handleGetMoreProducts}>
          더보기
        </Button>

        {/* 8-8. thunk를 이용한 비동기 작업 처리하기 */}
        <Button className="mb-4" variant="secondary" onClick={() => dispatch(getMoreProductsAsync())}>
          더보기 {status}
        </Button>
      </section>

      {/* 12-3. Main.js에 import */}
      <LatestView />
    </>
  );
};

export default Main;

// 7-2.
// json-server
// 실무와 비슷한 느낌으로 하기 위해 가짜(Fake) API 서버를 만들거임
// 이 때 사용되는 도구가 json-server
// 이 도구를 사용하면 json 파일 하나만 있으면 연습용 서버를 쉽게 구성 할 수 있음
// ./src/data2.json 이라는 파일을 작성
// npx json-server ./src/data2.json --port 4000

// json-server 사용법
// https://github.com/typicode/json-server#singular-routes
// https://redux-advanced.vlpt.us/3/01.html