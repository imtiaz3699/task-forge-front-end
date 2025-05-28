import React from 'react'
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

function CustomDatePicker({ label, name, value, onChange, prevDisable }) {
    const disabledDateTime = () => ({
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    });
    const disabledDate = current => {
        return current && current < dayjs().endOf('day');
    };

    return (
        <div className='w-full flex flex-col' direction="vertical">
            <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2'>{label}</label>
            <DatePicker
                disabledDate={prevDisable && disabledDate}
                disabledTime={prevDisable &&  disabledDateTime}
                name={name}
                onChange={onChange}
                value={value}
                style={{ color: '#ffffff' }}
                className='!py-3 !bg-transparent !text-white' />
        </div>
    )
}

export default CustomDatePicker
