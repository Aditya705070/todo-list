import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'
function TodoItems({ text,date, id, iscompleted, deleteTodo, toggle }) {
  return (
    <div className='flex items-center my-3 gap-2 '>

      <div onClick={()=>{toggle(id)}} className='flex flex-1 item-center cursor-pointer '>
        <img src={iscompleted ? tick : not_tick} alt=""  className='w-7'/>
        <p className={`text-slate-700 ml-4 font-[17px] decoration-slate-500 ${iscompleted ? "line-through" : ""}`}>{text}</p>
        <span className="ml-2 text-gray-500">{date}</span>
      </div>
      <img onClick={() => deleteTodo(id)} src={delete_icon} alt="" className='w-3.5 cursor-pointer'/>
      
    </div>
  )
}

export default TodoItems