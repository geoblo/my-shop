import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getProducts, getProductById } from "../../api/productAPI";

const initialState = {
  productList: [],
  selectedProduct: {},
  status: 'idle' // 8-6. status 초기 상태 추가
};

// 8-5. thunk를 이용한 비동기 작업 처리하기
// 이점? 
// 1) API 요청에 대한 상태 관리 쉽게 가능(요청 시작-로딩중, 요청 성공 또는 실패 시 로딩이 끝났음을 명시)
// 2) 요청이 성공하면 응답에 대한 상태 관리, 실패하면 에러에 대한 상태 관리 등
// thunk: 미들웨어=액션을 디스패치 했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업을 실행
// 액션과 리듀서 중간에 끼어있는 중간자 역할, 액션 -> (미들웨어) -> 리듀서
// createAsyncThunk는 비동기 작업을 처리하는 액션 생성 함수를 만들어줌
export const getMoreProductsAsync = createAsyncThunk(
  'product/getMoreProductsAsync', // 첫번째 인자값: action type
  async () => { // 두번째 인자값: action이 발생했을 때 실행할 비동기 작업(api 요청 같은)
    const result = await getProducts();
    return result; // 값을 반환하면 `fulfilled`로 바뀌고 action.payload에 담겨 리듀서 함수로 전달됨
  }
);

export const getProductByIdAsync = createAsyncThunk(
  'product/getProductByIdAsync',
  async (id) => {
    const result = await getProductById(id);
    return result;
  }
);

// 상품 정보를 담을 slice를 만듦
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.productList = action.payload;
    },
    // getProductById: (state, action) => {
    //   state.selectedProduct = action.payload;
    // },
    // ----------------------------------------------------
    // 7-4. 더보기 버튼 클릭 시 전역 상태에 상품 목록 추가
    getMoreProducts: (state, action) => {
      state.productList.push(...action.payload);
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = {};
    }
  },
  // 8-7. extraReducers 정의
  // 비동기적인 작업에는 extraReducers를 사용
  // reducers로 동기 작업을 할 때는 액션 생성 함수를 자동으로 만들어주는 반면 
  // extraReducers로 비동기 작업을 할 때는 액션 생성 함수를 자동으로 만들지 못함
  extraReducers: (builder) => {
    builder
      .addCase(getMoreProductsAsync.pending, (state) => { // pending 상태 일때 동작할 리듀서 함수
        state.status = 'loading';
      })
      .addCase(getMoreProductsAsync.fulfilled, (state, action) => { // fulfilled 상태 일때 동작할 리듀서 함수
        state.status = 'idle'; // complete, success 등
        state.productList.push(...action.payload);
      })
      .addCase(getMoreProductsAsync.rejected, (state) => { // rejected 상태 일때 동작할 리듀서 함수
        state.status = 'fail';
      })
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByIdAsync.rejected, (state) => {
        state.status = 'fail';
      });
  }
});

export const { getAllProducts, getMoreProducts, clearSelectedProduct } = productSlice.actions;

// 리팩터링(함수가 담겨있음)
// export const selectAll = state => state.product;
export const selectProductList = state => state.product.productList;
export const selectSelectedProduct = state => state.product.selectedProduct;
// export const selectProductCount = state => state.product.productList ? state.product.productList.length : 0;
export const selectStatus = state => state.product.status;

export default productSlice.reducer;