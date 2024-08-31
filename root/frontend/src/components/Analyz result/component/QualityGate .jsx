import React from 'react';

const QualityGate = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold mr-4">Quality Gate</h2>
        <p className="bg-green-100 text-green-600 py-1 px-3 rounded">Passed</p>
      </div>
      <nav className="flex space-x-4 text-blue-500">
        <a href="#" className="hover:underline">File By File</a>
        <a href="#" className="hover:underline">Overall Code</a>
        {/* <a href="#" className="font-semibold underline">Overall Code</a> */}
      </nav>
    </div>
  );
};

export default QualityGate;
