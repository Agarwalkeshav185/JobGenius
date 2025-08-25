import react from 'react';

const UrlInput = ({ name, value = '', onChange, placeholder }) => {
    return (
        <input
                type="url"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="px-3 py-2 border border-gray-300 rounded-lg w-1/3"
              />
    )
};

export default UrlInput;