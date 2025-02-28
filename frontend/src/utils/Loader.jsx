import React from 'react';

export const Loader = ({ size = 'medium', color = 'blue' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    purple: 'border-purple-500'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          animate-spin
          rounded-full
          border-4
          border-t-transparent
        `}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

// Usage example showing different variations
// const LoaderDemo = () => {
//   return (
//     <div className="space-y-8 p-8">
//       <div className="space-y-2">
//         <h3 className="text-lg font-medium">Different Sizes</h3>
//         <div className="flex items-center gap-4">
//           <Loader size="small" />
//           <Loader size="medium" />
//           <Loader size="large" />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <h3 className="text-lg font-medium">Different Colors</h3>
//         <div className="flex items-center gap-4">
//           <Loader color="blue" />
//           <Loader color="green" />
//           <Loader color="red" />
//           <Loader color="purple" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoaderDemo;