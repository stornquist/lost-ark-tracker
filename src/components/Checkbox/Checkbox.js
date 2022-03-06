import cn from 'classnames';
import React from 'react';

const Checkbox = ({ checked, onChange, ...rest }) => {
  const classes = cn(
    'appearance-none w-4 h-4 bg-red-400 checked:bg-green-400 rounded-sm',
    {
      // custom styled input
      'checked:after:block': true,
      'after:absolute': true,
      'after:hidden': true,
      'checked:after:rotate-45': true,
      'checked:after:left-[20px]': true,
      'checked:after:top-[15px]': true,
      'checked:after:border-green-900': true,
      'checked:after:border-t-0': true,
      'checked:after:border-r-[4px]': true,
      'checked:after:border-b-[4px]': true,
      'checked:after:border-l-[0px]': true,
      'checked:after:w-[8px]': true,
      'checked:after:h-[12px]': true,
      'checked:after:rounded-sm': true,
    }
  );

  return (
    <input
      type="checkbox"
      className={classes}
      checked={checked}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Checkbox;
