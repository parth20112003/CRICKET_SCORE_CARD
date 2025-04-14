import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cricinfo to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center text-cricinfo">Cricket Scorecard</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>This is a test page to verify that Tailwind CSS is working correctly.</p>
                <ul className="list-disc space-y-2">
                  <li className="flex items-center">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-500 text-white mr-2">1</span>
                    <p className="text-gray-600">If you can see this styled content, Tailwind CSS is working!</p>
                  </li>
                  <li className="flex items-center">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-green-500 text-white mr-2">2</span>
                    <p className="text-gray-600">The page should have a nice gradient background.</p>
                  </li>
                  <li className="flex items-center">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-red-500 text-white mr-2">3</span>
                    <p className="text-gray-600">The card should have a skewed shadow effect.</p>
                  </li>
                </ul>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p className="text-cricinfo">Tailwind CSS Test Page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
