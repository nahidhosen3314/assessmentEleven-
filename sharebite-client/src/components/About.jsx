const About = () => {
    return (
        <div className="py-20">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="">
                        <div className="text-base uppercase text-primary mb-4 font-bold">
                            Are you hungry?
                        </div>
                        <h2 className="uppercase mb-4">
                            Did you have a long and
                            <span className="text-primary"> stressful</span> day?
                        </h2>
                        <p className="text-base mb-4">
                            Interested in getting a cheesy pizza delivered to
                            your office or looking to avoid the weekly shop?
                            Then foodpanda Bangladesh is the right destination
                            for you! foodpanda offers you a long and detailed
                            list of the best restaurants and shops near you to
                            help make your everyday easier.
                        </p>
                        <p className="text-base">
                            Our online food delivery service has it all, whether
                            you fancy a juicy burger from Takeout, fresh sushi
                            from Samdado or peri peri chicken from Nando&apos;s,
                            foodpanda Bangladesh has over 2000 restaurants
                            available from Dhaka to Chittagong through to
                            Sylhet.
                        </p>
                    </div>
                    <div className="lg:pl-20">
                        <div className="p-7 relative">
                            <div className="absolute h-40 w-40 bottom-0 right-0 bg-primary -z-10"></div>
                            <div className="absolute h-40 w-40 top-0 left-0 bg-primary -z-10"></div>
                            <img
                                src="https://i.ibb.co/3kz846F/cheese-burger.jpg"
                                alt=""
                                className="w-full object-cover aspect-square"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
