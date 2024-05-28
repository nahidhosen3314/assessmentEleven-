import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../components/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../components/useTitle";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const RequestList = () => {
    useTitle({ title: "Requested Foods" });

    const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext)

    const {
        data: foods,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["foods", user.uid],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-foods/${user.uid}`);
            return res.data;
        },
    });

    if (!foods) {
        return;
    }

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
                            <th className="dark:text-white">Requested on</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods?.map((data) => {
                            const {
                                donator_name,
                                expired_date,
                                request_date,
                                foodImage,
                                foodname,
                                pickup_location,
                                _id,
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
                                                    <img src={foodImage} />
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
                                    <td>{request_date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RequestList;
