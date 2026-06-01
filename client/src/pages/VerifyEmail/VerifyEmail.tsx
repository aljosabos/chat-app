import { apiFetch } from "@utils/api";
import { ApiError } from "@utils/apiError";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await apiFetch(`auth/verify-email/${token}`);

        setStatus("success");
        setMessage("Email verified successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Verification failed or link expired";

        setStatus("error");
        setMessage(message);
      }
    };

    if (token) verifyEmail();
  }, [token, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        {status === "loading" && <p>Verifying email...</p>}

        {status === "success" && <p className="text-green-500">{message}</p>}

        {status === "error" && <p className="text-red-500">{message}</p>}
      </div>
    </div>
  );
};
