import React from 'react';

const TestComponent = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-6">
      <div className="shrink-0">
        <div className="h-12 w-12 bg-cricinfo rounded-full flex items-center justify-center text-white font-bold">
          CS
        </div>
      </div>
      <div>
        <div className="text-xl font-medium text-black">Cricket Scorecard</div>
        <p className="text-gray-500">Tailwind CSS Test</p>
      </div>
    </div>
  );
};

export default TestComponent;
