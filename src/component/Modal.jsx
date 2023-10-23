import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const modal = ({onClose,isOpen,children}) => {
  return createPortal(
    <div>
      {isOpen && (
        <div className=" grid place-items-center absolute z-40 top-0 backdrop-blur h-screen w-screen">
            <div className=" m-auto z-50 relative min-h-[200px] min-w-[80%] bg-white p-4">
                <div className="flex justify-end">
                    <AiOutlineClose onClick={onClose} className="cursor-pointer  text-2xl"/>
                </div> 
                {children}
            </div>
            
            <div  className="absolute z-40 top-0 backdrop-blur h-screen w-screen"/>
        </div>
      )}  
    </div>
  ,document.getElementById("modal-root"))
}

export default modal
