import { useEffect, useState } from "react";
import {
  getMyOrdersApi,
  cancelOrderApi,
  createMomoPaymentApi
} from "../util/api";

const MyOrdersPage = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
const handlePayMomo =
  async (order) => {

    try {

      const res =
        await createMomoPaymentApi(
          order._id,
          order.totalPrice
        );
        console.log("MOMO PAYMENT RESPONSE:", res);
      window.location.href =
        res.payUrl;

    } catch (err) {

      console.log(err);
    }
  };
  const fetchOrders = async () => {

    try {

      const res =
        await getMyOrdersApi();

      if (res.success) {
        setOrders(res.orders);
      }

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (
    orderId
  ) => {

    try {

      const res =
        await cancelOrderApi(orderId);

      alert(res.message);

      fetchOrders();

    } catch (err) {

      console.log(err);
    }
  };

  const getStatusText = (status) => {

    switch (status) {

      case 1:
        return "🆕 Đơn mới";

      case 2:
        return "✅ Đã xác nhận";

      case 3:
        return "📦 Đang chuẩn bị";

      case 4:
        return "🚚 Đang giao";

      case 5:
        return "🎉 Đã giao";

      case 6:
        return "❌ Đã hủy";

      default:
        return "Unknown";
    }
  };

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        📜 Lịch sử đơn hàng
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white shadow rounded-2xl p-6"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center border-b pb-4">

              <div>
                <p className="font-semibold">
                  Mã đơn:
                  {" "}
                  {order._id}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <div className="font-semibold">
                {getStatusText(
                  order.status
                )}
              </div>

            </div>

            {/* ITEMS */}
            <div className="mt-4 space-y-4">

              {order.items.map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >

                  <div className="flex gap-4 items-center">

                    <img
                      src={
                        item.productId
                          ?.images?.[0]
                      }
                      className="w-20 h-20 object-cover rounded-xl"
                    />

                    <div>

                      <h2 className="font-semibold">
                        {
                          item.productId
                            ?.name
                        }
                      </h2>

                      <p className="text-gray-500">
                        SL:
                        {" "}
                        {item.quantity}
                      </p>

                    </div>

                  </div>

                  <div className="font-bold">
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}
                    đ
                  </div>

                </div>

              ))}

            </div>

            {/* FOOTER */}
            <div className="mt-6 flex justify-between items-center border-t pt-4">

              <div>

                <div className="text-xl font-bold">
                  Tổng:
                  {" "}
                  {order.totalPrice.toLocaleString()}
                  đ
                </div>
<p className="text-sm text-gray-500 mt-1">

  💳 Thanh toán:
  {" "}

  <span className="font-medium">

    {
      order.paymentMethod === "MOMO"
        ? "MoMo"
        : "COD"
    }

  </span>

</p>
                <p
                  className={`text-sm mt-1
      ${order.isPaid
                      ? "text-green-600"
                      : "text-red-500"
                    }`}
                >

                  {order.isPaid
                    ? "✅ Đã thanh toán"
                    : "❌ Chưa thanh toán"}

                </p>

              </div>

              <div className="flex gap-3">

                {/* PAY MOMO */}
                {
                  !order.isPaid &&
                  order.paymentMethod === "MOMO" && (

                    <button
                      onClick={() =>
                        handlePayMomo(order)
                      }
                      className="bg-pink-500 text-white px-5 py-2 rounded-xl hover:bg-pink-600"
                    >
                      Thanh toán
                    </button>

                  )
                }

                {/* CANCEL */}
                {
                  order.status < 4 &&
                  order.status !== 6 && (

                    <button
                      onClick={() =>
                        handleCancel(
                          order._id
                        )
                      }
                      className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
                    >
                      Hủy đơn
                    </button>

                  )
                }

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyOrdersPage;