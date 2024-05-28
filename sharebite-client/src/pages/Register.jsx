import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import SocialLogin from "../components/SocialLogin";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import useTitle from "../components/useTitle";
import useAxiosSecure from "../components/useAxiosSecure";

const Register = () => {
    useTitle({ title: "Register" });
    const axiosSecure = useAxiosSecure()

    const { createUser, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const { fname, lname, email, password, photourl } = data;

        createUser(email, password)
            .then((response) => {
                updateProfile(response.user, {
                    displayName: `${fname} ${lname}`,
                    photoURL: photourl,
                });
                const user = {
                    name: `${fname} ${lname}`,
                    email: email,
                    photoURL: photourl,
                    createdAt: response.user?.metadata?.createdAt,
                    uid: response.user.uid
                }

                axiosSecure.post('/users', user)
                    .then(res => {
                        console.log("data: ", res.data)
                        if(res.data.insertedId){
                            toast.success("User Created Successfully!");
                            navigate("/");
                        }
                        setLoading(false);
                    })
                
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
                        <h4 className="mb-5">Create an account</h4>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-7"
                        >
                            <div className="">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    {...register("fname", {
                                        required: "First name is required",
                                    })}
                                    className="border-b border-gray-400 bg-transparent w-full py-2 font-medium !outline-none focus:border-primary"
                                />
                                {errors.fname && (
                                    <div className="text-red-600">
                                        {errors.fname.message}
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    {...register("lname")}
                                    className="border-b border-gray-400 bg-transparent w-full py-2 font-medium !outline-none focus:border-primary"
                                />
                            </div>
                            <div className="">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    {...register("email", {
                                        required: "Email Address is required",
                                    })}
                                    className="border-b border-gray-400 bg-transparent w-full py-2 font-medium !outline-none focus:border-primary"
                                />
                                {errors.email && (
                                    <div className="text-red-600">
                                        {errors.email.message}
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <div
                                    onClick={handleShowPassword}
                                    className="absolute top-2 right-2 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <FaEye className="text-xl" />
                                    ) : (
                                        <FaEyeSlash className="text-xl" />
                                    )}
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                                            message:
                                                "Password must contain at least one lowercase letter, one uppercase letter",
                                        },
                                    })}
                                    className="border-b border-gray-400 bg-transparent w-full py-2 font-medium !outline-none focus:border-primary"
                                />
                                {errors.password && (
                                    <div className="text-red-600">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    {...register("cpassword", {
                                        required:
                                            "Confirm Password is required",
                                        validate: (val) => {
                                            if (val !== watch("password")) {
                                                return "Password don't match";
                                            }
                                        },
                                    })}
                                    className="border-b border-gray-400 bg-transparent w-full py-2 font-medium !outline-none focus:border-primary"
                                />
                                {errors.cpassword && (
                                    <div className="text-red-600">
                                        {errors.cpassword.message}
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <input
                                    type="text"
                                    placeholder="Photo URL"
                                    {...register("photourl")}
                                    className="border-b border-gray-400 bg-transparent w-full py-2 font-medium !outline-none focus:border-primary"
                                />
                            </div>
                            <button
                                type="submit"
                                className="tw-btn tw-btn-primary w-full"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    "Create an account"
                                )}
                            </button>
                            <div className="text-center">
                                Already have an account? &nbsp;
                                <NavLink
                                    to="/login"
                                    className="text-primary underline hover:no-underline"
                                >
                                    Login
                                </NavLink>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-wrap gap-x-5 items-center mx-auto max-w-md my-5">
                        <div className="border-b border-gray-400 bg-transparent flex-1"></div>
                        <span>Or</span>
                        <div className="border-b border-gray-400 bg-transparent flex-1"></div>
                    </div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;
