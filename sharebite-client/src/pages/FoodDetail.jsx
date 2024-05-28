import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../components/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const FoodDetail = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const [currentDate, setCurrentDate] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    console.log("currentUser: ", user);

    useEffect(() => {
        const date = new Date().toLocaleDateString();
        setCurrentDate(date);
    }, []);

    const {
        data: food,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["food", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/foods/${id}`);
            return res.data;
        },
    });

    if (!food) {
        return;
    }

    const {
        _id,
        donator_email,
        donator_image,
        donator_name,
        expired_date,
        foodImage,
        foodname,
        foodqty,
        notes,
        pickup_location,
    } = food;

    const handleRequest = (id) => {
        const reqFood = { request_date: currentDate }
        
        // added to reqest collection
        const requestFoodInfo = {
            uid: user?.uid,
            foodid: id
        }
        axiosSecure.post(`/request-foods`, requestFoodInfo)
        
        axiosSecure.put(`/request-foods/${id}`, reqFood)
            .then(res => {
                console.log("request res: ", res);
                if (res.data.modifiedCount > 0) {
                    toast.success("Food requested Successfull!");
                    navigate('/foods')
                }
            });

    }


    return (
        <div className="py-14 bg-primary/10">
            <div className="container">
                {isError && <h3>Something went wrong!!!</h3>}
                {isLoading ? (
                    <span className="loading loading-ring loading-lg text-center"></span>
                ) : (
                    <>
                        <img
                            src={foodImage}
                            className="aspect-video object-cover mb-10 w-full"
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                            <div className="bg-white dark:bg-slate-800 p-5 md:col-span-2">
                                <div className="flex flex-wrap gap-5 border-b mb-5 pb-5">
                                    <div className="sm:flex-1">
                                        <div className="flex gap-2 items-center">
                                            <div className="h-10 w-10 rounded-full">
                                                {donator_image ? (
                                                    <img
                                                        src={donator_image}
                                                        alt={donator_name}
                                                        className="w-full h-full object-cover rounded-full border-2 border-primary"
                                                    />
                                                ) : (
                                                    <FaCircleUser className="text-4xl" />
                                                )}
                                            </div>
                                            <div className="">
                                                <strong>{donator_name}</strong>
                                                <div>{pickup_location}</div>
                                            </div>
                                        </div>
                                        <h3 className="mt-4">{foodname}</h3>
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-primary">
                                            {foodqty}
                                        </h3>
                                        <div>( Quantity )</div>
                                        <button
                                            className="py-1.5 px-2 mt-3 tw-btn-primary"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "request-modal"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            Make a Request
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <div className="">
                                        <strong>Expired on: </strong>
                                        {expired_date}
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <h4 className="mb-3">Description</h4>
                                    {notes}
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-5 w-full max-w-sm mx-auto">
                                <h4 className="mb-4 text-center">
                                    Get a free quote
                                </h4>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="border w-full p-3"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="border w-full p-3"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Contact Number"
                                        className="border w-full p-3"
                                    />
                                    <textarea
                                        className="border w-full p-3"
                                        placeholder="Message"
                                    ></textarea>
                                    <input
                                        type="submit"
                                        value="Get a quote"
                                        className="tw-btn-primary cursor-pointer tw-btn"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="request-modal" className="modal">
                <div className="modal-box max-w-4xl p-0 rounded-none">
                    <div className="grid md:grid-cols-2 grid-cols-1">
                        <div className="">
                            <img
                                src={foodImage}
                                className="h-full object-cover w-full"
                            />
                        </div>
                        <div className="p-5">
                            <div className="sm:flex-1">
                                <div className="flex gap-2 items-center">
                                    <div className="h-10 w-10 rounded-full">
                                        {donator_image ? (
                                            <img
                                                src={donator_image}
                                                alt={donator_name}
                                                className="w-full h-full object-cover rounded-full border-2 border-primary"
                                            />
                                        ) : (
                                            <FaCircleUser className="text-4xl" />
                                        )}
                                    </div>
                                    <div className="">
                                        <strong>{donator_name}</strong>
                                        <div>{donator_email}</div>
                                    </div>
                                </div>
                                <h3 className="mt-4">{foodname}</h3>
                                <div className="mt-3">
                                    <p className="text-base mb-2"><strong>Pickup Location: </strong>{pickup_location}</p>
                                    <p className="text-base mb-2"><strong>Food ID: </strong>{_id}</p>
                                    <p className="text-base mb-2"><strong>Request Date: </strong>{currentDate}</p>
                                    <p className="text-base mb-2"><strong>Expire Date: </strong>{expired_date}</p>
                                    <p className="text-base mb-2">
                                        <strong className="border-b-2 border-primary">Notes </strong> <br />
                                        {notes}
                                    </p>
                                    <button onClick={() => handleRequest(id)} className="tw-btn tw-btn-primary mt-3">Confirm Request</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action absolute m-0 top-2 right-2">
                        <form method="dialog">
                            <button className="h-6 w-6 shadow-md rounded-full flex justify-center items-center bg-white">
                                <RxCross1 />
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default FoodDetail;
