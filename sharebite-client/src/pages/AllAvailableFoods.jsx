import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../components/useAxiosSecure";
import FoodCard from "../components/FoodCard";

const AllAvailableFoods = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: foods,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["foods"],
        queryFn: async () => {
            const res = await axiosSecure.get("/foods");
            return res.data;
        },
    });

    return (
        <div className="py-20">
            <div className="container">
                <div className="gap-5 mb-5">
                    <h2>Available Food Items</h2>
                </div>
                {isError && <h3>Something went wrong!!!</h3>}
                {isLoading ? (
                    <span className="loading loading-ring loading-lg text-center"></span>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-7">
                        {foods?.map((item, idx) => (
                            <FoodCard key={idx} data={item}></FoodCard>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllAvailableFoods;
