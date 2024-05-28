import { useForm } from "react-hook-form";
import useTitle from "../components/useTitle";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect } from "react";
import useAxiosSecure from "../components/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFood = () => {
    useTitle({ title: "Update Food" });
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { id } = useParams();

    const { reset, handleSubmit, setValue, formState: { errors }, register } = useForm();

    const { data: updatefood, isError, isLoading } = useQuery({
        queryKey: ["updatefood", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/update-foods/${id}`);
            return res.data;
        },
        onSuccess: (data) => {
            reset(data); // Populate the form with fetched data
        }
    });

    useEffect(() => {
        if (user) {
            setValue('donator_email', user.email);
            setValue('donator_name', user.displayName);
            setValue('donator_image', user.photoURL);
        }
    }, [user, setValue]);

    const onSubmit = (data) => {
        axiosSecure.put(`/update-foods/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Updated Food Successfully!");
                    navigate(`/manage-foods/${user?.uid}`);
                }
            });
    };

    if (isError) {
        return <div>Error loading data.</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="py-10 md:py-20">
            <div className="container">
                <div className="bg-primary/10 p-5 lg:p-10 rounded">
                    <h3 className="mb-3">Update Food Item</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10"
                    >
                        <label className="">
                            <div className="mb-2">Food Image URL*</div>
                            <input
                                {...register("foodImage", {
                                    required: "Food Image URL is required.",
                                })}
                                defaultValue={updatefood?.foodImage}
                                type="text"
                                className="border-2 rounded border-gray-400 p-2.5 w-full dark:bg-slate-800"
                            />
                            {errors.foodImage && (
                                <div className="text-red-500">
                                    {errors.foodImage.message}
                                </div>
                            )}
                        </label>
                        <label className="">
                            <div className="mb-2">Food Name*</div>
                            <input
                                {...register("foodname", {
                                    required: "Food name is required.",
                                })}
                                defaultValue={updatefood?.foodname}
                                type="text"
                                className="border-2 rounded border-gray-400 p-2.5 w-full dark:bg-slate-800"
                            />
                            {errors.foodname && (
                                <div className="text-red-500">
                                    {errors.foodname.message}
                                </div>
                            )}
                        </label>
                        <label className="">
                            <div className="mb-2">Food Quantity*</div>
                            <input
                                {...register("foodqty", {
                                    required: "Food quantity is required.",
                                })}
                                defaultValue={updatefood?.foodqty}
                                type="number"
                                className="border-2 rounded border-gray-400 p-2.5 w-full dark:bg-slate-800"
                            />
                            {errors.foodqty && (
                                <div className="text-red-500">
                                    {errors.foodqty.message}
                                </div>
                            )}
                        </label>
                        <label className="">
                            <div className="mb-2">Pickup Location*</div>
                            <input
                                {...register("pickup_location", {
                                    required: "Pickup Location is required.",
                                })}
                                defaultValue={updatefood?.pickup_location}
                                type="text"
                                className="border-2 rounded border-gray-400 p-2.5 w-full dark:bg-slate-800"
                            />
                            {errors.pickup_location && (
                                <div className="text-red-500">
                                    {errors.pickup_location.message}
                                </div>
                            )}
                        </label>
                        <label className="">
                            <div className="mb-2">Expired Date</div>
                            <input
                                type="date"
                                {...register("expired_date")}
                                defaultValue={updatefood?.expired_date ? updatefood.expired_date.split("T")[0] : ''}
                                className="border-2 rounded border-gray-400 p-2.5 w-full dark:bg-slate-800"
                            />
                        </label>
                        <label className="">
                            <div className="mb-2">Donator Name</div>
                            <input
                                type="text"
                                readOnly
                                {...register("donator_name")}
                                defaultValue={user?.displayName}
                                className="border-2 rounded border-gray-400 p-2.5 w-full dark:bg-slate-800"
                            />
                        </label>
                        <label className="">
                            <div className="mb-2">Donator Email</div>
                            <input
                                type="email"
                                readOnly
                                defaultValue={user?.email}
                                {...register("donator_email", {
                                    required: "Donator email address is required"
                                })}
                                className="border-2 rounded border-gray-400 p-2.5 w-full dark:bg-slate-800"
                            />
                            {errors.donator_email && (
                                <div className="text-red-500">
                                    {errors.donator_email.message}
                                </div>
                            )}
                        </label>
                        <label className="">
                            <div className="mb-2">Donator Image</div>
                            <input
                                type="text"
                                readOnly
                                defaultValue={user?.photoURL}
                                {...register("donator_image")}
                                className="border-2 rounded border-gray-400 p-2.5 w-full dark:bg-slate-800"
                            />
                        </label>
                        <label className="col-span-full">
                            <div className="mb-2">Additional Notes</div>
                            <textarea
                                {...register("notes")}
                                defaultValue={updatefood?.notes}
                                className="border-2 rounded border-gray-400 p-2.5 w-full dark:bg-slate-800 h-32"
                            ></textarea>
                        </label>
                        <div className="col-span-full text-center mt-5">
                            <button className="tw-btn tw-btn-primary">
                                Update Food Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateFood;
