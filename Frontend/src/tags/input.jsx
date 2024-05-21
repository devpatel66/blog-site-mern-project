/* eslint-disable react/prop-types */

function Input({id,name,className="",type="text",value=null,disable=false}) {
  return (
    <input id={id} name={name} type={type} required className={`block w-full rounded-md border-0 text-gray-900 px-4 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`} value={value} readOnly={disable}/>
  )
}

export default Input