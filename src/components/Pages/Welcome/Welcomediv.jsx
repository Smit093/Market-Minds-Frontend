import React from 'react';
import arrow from '../../../assets/imgs/arrow.png';
import logo from "../../../assets/imgs/market-minds-logo.svg";

export default function Welcomediv() {
    return (
        <div className='flex mb-3 items-center justify-center h-screen bg-cover bg-center'>
            {/* First Column */}
            <div className="flex-1 text-center mr-10 relative">
                <h1 className='text-6xl font-kaisei relative text-pastel-green'>
                    Welcome to <br /> Market Minds
                </h1>
                <img src={arrow} height={50} width='auto' className='-mt-6 -mb-10 ml-40' alt="Arrow" />
                <h3 className='text-2xl font-baskervville relative text-pastel-green mt-3'>
                    Start your learning journey today <br /> with the ease of Market Minds
                </h3>
            </div>

            {/* Second Column */}
            <div className="flex-1 text-center mr-20">
                <img src={logo} className='mb-6 h-full ml-24' alt="Market Minds Logo" />
            </div>
        </div>
    );
}