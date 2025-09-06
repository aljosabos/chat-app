import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "./LoginForm.schema";
import { Input } from "../Input/Input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@features/user/userSlice";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { authStatus, error } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (fields: LoginFormValues) => {
    try {
      const res = await dispatch(loginUser(fields)).unwrap();

      if (res.user) navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-md p-10 dark:bg-dark-bg-2 rounded-xl">
        <div className="text-center dark:text-dark-text-1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            name="email"
            placeholder="Email"
            error={errors.email?.message}
            register={register}
          />

          <Input
            name="password"
            placeholder="Password"
            error={errors.password?.message}
            register={register}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center bg-green-1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green-2 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {authStatus === "pending" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Login"
            )}
          </button>
          <div className="text-sm">
            <p className="flex flex-col items-center justify-center  text-center text-md dark:text-dark-text-1">
              <span>Don't have an account?</span>
              <Link
                to="/register"
                className="hover:underline cursor-pointer transition ease-in duration-300"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
