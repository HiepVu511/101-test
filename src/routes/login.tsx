import { useState } from "react";
import { useMutation } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "../components/Login";
import { loginMutation } from "../utils/api";
import CustomError from "../utils/error";
import { LoginData } from "../utils/types";

const LoginRoute = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate } = useMutation({
    mutationFn: loginMutation,
    onError: (err) => {
      if (err instanceof CustomError && err.name === "INCORRECT_CREDENTIALS") {
        setErrorMessage(err.message);
      } else {
        toast.error("Something went wrong with our app. Please try again later.");
      }
    },
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirectUrlParams = searchParams.get("redirectUrl");
  const reAuthParams = searchParams.get("reAuth");

  const handleLogin = (d: LoginData) => {
    mutate(d, {
      onSuccess: (res) => {
        localStorage.setItem("orgToken", res.data?.memberships[0]?.token);

        let redirectUrl = "/";

        if (redirectUrlParams) redirectUrl = redirectUrlParams;

        navigate(redirectUrl, { replace: true });
      },
    });
  };

  return (
    <div className="flex items-center h-full justify-center px-6 py-8 mx-auto lg:py-0">
      {reAuthParams && (
        <h1 className="text-white">
          Your session has expired. Please login again.
        </h1>
      )}
      <Login onLogin={handleLogin} customError={errorMessage} />
    </div>
  );
};

export default LoginRoute;
