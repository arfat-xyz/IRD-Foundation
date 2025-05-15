import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">
          {`Oops! The page you're looking for doesn't exist.`}
        </p>
        <p className="mt-2 text-md text-gray-500">
          It seems like the page has been moved or deleted.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
