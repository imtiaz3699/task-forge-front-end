import React from 'react'
import { DatePicker, Space } from 'antd';

function CustomDatePicker({ label,name,value,onChange }) {
    return (
        <div className = 'w-full flex flex-col' direction="vertical">
            <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2'>{label}</label>
            <DatePicker name = {name} onChange={onChange} value = {value} style={{ color: '#ffffff' }} className = '!py-3 !bg-transparent !text-white' />
        </div>
    )
}

export default CustomDatePicker
