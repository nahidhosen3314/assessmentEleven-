import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "./FoodCard";

const FeaturedFoods = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data: featuredFoods, isLoading, isError} = useQuery({
        queryKey: ['featured-foods'],
        queryFn: async () => {
            const res = await axiosSecure.get('/featured-foods')
            return res.data
        }
    })

    if(!featuredFoods){
        return
    }

    return (
        <div className="bg-gray-100 dark:bg-slate-600 py-10 md:py-20">
            <div className="container">
                <div className="text-center mb-6 max-w-2xl mx-auto">
                    <h3 className="mb-3">Featured Foods</h3>
                    <p className="text-base">Discover our most requested items that make a big impact. By donating these high-demand products, you help ensure that families have access to wholesome and balanced meals.</p>
                    <div className="inline-block border-b-2 border-primary w-11"></div>
                </div>
                {isLoading ? (
                    <div className="text-center">
                        Loading{" "}
                        <span className="loading loading-spinner loading-xs"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-7">
                        {featuredFoods?.slice(0, 6).map((item, idx) => (
                            <FoodCard
                                key={idx}
                                data={item}
                            ></FoodCard>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedFoods;
