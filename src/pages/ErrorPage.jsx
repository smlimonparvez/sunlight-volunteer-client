import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
            <h1 className='text-4xl font-bold text-red-700'>404 Not Found</h1>
            <p>May be your URL path is not correct.</p>
            <Link to='/' className='btn'>Back to Home</Link>
        </div>
    );
};

export default ErrorPage;