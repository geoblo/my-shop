import { createSlice, current } from "@reduxjs/toolkit";

// const initialState = 'Kim'; // 원시값일때 - 연습용(수업 패스)
const initialState = {
  name: 'Kim',
  email: 'geoblo@naver.com',
  role: 'admin'
};

// 로그인한 유저 정보를 담을 slice를 만듦
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // changeName: (state) => {
    //   // return 'JH Kim'; // 새로운 state 반환해서 갈아치워 줌 - 연습용(수업 패스)
    //   state.name = 'JH Kim';
    // },
  }
});

export const { changeName } = userSlice.actions;

export default userSlice.reducer;