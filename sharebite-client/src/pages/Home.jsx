import About from '../components/About';
import Hero from '../components/Hero';
import useTitle from "../components/useTitle";
import Subscribe from '../components/Subscribe';
import FeaturedFoods from '../components/FeaturedFoods';

const Home = () => {
    useTitle({ title: "Home" });
    return (
        <div>
            <Hero></Hero>
            <About></About>
            <FeaturedFoods></FeaturedFoods>
            <Subscribe></Subscribe>
        </div>
    );
};

export default Home;