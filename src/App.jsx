import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './component/Navbar'
import {FiSearch} from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai"
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import {HiOutlineUserCircle} from "react-icons/hi"
import {RiEditCircleLine} from "react-icons/ri"
import {IoMdTrash} from "react-icons/io"
import ContactCard from './component/ContactCard';
import Modal from './component/Modal';
import AddContact from './component/AddContact';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './component/NotFoundContact';
const App = () => {

  const [contacts,setContacts]=useState([])
  const { isOpen, onClose, onOpen } = useDisclouse();
  
  useEffect(() => {
    const getContacts = async () =>{
      try {
        const contactsRef = collection(db,"contacts");
        const contactsSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef,(snapshot) =>{
          const contactLists = snapshot.docs.map((doc)=>{
            return {
              id:doc.id,
              ...doc.data()
            }
          });
          setContacts(contactLists);
          return contactLists;
        })

       
      } catch (error) {
        console.log(error)
      }
    }
    getContacts();
  },[])

  const  filterContacts =  (e) =>{
    const value= e.target.value;
    const contactsRef = collection(db,"contacts");
    // const contactsSnapshot = await getDocs(contactsRef);

    onSnapshot(contactsRef,(snapshot) =>{
      const contactLists = snapshot.docs.map((doc)=>{
        return {
          id:doc.id,
          ...doc.data()
        }
      });

      const filteredContacts = contactLists.filter(contacts =>
        contacts.name.toLowerCase().includes(value.toLowerCase()) )


      setContacts(filteredContacts);
      return filteredContacts;
    })

  }
  return (
    <>
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar/>
      <div className="flex">
      <div className="relative flex flex-grow items-center">
        <FiSearch className="text-white text-3xl absolute "/>
        <input onChange={filterContacts} type="text" name="" id="" className="bg-transparent border border-white rounded-md h-10  flex-grow text-white pl-9" placeholder='Search Contacts'/>
        
      </div>
      
        <AiFillPlusCircle onClick={onOpen} className='text-5xl text-white gap-2 cursor-pointer'/>
      
      </div>
      <div className="mt-3 flex flex-col gap-2 ">
        {
          contacts.length <= 0 ? <NotFoundContact/> : contacts.map((contacts) => (
            <ContactCard key={contacts.id}  contacts={contacts}/>
          ))
        }
      </div>
    </div>
    <AddContact onClose={onClose} isOpen={isOpen}/>
    <ToastContainer position='bottom-center'/>
    </>
  )
}

export default App

