import React from 'react';
import cn from 'classnames';

const paddingMap = {
  sm: 1,
  md: 2,
  lg: 3,
};

const Button = ({ size, onClick, label, color, className }) => {
  const classes = cn(
    'mb-4 rounded border saturate-50 hover:saturate-100',
    className,
    {
      'bg-purple-400 border-purple-500': !color,
      'bg-green-600 border-green-700': color === 'green',
      'bg-red-600 border-red-700': color === 'red',
      [`p-${paddingMap[size]}`]: size,
    }
  );

  return (
    <button onClick={onClick} className={classes}>
      {label}
    </button>
  );
};

export default Button;
