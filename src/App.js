import { createGlobalStyle } from "styled-components";
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css'; // 1. bootstrap CSS 추가
import 'react-toastify/dist/ReactToastify.min.css'; // ReactToastify CSS 추가

import Header from './pages/Header';
import Main from './pages/Main';
import ProductDetail from './pages/ProductDetail';
import Cart from "./pages/Cart";

// 1. GlobalStyle 설정
const GlobalStyle = createGlobalStyle`
  /* 글로벌(공통) 스타일 */
  body {
    box-sizing: border-box;
  }

  #root {
    text-align: center;
  }

  * {
    box-sizing: inherit;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  /* 넘치는 텍스트에 줄임표(...) 만들기 */
  .text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 10. 컴포넌트에 전환(transition) 효과 주기 */
  .opacity-start {
    opacity: 0;
  }
  .opacity-end {
    opacity: 1;
    transition: opacity 0.5s;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      {/* 1. 리액트 부트스트랩 연습 */}
      {/* <Button variant="primary">Primary</Button> */}
      {/* <button type="button" className="btn btn-primary">Primary</button> */}

      {/* 2. 헤더 영역: 상단 내비게이션 바 */}
      {/* <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">고니네 샵</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={undefined}>홈</Nav.Link>
              <Nav.Link onClick={undefined}>장바구니</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header> */}
      {/* Quiz: Header 컴포넌트 추출 및 Outlet 활용하여 라우팅 구성해보기 */}
      {/* src/pages/Header.js */}

      {/* 2. 기본 / 라우팅 설정 */}
      <Routes>
        <Route path="/" element={<Header />}>
          {/* 3-3. index: index route(여기서는 default child route) */}
          <Route index element={<Main />} />

          {/* 5-1. /detail로 접속하면 상세페이지 렌더링하도록 라우팅 */}
          {/* <Route path="/detail" element={<ProductDetail />} /> */}
          {/* 5-2. Quiz: 상품별 상세페이지 여러 개를 라우팅하려면..? URL 파라미터 사용 */}
          {/* /datail/1로 접속하면 productId에 1이 담김 */}
          <Route path="/detail/:productId" element={<ProductDetail />} />

          {/* 11-1. 장바구니 페이지 만들기 */}
          <Route path="/cart" element={<Cart />} />
          
          <Route path="*" element={<div>페이지가 존재하지 않습니다.</div>} />
        </Route>
      </Routes>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        pauseOnFocusLoss={false}
        theme="dark"
      />
    </>
  );
}

export default App;