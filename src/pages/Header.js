import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function Header() {
  const navigate = useNavigate();

  // 13. 실시간 데이터가 중요하다면 react-query
  // 1. axios 이용한 ajax 요청
  // axios.get('http://localhost:4000/user')
  //   .then((res) => {
  //     console.log(res.data);
  //   });

  // 2. react-query를 이용한 ajax 요청
  // 사용 예: const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  // 장점1: 성공/실패/로딩중 상태를 쉽게 파악 가능
  // 장점2: 틈만나면 자동으로 재요청해줌(신선한 데이터) => 다른 화면 갔다가 넘어오면 refetch
  // 장점3: 실패시 알아서 retry 해줌 => 일부러 주소 틀리게 입력해보면 확인 가능
  // 장점4: 자식에서도 같은 데이터가 필요할때 state공유 안해도 됨, 
  // 자식에서 동일한 ajax 요청 코드를 넣어도 요청은 한번만 하고 데이터는 공유됨
  // 장점5: ajax 성공 결과를 5분 동안 캐싱함, 
  // 12시 10분에 실행되고 12시 13분에 동일한 요청이 수행되면 12시 10분 결과를 우선 보여주고, 그 다음에 요청함
  // 즉, 기존 성공 결과를 먼저 보여주고 그 다음에 요청을 시작함(빠른 느낌을 줌)
  const { isLoading, error, data } = useQuery(['qKey'], () => {
    return axios.get('http://localhost:4000/user')
      .then((res) => {
        console.log('react-query 요청!!');
        return res.data;
      });
  }, { 
    staleTime: 2000, // 2초 안에는 refetch 안함
  });
  // console.log(data, isLoading, error);

  // if (isLoading) return 'Loading...';
  // if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      {/* 헤더 영역: 상단 내비게이션 바 */}
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#" onClick={() => { navigate('/'); }}>고니네 샵</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/'); }}>홈</Nav.Link>
              <Nav.Link onClick={() => { navigate('/cart'); }}>장바구니</Nav.Link>
            </Nav>

            {/* 13. 실시간 데이터가 중요하다면 react-query */}
            <Nav className="me-auto" style={{ color: 'white' }}>
              {isLoading ? '로딩중' : data.name}
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Outlet />
    </>
  );
};

export default Header;