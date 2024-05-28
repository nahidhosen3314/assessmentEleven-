import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <div className='bg-gray-900 text-white text-base pt-16 pb-5 footer-sec'>
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    <div className="">
                        <Link to="/" className='mb-4 inline-block'>
                            <Logo height="60" className="text-white"></Logo>
                        </Link>
                        <p className='text-white text-base'>shareBite is a food sharing company dedicated to reducing food waste and fostering a sense of community. The platform offers an easy-to-use interface for donors to list available food and for recipients to claim it, promoting sustainability and social responsibility. </p>
                    </div>
                    <div className="">
                        <h4 className='mb-4 text-white'>Contact Info</h4>
                        <p>301 The Greenhouse, Custard Factory, London, E3 8DY.</p>
                        <p>+1 246-345-0695</p>
                        <p>hello@sharebite.com</p>
                    </div>
                    <div className="">
                        <h4 className='mb-4 text-white'>Quick Links</h4>
                        <ul>
                            <li><a href="">Our Services</a></li>
                            <li><a href="">Investment Solution</a></li>
                            <li><a href="">Frequenly Ask Question</a></li>
                            <li><a href="">How It Work</a></li>
                            <li><a href="">Become a Member</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-between items-center flex-wrap border-t border-white/50 pt-5 mt-10">
                    <p className='!m-0'>© 2024 ShareBite All right reserved</p>
                    <a href="" className='hover:underline hover:text-primary'>Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;