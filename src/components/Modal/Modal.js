import React from 'react';
import Button from '../Button';
import { IoClose } from 'react-icons/io5';

const Modal = ({ fields, onSave, onClose }) => {
  return (
    <>
      {/* THIS IS THE BLURRY BACKGROUND */}
      <div
        className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-sm z-20 h-screen w-screen"
        onClick={onClose}
      ></div>
      {/* THIS IS A WRAPPER FOR THE FULLSCREEN TO FLEX THE BOX TO THE MIDDLE */}
      <div className="absolute top-0 bottom-0 left-0 right-0 h-screen w-screen flex">
        <div className="z-30 relative self-center place-self-center bg-gray-800 m-auto rounded-lg border border-gray-700 shadow-md">
          <div className="absolute right-2 top-2">
            <IoClose size="20" onClick={onClose} className="text-gray-400" />
          </div>
          <div className="p-12">
            {fields.map((field, index) => (
              <div>
                {field.label && (
                  <p className="italic text-gray-400 text-sm">{field.label}</p>
                )}
                {field.type === 'text' && (
                  <input
                    autoFocus={index === 0}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="px-2 py-1 rounded-sm bg-gray-700 focus:caret-white mb-2 w-full"
                  />
                )}
                {field.type === 'dropdown' && (
                  <select
                    name={field.name}
                    className="px-2 py-1 rounded-sm text-gray-300 bg-gray-700 w-full"
                  >
                    {field.options.map(option => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end items-end pr-4">
            <Button
              className="px-5 py-1"
              color="red"
              label="close"
              onClick={onClose}
            />
            <Button className="px-5 py-1 ml-1" color="green" label="OK" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
