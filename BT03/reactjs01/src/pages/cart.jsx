import { useEffect, useState } from "react";
import {
  getCartApi,
  updateCartItemApi,
  removeCartItemApi,
} from "../util/api";
import { useDispatch } from "react-redux";
import { setCart as setCartRedux } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // FETCH CART
  const fetchCart = async () => {
    try {
      const res = await getCartApi();

      if (res.success) {
        setCart(res.cart);
        dispatch(setCartRedux(res.cart));
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

  const handleUpdate = async (productId, quantity) => {
    if (quantity < 1) return;

    await updateCartItemApi(productId, quantity);
    fetchCart();
  };

  const handleRemove = async (productId) => {
    await removeCartItemApi(productId);
    fetchCart();
  };

  if (loading) return <div>Loading...</div>;

  if (!cart || cart.items.length === 0)
    return <div>Cart is empty</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border p-4 rounded-xl"
          >
            {/* PRODUCT INFO */}
            <div className="flex items-center gap-4">
              <img
                src={item.productId.images?.[0]}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <h2 className="font-semibold">
                  {item.productId.name}
                </h2>

                <p className="text-gray-500">
                  {item.price.toLocaleString()}đ
                </p>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() =>
                  handleUpdate(
                    item.productId._id,
                    item.quantity - 1
                  )
                }
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() =>
                  handleUpdate(
                    item.productId._id,
                    item.quantity + 1
                  )
                }
              >
                +
              </button>
            </div>

            {/* TOTAL + DELETE */}
            <div className="text-right">
              <p className="font-bold">
                {(item.price * item.quantity).toLocaleString()}đ
              </p>

              <button
                onClick={() =>
                  handleRemove(item.productId._id)
                }
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-6 text-right text-xl font-bold">
        Total:{" "}
        {cart.items
          .reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          )
          .toLocaleString()}
        đ
      </div>

      {/* CHECKOUT */}
      <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-80"
        onClick={() => navigate("/checkout")}>
        Checkout
      </button>
    </div>
  );
};

export default CartPage;