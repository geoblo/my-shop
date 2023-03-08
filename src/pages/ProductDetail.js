import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Alert, Button, Col, Container, Form, Modal, Nav, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import { clearSelectedProduct, getProductByIdAsync, selectSelectedProduct } from "../features/product/productSlice";
import { addItemToCart } from "../features/cart/cartSlice";
import TabContents from "../components/TabContents";

// 6-2. 서버에서 받아온 데이터라고 가정
import data from "../data.json";

// 6-5. 스타일드 컴포넌트를 이용한 애니메이션 속성 적용
const highlight = keyframes`
  from { background-color: #cff4fc; }
  50% { background-color: #e8f7fa; }
  to { background-color: #cff4fc; }
`;
const StyledAlert = styled(Alert)`
  animation: ${highlight} 1s linear infinite;
`;

function ProductDetail() {
  // 6-1. useParams() 사용하여 productId 가져오기 
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);

  // (참고) 받아온 데이터를 단순히 보여주는 용도이면 바로 보여줘도 됨 => ?? 바로 보여주면 재렌더링이 안일어나지 않을까??? 테스트 필요
  // But, 데이터를 수정해서 바뀐 정보가 렌더링 되어야 한다면 state에 넣어야 함
  // 관리자 앱이면 상세 페이지 겸 수정 페이지로 만듦. 또 추후 확장성을 위해서도 state로 관리할때가 있음
  // const [product, setProduct] = useState({});

  // 6-3. 숫자 포맷 적용
  const formatter = new Intl.NumberFormat('ko-KR');

  // 6-5. Info 띄우고 3초뒤에 사라지게 만들기
  const [showInfo, setShowInfo] = useState(true); // Info창 상태
  
  // 6-6. Quiz3: 제어 컴포넌트로 만들기
  const [orderCount, setOrderCount] = useState(1); // 주문수량 상태

  // 9-2. 탭 index 상태 만들기
  const [showTabIndex, setShowTabIndex] = useState(0); // 탭 상태

  // 11-13. 장바구니에 담기 공통 모달 만들기
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const navigate = useNavigate();

  // 6-2. 처음 마운트 됐을때 서버에 상품 id를 이용하여 데이터를 요청하고 
  // 그 결과를 리덕스 스토어에 저장
  useEffect(() => {
    // 서버에서 특정 상품의 데이터를 가져오는 작업을 했다고 가정
    // ... api call ...
    // const foundProduct = data.find((product) => { 
    //   return product.id === productId;
    // });
    // if (!foundProduct) return;
    // dispatch(getProductById(foundProduct));
    
    // My JSON Server 사용으로 개선
    dispatch(getProductByIdAsync(productId));


    // 12-1. ProductDetail에 들어가면 해당 상품의 id 가져와서 localStorage에 추가
    let latestViewed = JSON.parse(localStorage.getItem('latestViewed')) || []; // 처음에 null이니까 기본값으로 빈배열 넣어줌
    // id 넣기전에 기존 배열에 존재하는지 검사하거나
    // 또는 일단 넣고 Set 자료형을 이용하여 중복 제거(간편함)
    latestViewed.push(productId);
    latestViewed = new Set(latestViewed);
    // latestViewed = Array.from(latestViewed);
    latestViewed = [...latestViewed];
    localStorage.setItem('latestViewed', JSON.stringify(latestViewed)); 


    // 6-5. Quiz2: Info 띄우고 3초뒤에 사라지게 만들기
    const timeout = setTimeout(() => {
      setShowInfo(false);
    }, 3000);
    // console.log(timeout);
    // 불필요하게 타이머가 계속 생기는 것을 정리
    return () => {
      clearTimeout(timeout);

      // 상세 페이지가 언마운트 될 때 전역 상태 지우기
      dispatch(clearSelectedProduct());
    };
  }, []);

  // 6-6. Quiz3: 제어 컴포넌트로 만들기
  const handleChangeOrderCount = (e) => {
    // 숫자 외 입력 시 유효성 검사 후 경고 토스트 띄우기
    if (isNaN(e.target.value)) {
      toast.error('💯숫자만 입력하세요!');
      return;
    }
    setOrderCount(Number(e.target.value));
  };

  // 6-4. 사용자가 없는 id를 직접 쳐서 접속 했을 때 처리
  if (!product) {
    // return null; // 아무것도 렌더링하지 않음
    return <div>상품이 존재하지 않습니다.</div>;
  }

  return (
    <Container className="pt-3">
      {/* 6-5. Quiz2: Info 띄우고 3초뒤에 사라지게 만들기 
      처음 렌더링 됐을때 setTimeout으로 타이머 설정 */}
      {showInfo && 
        <StyledAlert variant="info" onClose={() => setShowInfo(false)} dismissible>
          현재 34명이 이 상품을 보고 있습니다.
        </StyledAlert>
      }

      <Row>
        {/* 4-2. 처음엔 상품 상세정보는 하드코딩 */}
        {/* <Col md={6}>
          <img src="https://www.yonexmall.com/shop/data/goods/1645767865278s0.png" width="80%" />
        </Col>
        <Col md={6}>
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>1000원</p>
          <Button variant="primary">주문하기</Button>
        </Col> */}

        {/* 6-3. Quiz1: 데이터 바인딩 작업 */}
        <Col md={6}>
          <img src={product.imagePath} width="80%" />
        </Col>
        <Col md={6}>
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>{formatter.format(product.price)}원</p>

          {/* 6-6. 주문수량 입력 UI 만들기 */}
          {/* Quiz3: 아래 input type text를 제어 컴포넌트로 만들기 */}
          <Col md={4} className="m-auto mb-3">
            <Form.Control type="text" value={orderCount} onChange={handleChangeOrderCount} />
          </Col>

          <Button variant="primary">주문하기</Button>

          {/* 11-10. 장바구니에 아이템 추가하기 UI */}
          <Button variant="warning" 
            onClick={() => { 
              // 11-12. dispatch() 작성하기
              dispatch(addItemToCart({ id: product.id, title: product.title, price: product.price, count: orderCount }));
              
              // 11-13. 장바구니에 담기 공통 모달 만들기
              handleOpen();
            }}
          >
            장바구니
          </Button>
        </Col>
      </Row>

      {/* 9-1. 탭 UI 만들기 */}
      {/* 탭 버튼 UI 만들기 */}
      {/* defaultActiveKey: 기본으로 active할 탭, active 클래스가 들어가있음 */}
      {/* 9-3. 각 탭을 누를때 탭 index 상태 변경 */}
      <Nav variant="tabs" defaultActiveKey="link-0" className="my-3">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => { setShowTabIndex(0); }}>상세정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => { setShowTabIndex(1); }}>리뷰</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => { setShowTabIndex(2); }}>Q&amp;A</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" onClick={() => { setShowTabIndex(3); }}>반품/교환정보</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 9-4. 탭의 내용을 다 만들어 놓고 조건부 렌더링하면 됨 */}
      {/* 방법1. 삼항 연산자 사용 */}
      {/* {showTabIndex === 0 
        ? <div>탭 내용1</div>
        : showTabIndex === 1
          ? <div>탭 내용2</div>
          : showTabIndex === 2 
            ? <div>탭 내용3</div>
            : showTabIndex === 3
              ? <div>탭 내용4</div>
              : null
      } */}
      {/* 위 방식은 비효율적 */}
      
      {/* 방법2. 컴포넌트로 추출 */}
      <TabContents showTabIndex={showTabIndex} />

      {/* 난 컴포넌트를 또 하나 만들기 싫다하면.. */}
      {/* 방법3. 배열이나 객체 형태로 만들어서 조건부 렌더링(편법) */}
      {/* 실무에서 교재로 배운게 아닌 구글링을 통해 배움.. 자주 써먹음 */}
      {/* 배열 형태 */}
      {/* {
        [
          <div>탭 내용1</div>,
          <div>탭 내용2</div>,
          <div>탭 내용3</div>,
          <div>탭 내용4</div>
        ][showTabIndex]
      } */}
      {/* 객체 형태 */}
      {/* {
        {
          'detail': <div>탭 내용1</div>,
          'review': <div>탭 내용2</div>,
          'q&a': <div>탭 내용3</div>,
          'exchange': <div>탭 내용4</div>
        }[showTab]
      } */}

      {/* 11-13. 장바구니에 담기 공통 모달 만들기 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>🛒 고니네 샵 알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          장바구니에 상품을 담았습니다.<br />
          장바구니로 이동하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={() => { navigate('/cart'); }}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetail;