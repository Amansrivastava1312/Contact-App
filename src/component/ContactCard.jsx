import React from 'react'
import {HiOutlineUserCircle} from "react-icons/hi"
import {RiEditCircleLine} from "react-icons/ri"
import {IoMdTrash} from "react-icons/io"
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import AddContact from './AddContact'
import { useState } from 'react'
import useDisclouse from '../hooks/useDisclouse'
import { toast } from 'react-toastify'

const ContactCard = ({contacts,isUpdate}) => {

  const { isOpen, onClose ,onOpen} = useDisclouse();
  
    const deleteContacts = async(id) => {
        try {
            await deleteDoc(doc(db,"contacts",id))
            toast.success("Contact Deleted Successfully")
        } catch (error) {
            console.log(error)
        }
    }

  return (
        <>
        <div key={contacts.id} className="mt-4 flex justify-between bg-yellow items-center p-2 rounded-lg">
              <div className="flex gap-2 items-center">
              <HiOutlineUserCircle className="text-orange text-3xl"/>
              <div className="">
                <h2 className="font-medium">{contacts.name}</h2>
                <p className="text-sm">{contacts.email}</p>
              </div>
              </div>

              <div className="flex text-3xl">
                <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
                <IoMdTrash onClick={() =>deleteContacts(contacts.id)} className="text-orange cursor-pointer"/>
              </div>
            </div>
            <AddContact 
            contacts={contacts} 
            isOpen={isOpen} 
            onOpen={onOpen} 
            isUpdate 
            onClose={onClose}
            />
            </>
  )
}

export default ContactCard
