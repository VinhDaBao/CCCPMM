import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css';
import { Provider } from "react-redux";

import { store } from "./redux/store";
import {
createBrowserRouter,
RouterProvider,
} from "react-router-dom";
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import ProductDetailPage from './pages/productDetail.jsx';
import CartPage from './pages/cart.jsx';
import MyOrdersPage from './pages/order.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import CheckoutPage from './pages/checkout.jsx';
import PaymentResultPage from './pages/paymentResult.jsx';
const router = createBrowserRouter([
{
path: "/",
element: <App />,
children: [
{
index: true,
element: <HomePage />
},
{
path: "/register",
element: <RegisterPage />
},
{
path: "/login",
element: <LoginPage />
},
{
path: "/user",
element: <UserPage />
},
{
path: "/product/:id",
element: <ProductDetailPage />
},
{
  path: "/cart",
  element: <CartPage />
},
{
  path: "/checkout",
  element: <CheckoutPage />
},
{
  path:"/my-orders",
  element: <MyOrdersPage />
} ,
{
  path: "/payment-result",
  element: <PaymentResultPage />
}
]
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <Provider store={store}>

      <RouterProvider router={router} />

    </Provider>
  </React.StrictMode>,
)