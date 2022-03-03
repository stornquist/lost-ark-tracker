import React from 'react';
import cn from 'classnames';

const Button = ({ size, onClick, label, color, className, type, ...rest }) => {
  const classes = cn(
    'mb-4 p-2 rounded border saturate-50 hover:saturate-100',
    className,
    {
      'bg-purple-400 border-purple-500': !color,
      'bg-green-600 border-green-700': color === 'green',
      'bg-red-600 border-red-700': color === 'red',
      'p-1': size === 'sm',
      'p-3': size === 'lg',
    }
  );

  return (
    <button
      onClick={onClick ? onClick : undefined}
      className={classes}
      type={type ? type : 'button'}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
