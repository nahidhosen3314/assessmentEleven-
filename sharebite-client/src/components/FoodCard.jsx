import { FaCalendarAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const FoodCard = ({ data }) => {
    const {
        _id,
        donator_image,
        donator_name,
        foodImage,
        foodname,
        foodqty,
        pickup_location,
        expired_date,
        notes,
    } = data;
    return (
        <div>
            <div className="relative z-10">
                <span className="text-white top-3 right-3 bg-primary font-bold absolute px-2 py-1 z-10">
                    Qty: {foodqty}
                </span>
                <img
                    src={foodImage}
                    alt=""
                    className="w-full object-cover aspect-[1/0.8]"
                />
                <div className="absolute h-1/2 w-full bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-5">
                    <h4 className="text-white">{foodname}</h4>
                    <div className="w-14 border-b"></div>
                </div>
            </div>
            <div className="">
                <div className="bg-gray-200 dark:bg-slate-800 relative z-10 p-5">
                    <div className="">
                        <div className="flex gap-2 items-center justify-between flex-wrap">
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
                            <div className="flex gap-2 items-center">
                                <FaCalendarAlt />
                                {expired_date}
                            </div>
                        </div>
                        <div className="mt-4 line-clamp-4">{notes}</div>
                    </div>
                    <Link
                        to={`/foods/${_id}`}
                        className="tw-btn tw-btn-primary mt-5"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
