import { Link } from "react-router-dom";
import { Typewriter, Cursor } from "react-simple-typewriter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const Hero = () => {
    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        fade: true,
        speed: 1000,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="relative z-10">
            <Slider {...settings} className="relative z-0">
                <img
                    className="h-[500px] lg:h-[700px] w-full object-cover"
                    src="https://i.ibb.co/K74TW6f/mariana-medvedeva.jpg"
                    alt=""
                />
                <img
                    className="h-[500px] lg:h-[700px] w-full object-cover"
                    src="https://i.ibb.co/f9fQnRR/massimo-adami.jpg"
                    alt=""
                />
                <img
                    className="h-[500px] lg:h-[700px] w-full object-cover"
                    src="https://i.ibb.co/Fmt3Qyk/lore-schodts.jpg"
                    alt=""
                />
            </Slider>
            <div className="bg-slate-900/50 absolute h-full z-10 w-full left-0 top-0">
                <div className="container flex items-center justify-center h-full w-full">
                    <div className="text-center">
                        <div className="text-lg uppercase mb-4 text-white">It&apos;s the food you love, delivered</div>
                        <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl uppercase font-bold">
                            We ensure the&nbsp;
                            <div className="text-white text-outline-2 !text-transparent">
                                <Typewriter
                                    words={["quality food", "organic food", "on time delivery"]}
                                    loop={9999}
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                                <Cursor cursorColor='#EA4335' />
                            </div>
                        </h1>
                        <Link to="/foods" className="tw-btn tw-btn-primary text-xl mt-7">Get Food Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
