import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../components/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "react-tooltip";
import { FaEdit, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useTitle from "../components/useTitle";
import { useState } from "react";


const ManageFood = () => {
    useTitle({ title: "Manage Foods" });

    const [myList, setMyList] = useState([]);
    
    const axiosSecure = useAxiosSecure();

    const { id } = useParams();

    const {
        data: foods,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["foods", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-foods/${id}`);
            return res.data;
        },
    });

    if(!foods){
        return
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/manage-foods/${id}`)
                    .then((res) => {
                        console.log("inside delete: ", res)
                        if (res.data.deletedCount > 0) {
                            const remainFoods = myList.filter((item) => item._id !== id);
                            setMyList(remainFoods);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success",
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Item could not be deleted. Please try again.",
                                icon: "error",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error: ", error);
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error",
                        });
                    });
            }
        });
    };
    
    
    return (
        <div className="container py-20">
            {isLoading ? (
                <div className="text-center">
                    Loading
                    <span className="loading loading-spinner loading-xs"></span>
                </div>
            ) : (
                <table className="table ">
                    <thead>
                        <tr>
                            <th className="dark:text-white">Area</th>
                            <th className="dark:text-white">Donator</th>
                            <th className="dark:text-white">Expired on</th>
                            <th className="dark:text-white">Quantity</th>
                            <th className="dark:text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods?.map((data) => {
                            const {
                                donator_name,
                                expired_date,
                                foodImage,
                                foodname,
                                foodqty,
                                pickup_location,
                                _id
                            } = data;
                            return (
                                <tr key={_id}>
                                    <td>
                                        <Link
                                            to={`/foods/${_id}`}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={foodImage}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    {foodname}
                                                </div>
                                                <div className="text-sm opacity-50">
                                                    {pickup_location}
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td>{donator_name}</td>
                                    <td>{expired_date}</td>
                                    <td>{foodqty}</td>
                                    <th>
                                        <div className="flex gap-2">
                                        <Tooltip id="my-tooltip" />
                                            <Link
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="Edit"
                                                to={`/update-foods/${data._id}`}
                                                className="bg-purple-600 text-white rounded-full flex items-center justify-center w-8 h-8"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(data._id)
                                                }
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="Remove"
                                                className="bg-red-700 text-white rounded-full flex items-center justify-center w-8 h-8"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageFood;