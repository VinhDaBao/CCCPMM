import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useDispatch} from "react-redux";
import { setCart } from "../redux/cartSlice";

import axios from "axios";
import { getProductDetailApi } from "../util/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { message } from "antd";
import "swiper/css";
import { addToCartApi } from "../util/api";
const ProductDetailPage = () => {


    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const dispatch = useDispatch();
    const handleAddToCart = async () => {
  try {

    const res = await addToCartApi(product._id, quantity);
    dispatch(setCart(res.cart));
    message.success("Đã thêm vào giỏ hàng");

  } catch (err) {

    message.error("Thêm vào giỏ hàng thất bại");

    console.log(err.response?.data || err.message);
  }
}
    useEffect(() => {
        fetchDetail();
    }, []);

    const fetchDetail = async () => {
        try {

            const res = await getProductDetailApi(id);
            setProduct(res.product);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="text-center mt-10">
                Loading...
            </div>
        );
    }
    if (!product) {
        return (
            <div className="text-center mt-10">
                Không tìm thấy sản phẩm
            </div>
        );
    }
    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* LEFT - IMAGE SLIDER */}
            <div>
                <Swiper className="rounded-xl overflow-hidden shadow-lg">
                    {product.images?.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                className="w-full h-[400px] object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* RIGHT - INFO */}
            <div className="flex flex-col gap-4">

                <h1 className="text-3xl font-bold">
                    {product.name}
                </h1>

                <p className="text-gray-500">
                    {product.description}
                </p>

                <p className="text-2xl text-red-500 font-semibold">
                    {product.price?.toLocaleString()}đ
                </p>

                {/* STOCK + SOLD */}
                <div className="flex gap-6 text-sm text-gray-600">
                    <span>
                        📦 Tồn kho: {product.stock}
                    </span>
                    <span>
                        🔥 Đã bán: {product.sold}
                    </span>
                </div>

                <div className="text-sm">
                    🏷 Danh mục:{" "}
                    <span className="font-medium">
                        {product.category}
                    </span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                    <button
                        className="w-10 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition" onClick={() =>
                            quantity > 1 &&
                            setQuantity(quantity - 1)
                        }
                    >
                        -
                    </button>

                    <span className="text-lg font-medium">
                        {quantity}
                    </span>

                    <button
                        className="w-10 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        onClick={() =>
                            setQuantity(quantity + 1)
                        }
                    >
                        +
                    </button>

                </div>

                <div className="mt-2 text-lg">
                    Tổng tiền:{" "}
                    <span className="font-bold text-green-600">
                        {(product.price * quantity).toLocaleString()}đ
                    </span>
                </div>

                <div className="flex gap-4 mt-5">
                    <button className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80" 
                    
                    onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                    </button>

                    <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:opacity-80">
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductDetailPage;
