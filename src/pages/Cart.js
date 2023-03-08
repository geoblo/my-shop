import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { decreaseCount, increaseCount, selectCartList, removeItemFromCart } from "../features/cart/cartSlice";

function Cart() {
  // const user = useSelector((state) => state.user);
  // console.log(user);

  // 11-5. Cart.js 에서 cart의 전역 상태를 꺼내서 데이터 바인딩 하기
  const cartList = useSelector(selectCartList); // 리팩터링
  console.log(cartList);

  // 11-6. 숫자 포맷 적용
  const formatter = new Intl.NumberFormat('ko-KR');

  // 11-9. dispatch() 작성하기
  const dispatch = useDispatch();

  return (
    <div>
      {/* <h5>{user.name}님이 장바구니에 담은 상품입니다.</h5> */}

      {/* 표 레이아웃 만들기 */}
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {/* 장바구니 내용 하드코딩 */}
          {/* <tr>
            <td>1</td>
            <td>라켓</td>
            <td>2</td>
            <td>199,000원</td>
          </tr> */}

          {/* 11-6. Quiz: cartList 반복 렌더링 및 데이터 바인딩 하기 */}
          {cartList.map((cart, index) => (
            <tr key={cart.id}>
              <td>{index + 1}</td>
              <td>{cart.title}</td>
              <td>
                {/* 11-7. 수량 변경하기 버튼 만들기 */}
                <button 
                  // 11-9. dispatch() 작성하기
                  onClick={() => { dispatch(decreaseCount(cart.id)); }}
                >
                  -
                </button>
                {cart.count}
                <button 
                  // 11-9. dispatch() 작성하기
                  onClick={() => { dispatch(increaseCount(cart.id)); }}
                >
                  +
                </button>
              </td>
              <td>
                {formatter.format(cart.price * cart.count)}원
              </td>
              <td>
                <button 
                  onClick={() => { dispatch(removeItemFromCart(cart.id)); }}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;