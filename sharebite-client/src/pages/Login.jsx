import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";
import SocialLogin from "../components/SocialLogin";
import useTitle from "../components/useTitle";

const Login = () => {
    useTitle({ title: "Login" });

    const { loginUser, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;

        loginUser(email, password)
            .then(() => {
                toast.success("User Logged in successfully!");
                navigate(location.state ? location.state : "/");
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="container py-14 font-medium">
                <div className="max-w-xl mx-auto">
                    <div className="bg-gray-100 rounded p-10">
                        <h4 className="mb-5">Login</h4>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            method="post"
                            className="flex flex-col gap-7"
                        >
                            <div className="">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    {...register("email", {
                                        required: "Email address is required",
                                    })}
                                    className="bg-transparent border-b border-gray-400 w-full py-2 font-medium !outline-none focus:border-primary"
                                />
                                {errors.email && (
                                    <div className="text-red-500">
                                        {errors.email.message}
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    className="bg-transparent border-b border-gray-400 w-full py-2 font-medium !outline-none focus:border-primary"
                                />
                                {errors.password && (
                                    <div className="text-red-500">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="tw-btn tw-btn-primary w-full"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    "Login"
                                )}
                            </button>
                            <div className="text-center">
                                Do not have an account? &nbsp;
                                <NavLink
                                    to="/register"
                                    className="text-primary underline hover:no-underline"
                                >
                                    Create an account
                                </NavLink>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-wrap gap-x-5 items-center mx-auto max-w-md my-5">
                        <div className="border-b border-gray-400 flex-1"></div>
                        <span>Or</span>
                        <div className="border-b border-gray-400 flex-1"></div>
                    </div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
