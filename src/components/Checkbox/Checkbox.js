import cn from 'classnames';
import React from 'react';

const Checkbox = ({ checked, onChange, label, className, ...rest }) => {
  const handleChange = () => {
    onChange();
  };

  const classes = cn(
    'appearance-none w-4 h-4 bg-gray-500 checked:bg-green-400 rounded-sm relative',
    {
      // custom styled input
      'checked:after:block': true,
      'after:absolute': true,
      'after:hidden': true,
      'checked:after:z-5': true,
      'checked:after:rotate-45': true,
      'checked:after:left-[4px]': true,
      'checked:after:top-[1px]': true,
      'checked:after:border-black': true,
      'checked:after:opacity-70': true,
      'checked:after:border-t-0': true,
      'checked:after:border-r-[4px]': true,
      'checked:after:border-b-[4px]': true,
      'checked:after:border-l-[0px]': true,
      'checked:after:w-[8px]': true,
      'checked:after:h-[12px]': true,
      'checked:after:rounded-sm': true,
    },
    className
  );

  return (
    <div className="flex flex-row items-center">
      <input
        type="checkbox"
        className={classes}
        checked={checked}
        onChange={handleChange}
        {...rest}
      />
      {label && <p className="pl-2">{label}</p>}
    </div>
  );
};

export default Checkbox;
