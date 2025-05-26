import React from 'react'

function CustomSelect({label,options,onChange,name}) {
    return (
        <div>
            <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
            <select onChange={onChange} name= {name} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select role</option>
               {
                options?.map((element,idx)=> {
                    return <option key={idx} value={element?.value}>{element?.label}</option>
                })
               } 
            </select>
        </div>
    )
}

export default CustomSelect
