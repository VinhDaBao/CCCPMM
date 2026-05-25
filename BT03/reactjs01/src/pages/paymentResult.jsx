import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentResultPage = () => {
  const [status, setStatus] = useState("processing");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResult = async () => {
      const params = new URLSearchParams(window.location.search);

      const resultCode = params.get("resultCode");
      const orderId = params.get("orderId");

      if (resultCode === "0") {
        setStatus("success");

        try {
          const response = await axios.post(
            "http://localhost:8088/api/payment/momo-ipn",
            {
              orderId,
              resultCode: 0,
            }
          );

          console.log("IPN RESPONSE:", response.data);
        } catch (err) {
          console.log("IPN ERROR:", err);
        }

        setTimeout(() => navigate("/my-orders"), 2000);
      } else if (resultCode !== null) {
        setStatus("failed");

        setTimeout(() => navigate("/my-orders"), 2000);
      } else {
        setStatus("failed");

        setTimeout(() => navigate("/my-orders"), 2000);
      }
    };

    handleResult();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {status === "processing" && <h2>Đang xử lý...</h2>}
      {status === "success" && <h2>Thanh toán thành công 🎉</h2>}
      {status === "failed" && <h2>Thanh toán thất bại ❌</h2>}
    </div>
  );
};

export default PaymentResultPage;