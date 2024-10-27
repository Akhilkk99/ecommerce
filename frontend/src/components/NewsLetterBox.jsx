import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandle =(e)=>{
        e.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now & Get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis accusantium, aliquam labore quasi laudantium quia, necessitatibus sapiente illo nisi vel consectetur in doloremque numquam corrupti autem, molestias totam tempora cum.
        </p>
        <form onSubmit={onSubmitHandle} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox