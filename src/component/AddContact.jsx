import React from 'react'
import Modal from "./Modal"
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from "../config/firebase";
import { toast } from 'react-toastify';
import * as Yup from "yup";
const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
  });

const AddContact = ({isOpen,onClose,isUpdate,contacts}) => {

    const addContacts = async (contacts) =>{
             
        try {
            const contactsRef=collection(db,"contacts");
            await addDoc(contactsRef,contacts)
            onClose();
            toast.success("Contact Added Successfully")

        } catch (error) {
            console.log(error) 
        }
    }

    const updateContacts = async (contacts,id) =>{
             
        try {
            const contactsRef=doc(db,"contacts",id);
            await updateDoc(contactsRef,contacts)
            onClose();
            toast.success("Contact Updated Successfully")

        } catch (error) {
            console.log(error) 
        }
    }
  return (
    <div>
    <Modal isOpen={isOpen} onClose={onClose}>
        <Formik 
        validationSchema={contactSchemaValidation}
            initialValues={isUpdate ?{
                name:contacts.name,
                email:contacts.email,
            }:{
                name:"",
                email:"",
            }}
            onSubmit={(values) => {
                isUpdate? updateContacts(values,contacts.id):
                addContacts(values)
            }}
        >
            <Form className="flex flex-col">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Name</label>
                    <Field name="name" className="border h-10"/>
                    <div className="text-red-700 text-xs">
                    <ErrorMessage name="name"/>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <Field  name="email"className="border h-10"/>
                    <div className="text-red-700 text-xs ">
                    <ErrorMessage name="email"/>
                    </div>
                </div>
                <button type="submit" className="bg-orange px-3 py-1.5 mt-4 self-end">
                    
                  {isUpdate ? "update" : "add"}  Contacts</button>
            </Form>
        </Formik> 
    </Modal>
      
    </div>
  )
}

export default AddContact
