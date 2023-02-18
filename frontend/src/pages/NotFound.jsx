import React from 'react'
import { Result } from 'antd';
const NotFound = () => {
    return (
        <div className='bg-[#ddd] w-full absolute top-0 h-screen'>
            <div className='flex justify-center items-center h-screen'>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                />
            </div>
        </div>
    )
}

export default NotFound
