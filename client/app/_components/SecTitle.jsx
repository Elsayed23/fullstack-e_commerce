import React from 'react'
import CountdownTimer from './CountdownTimer'



const SecTitle = ({
  T_title,
  B_title,
  classes,
  showCountDown
}) => {
  return (
    <div className={`flex flex-col gap-6 ${classes ? classes : 'mb-9'}`}>
      <div className="flex items-center gap-4">
        <div className='bg-red w-5 h-12 rounded-sm'></div>
        <h3 className='text-red font-medium'>{T_title}</h3>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-16">
        <h1 className='font-medium text-5xl'>{B_title}</h1>
        {
          showCountDown
          &&
          <CountdownTimer />
        }
      </div>
    </div>
  )
}

export default SecTitle