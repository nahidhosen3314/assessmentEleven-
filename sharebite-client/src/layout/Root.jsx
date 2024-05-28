import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = () => {
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;
