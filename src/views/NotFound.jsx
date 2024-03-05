import React from 'react';
import warning from '../assets/images/warning.png';

function PageNotFound() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <img src={warning} alt="Not found page" className="w-64 h-64 mx-auto mb-8" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">404 Page Not Found</h1>
            </div>
        </div>
    );
}

export default PageNotFound;
