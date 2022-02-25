import React from 'react';
import cn from 'classnames';

const Button = ({ size, onClick, children, color }) => {
  const paddingMap = {
    sm: 1,
    md: 2,
    lg: 3,
  };
  const classes = cn(
    'mb-4 rounded border saturate-50 hover:saturate-100 ',
    {
      'bg-purple-400 border-purple-500': !color,
      'bg-green-600 border-green-700': color === 'green',
      'bg-red-600 border-red-700': color === 'red',
      [`p-${paddingMap[size]}`]: true,
    }
    // 'bg-gray-500 border-gray-600'
  );
  return <button className={classes}>{children}</button>;
};

export default Button;
