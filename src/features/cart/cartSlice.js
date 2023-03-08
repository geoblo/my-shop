import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cartList: [
    { 
      id: '1',
      title: 'Arcsaber 11 Pro',
      price: 299000,
      count: 2
    },
    { 
      id: '3',
      title: 'Aerus Z',
      price: 199000,
      count: 1
    }
  ]
};

// 장바구니 정보를 담을 slice를 만듦
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 11-8. 수량을 변경하는 리듀서 함수 만들기
    // Quiz: 상품의 id값을 받아서 해당 상품의 장바구니 수량을 1씩 증가/감소
    increaseCount: (state, action) => {
      // find() 사용
      const targetItem = state.cartList.find((cart) => cart.id === action.payload);
      targetItem.count += 1;
      // findIndex() 사용
      // const targetIndex = state.cartList.findIndex((cart) => cart.id === action.payload);
      // state.cartList[targetIndex].count += 1;
    },
    decreaseCount: (state, { payload: id }) => {
      const targetItem = state.cartList.find((cart) => cart.id === id);
      targetItem.count -= 1;
    },
    // 11-11. Quiz: initialState와 동일한 형태의 객체를 넘겨주면 장바구니에 아이템 추가하는 리듀서 함수 만들기(어려움 주의)
    // 이미 들어있는 상품이면 카운트만 증가
    // 장바구니에 없는 상품이면 새롭게 추가
    addItemToCart: (state, { payload: item }) => {
      // item = { id, title, price, count }; 를 받아옴
      console.log(item);
      const targetItem = state.cartList.find((cart) => cart.id === item.id);
      if (targetItem) {
        targetItem.count += item.count;
      } else {
        state.cartList.push(item);
      }
    },
    // Quiz: 장바구니에서 삭제
    removeItemFromCart: (state, { payload: id }) => {
      const targetIndex = state.cartList.findIndex((cart) => cart.id === id);
      state.cartList.splice(targetIndex, 1);
    }
  },
});

export const { increaseCount, decreaseCount, addItemToCart, removeItemFromCart } = cartSlice.actions;

// 리팩터링
// export const selectAll = state => state.cart;
export const selectCartList = state => state.cart.cartList;
// export const selectCartCount = state => state.cart.cartList ? state.cart.cartList.length : 0;

export default cartSlice.reducer;