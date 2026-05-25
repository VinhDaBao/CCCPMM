import { useEffect, useState } from "react";

import {
    getCartApi,
    createOrderApi,
    createMomoPaymentApi
} from "../util/api";
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] =
        useState("COD");
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        note: "",
    });

    const fetchCart = async () => {

        try {

            const res = await getCartApi();

            if (res.success) {
                setCart(res.cart);
            }

            setLoading(false);

        } catch (err) {

            console.log(err);

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const totalPrice =
        cart?.items?.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        ) || 0;

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckout = async () => {

        try {

            const orderData = {
                ...form,

                items: cart.items.map((item) => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                    price: item.price,
                })),

                totalPrice,

                paymentMethod,
            };

            const res =
                await createOrderApi(orderData);

            if (!res.success) return;

            // MOMO
            if (paymentMethod === "MOMO") {

                const momoRes =
                    await createMomoPaymentApi(
                        res.order._id,
                        totalPrice
                    );
                window.location.href =
                    momoRes.payUrl;

                return;
            }

            // COD
            alert("Đặt hàng thành công");

        } catch (err) {

            console.log(err);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-10">
                Loading...
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="text-center mt-10">
                Cart is empty
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">

                <h1 className="text-2xl font-bold mb-6">
                    🧾 Checkout
                </h1>

                <div className="space-y-8">

                    <input
                        type="text"
                        name="fullName"
                        placeholder="   Họ và tên"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="   Số điện thoại"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    <textarea
                        name="address"
                        placeholder="   Địa chỉ"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl h-28"
                    />

                    <textarea
                        name="note"
                        placeholder="   Ghi chú"
                        value={form.note}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl h-24"
                    />

                </div>

            </div>

            {/* RIGHT */}
            <div className="bg-white p-6 rounded-2xl shadow h-fit">

                <h2 className="text-xl font-bold mb-6">
                    🛒 Đơn hàng
                </h2>

                <div className="space-y-4">

                    {cart.items.map((item) => (

                        <div
                            key={item._id}
                            className="flex justify-between items-center"
                        >

                            <div>

                                <p className="font-medium line-clamp-1">
                                    {item.productId.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    x{item.quantity}
                                </p>

                            </div>

                            <p className="font-semibold">
                                {(item.price * item.quantity)
                                    .toLocaleString()}đ
                            </p>

                        </div>
                    ))}

                </div>

                <div className="border-t mt-6 pt-6">

                    <div className="flex justify-between text-lg font-bold">

                        <span>Tổng cộng</span>

                        <span className="text-red-500">
                            {totalPrice.toLocaleString()}đ
                        </span>

                    </div>
                    <div className="mt-6 space-y-4">

                        <h3 className="font-bold text-lg">
                            💳 Phương thức thanh toán
                        </h3>

                        {/* COD */}
                        <label
                            className={`flex items-center gap-4 border rounded-2xl p-4 cursor-pointer transition
    ${paymentMethod === "COD"
                                    ? "border-black bg-gray-100"
                                    : ""
                                }`}
                        >

                            <input
                                type="radio"
                                value="COD"
                                checked={
                                    paymentMethod === "COD"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            <div>

                                <p className="font-semibold">
                                    💵 Thanh toán COD
                                </p>

                                <p className="text-sm text-gray-500">
                                    Thanh toán khi nhận hàng
                                </p>

                            </div>

                        </label>

                        {/* MOMO */}
                        <label
                            className={`flex items-center gap-4 border rounded-2xl p-4 cursor-pointer transition
    ${paymentMethod === "MOMO"
                                    ? "border-pink-500 bg-pink-50"
                                    : ""
                                }`}
                        >

                            <input
                                type="radio"
                                value="MOMO"
                                checked={
                                    paymentMethod === "MOMO"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            <div>

                                <p className="font-semibold text-pink-500">
                                    🌸 Ví MoMo
                                </p>

                                <p className="text-sm text-gray-500">
                                    Thanh toán online qua MoMo
                                </p>

                            </div>

                        </label>

                    </div>
                    <button
                        onClick={handleCheckout}
                        className={`w-full mt-6 text-white py-3 rounded-xl transition
  ${paymentMethod === "MOMO"
                                ? "bg-pink-500 hover:bg-pink-600"
                                : "bg-black hover:opacity-80"
                            }`}
                    >

                        {paymentMethod === "MOMO"
                            ? "Thanh toán với MoMo"
                            : "Thanh toán COD"}

                    </button>

                </div>

            </div>

        </div>
    );
};

export default CheckoutPage;