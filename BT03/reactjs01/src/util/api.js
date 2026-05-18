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
export {
    createUserApi, loginApi, getUserApi
}