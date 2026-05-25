import axios from './axios.customize';

const createUserApi = (name, email, password) => {
    const URL_API = "/api/auth/register";
    const data = {
        name, email, password

    }

    return axios.post(URL_API, data)

}

const loginApi = (email, password) => {
    const URL_API = "/api/auth/login";
    const data = {
        email, password
    }
    return axios.post(URL_API, data)

}

const getUserApi = () => {
    const URL_API = "/api/auth/user/profile";
    return axios.get(URL_API)

}

export const getProductsApi = async ({
    keyword = "",
    page = 1,
    limit = 8,
    category = "",
    isSale = "",

}) => {

    return await axios.get("/api/products", {
        params: {
            keyword,
            page,
            limit,
            category,
            isSale,
        },
    });

};

export const getProductDetailApi = async (id) => {
    return await axios.get(`/api/products/${id}`, {
    });
};
export const getBestSellerApi =
    async () => {

        return await axios.get(
            "/api/products/best-seller"
        );

    };

export const getMostViewedApi =
    async () => {

        return await axios.get(
            "/api/products/most-viewed"
        );

    };
export const addToCartApi = (productId, quantity = 1) => {
  return axios.post("/api/cart/add", {
    productId,
    quantity,
  });
};
export const getCartApi = () => {
  return axios.get("/api/cart");
};


export const removeCartItemApi = (productId) => {
  return axios.delete(`/api/cart/item`,{
    data:
    {
    productId: productId
    }
  });
};

export const updateCartItemApi = (productId, quantity) => {
  return axios.put("/api/cart/update", {
    productId,
    quantity,
  });
};
export const getMyOrdersApi = () => {
  return axios.get("/api/order/my-orders");
};

export const createOrderApi = async (data) => {

  return await axios.post(
    "/api/order/create",data
  );

};

export const cancelOrderApi = async (orderId) => {

  return await axios.post(
    "/api/order/cancel",
    {
      orderId,
    }
  );
}
export const createMomoPaymentApi =
  async (orderId, amount) => {

    return await axios.post(
      "/api/payment/momo",
      {
        orderId,
        amount,
      }
    );
  };
export {
    createUserApi, loginApi, getUserApi
}