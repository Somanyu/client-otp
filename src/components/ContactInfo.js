import contacts from '../json/contacts.json';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import 'flowbite';


const ContactInfo = () => {
    const [formData, setFormData] = useState({});
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [contact, setContact] = useState(null);

    let { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3001/contact/info/${id}`)
            .then(res => res.json())
            .then(data => setContact(data))
            .catch(error => console.log(error));
    }, [id]);
    // const contact = contacts.find(contact => contact.id === parseInt(id));

    const random = Math.floor(100000 + Math.random() * 900000);


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            async function fetchData() {
                const res = await fetch("http://localhost:3001/contact/otp", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                const json = await res.json();
                if (res.status === 200) {
                    setData(json)
                } else {
                    setError(json.message)
                }
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {contact ? (
                <div>
                    <div className='flex justify-center mt-5'>
                        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex flex-col items-center pb-10">
                                <img class="w-24 h-24 mb-3 mt-6 rounded-full" src={`https://api.dicebear.com/5.x/big-smile/svg?seed=${contact.firstName}`} alt={contact.firstName} />
                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{contact.firstName} {contact.lastName}</h5>
                                <span class="text-sm text-gray-500 dark:text-gray-400">{contact.phone}</span>
                                <div class="flex mt-4 space-x-3 md:mt-6">
                                    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                        Send
                                    </button>
                                    <Link to="/firstmenu" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                        <div class="relative w-full h-full max-w-md md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="px-6 py-6 lg:px-8">
                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Send OTP to {contact.firstName} {contact.lastName}</h3>
                                    {data ? (

                                        <div id="alert-border-3" class="transition ease-in-out m-auto max-w-sm flex p-4 mb-4 text-green-700 bg-green-100 border-t-4 border-green-500 dark:text-green-400 dark:bg-gray-800" role="alert">
                                            <div class="ml-3 text-sm font-medium">
                                                <span class="font-bold">{data.success}!</span> OTP sent to {contact.firstName}.
                                            </div>
                                        </div>
                                    ) : error ? (
                                        <div id="alert-border-1" class="max-w-sm m-auto flex p-4 mb-4 text-red-700 bg-red-100 border-t-4 border-red-500 dark:text-red-400 dark:bg-gray-800" role="alert">
                                            <div class="ml-3 text-sm font-medium">
                                                <span class="font-bold">{error}!</span> Try again.
                                            </div>
                                        </div>
                                    ) :

                                        <form class="space-y-6" action="#">
                                            <div>
                                                <input value={`Hi ${contact.firstName}, your OTP is: ${random}`} type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                <input value={`${contact.phone}`} name="phone" type="hidden" />
                                            </div>
                                            <button onClick={handleSubmit} type="submit" class="max-w-sm m-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send text</button>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div>Loading....</div>
            )
            }
        </>
    );
}

export default ContactInfo;