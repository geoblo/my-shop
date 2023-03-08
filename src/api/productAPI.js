import axios from "axios";

// 8-2. api/products.js 에 api 요청 함수 만들기
// 상품과 관련된 api 요청 함수들을 정의
// 가독성도 좋고 여러 곳에서 재사용할 수 있도록 함수로 만듦
export const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:4000/products');
    if (response.status === 200) { // 요청 시 200 OK 일때만 결과를 리턴
      return response.data;
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
  } catch (error) { // 서버가 죽었거나, 인터넷이 끊겼거나, URL이 잘못됐을 때 등
    console.error(error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`https://my-json-server.typicode.com/geoblo/db-shop/products/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// 8-3. 혹시 뭐.. 서버로 데이터를 보낸다면??
// export const addProduct = async (product) => {
//   try {
//     const response = await axios.post('http://localhost:4000/product-add', { product });
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error(`api error: ${response.status} ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
// 개념 정리: 서버와 데이터를 주고 받을 때, 텍스트(문자)만 주고 받을 수 있음
// array, object 같은 데이터 타입은 서버가 모름 그래서 JSON이라는 포맷을 사용

// 인자값을 객체로 넘기고 받으면 매개변수의 순서 신경안써도 되고 중간에 인자값이 빠져도 오케이
// export const orderProduct = async ({ productId, orderCount }) => {
//   try {
//     const response = await axios.post('http://localhost:4000/product-order', { productId, orderCount });
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error(`api error: ${response.status} ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };


// (참고만..)
// 동시에 여러개의 요청 생성
// function getUserAccount() {
//   return axios.get('/user/12345');
// }

// function getUserPermissions() {
//   return axios.get('/user/12345/permissions');
// }

// Promise.all([getUserAccount(), getUserPermissions()])
//   .then(function (results) {
//     const acct = results[0];
//     const perm = results[1];
//   });
