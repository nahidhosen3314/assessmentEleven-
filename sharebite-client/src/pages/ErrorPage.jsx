import { Link } from "react-router-dom";

const ErrorPage = () => {


    return (
        <>
        <div className="container py-16 flex items-center justify-center min-h-screen">
            <div className="max-w-lg mx-auto text-center">
                <h2 className="mb-8 font-extrabold text-7xl text-primary">
                    <span className="sr-only">Error</span>404
                </h2>
                <p className="text-2xl font-semibold md:text-3xl">
                    Sorry, we could not find this page.
                </p>
                <p className="mt-4 mb-8 ">
                    But dont worry, you can find plenty of other things on our
                    homepage.
                </p>
                <Link to="/"
                    className="px-8 py-3 font-semibold rounded tw-btn bg-black text-white"
                >
                    Back to homepage
                </Link>
            </div>
        </div>
        </>
    );
};

export default ErrorPage;
