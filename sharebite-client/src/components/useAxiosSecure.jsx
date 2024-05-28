import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://sharebite-server-psi.vercel.app/",
    withCredentials: true
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
