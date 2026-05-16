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

export const getProductsApi = async (keyword = "") => {
  return await axios.get("/api/products", {
    params: { keyword }
  });
};

export const getProductDetailApi = async (id) => {
    return await axios.get(`/api/products/${id}`, {
    });
};

export {
    createUserApi, loginApi, getUserApi
}