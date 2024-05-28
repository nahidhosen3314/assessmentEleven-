import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "./useAxiosSecure";

const SocialLogin = () => {
    const { githubLogin, googleLogin, setUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const hangleGoogleLogin = () => {
        googleLogin().then((res) => {
            setUser(res.user);
            axiosSecure.post('/users', res.user)
            toast.success("User Logged in Successfully!");
            navigate('/')
        }).catch(error => {
            toast.error(error.message);
        });
    };
    const hangleGithubLogin = () => {
        githubLogin().then((res) => {
            setUser(res.user);
            axiosSecure.post('/users', res.user)
            toast.success("User Logged in Successfully!");
            navigate('/')
        }).catch(error => {
            toast.error(error.message);
        });
    };

    return (
        <div className="max-w-md mx-auto flex flex-col gap-3">
            <button
                onClick={hangleGoogleLogin}
                className="flex items-center gap-2 border border-gray-300 rounded-full p-1 w-full text-center hover:bg-gray-50 duration-200"
            >
                <FcGoogle className="text-4xl" />
                <span className="flex-1">Continue with Google</span>
            </button>
            <button
                onClick={hangleGithubLogin}
                className="flex items-center gap-2 border border-gray-300 rounded-full p-1.5 w-full text-center hover:bg-gray-50 duration-200"
            >
                <FaGithub className="text-3xl"></FaGithub>
                <span className="flex-1">Continue with Github</span>
            </button>
        </div>
    );
};

export default SocialLogin;
