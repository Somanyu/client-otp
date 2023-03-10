import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import 'flowbite';
import Navbar from "./Navbar";


const ContactInfo = () => {
    const [formData, setFormData] = useState({});
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [contact, setContact] = useState(null);

    // value of the dynamic params from the current URL.
    let { id } = useParams();

/**
 * useEffect hook makes a GET request to the "http://localhost:3001/contact/info/:id" endpoint
 * to fetch user specific data.
 *
 * It uses the id passed as a parameter to fetch the user data.
 *
 * The hook uses the state setter function setContact to update the component's state with the returned data.
 * In case of an error, it sets the error message to the state using setError state.
 *
 * The hook also handles network errors and non-200 status codes and shows an appropriate message to the user.
 * 
 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://otp-server.onrender.com/contact/info/${id}`);

                const json = await res.json();
                if (res.status === 200) {
                    setContact(json)
                } else {
                    setError(json.message)
                }

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);


/**
 * handleSubmit is a callback function that handles the submit event of a form.
 * It makes a POST request to the "http://localhost:3001/contact/otp" endpoint to send an OTP.
 *
 * @param {Event} event - The event object that is passed to the function.
 * 
 * Upon successful submission, the function sets the returned data to the setData state.
 * In case of an error, it sets the error message to the setError state.
 * 
 * The function also handles network errors and non-200 status codes and shows an appropriate message to the user.
 * 
 */
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            async function fetchData() {
                const res = await fetch("https://otp-server.onrender.com/contact/otp", {
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
            setError(error)
        }
    }

    if (error) {
        return (
            <div className='bg-white dark:bg-gray-900'>
                <Navbar />
                <div className='w-1/2 m-auto px-5 py-52 font-inter'>
                    <div id="alert-border-2" class="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                        <svg class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div class="ml-3 text-sm font-medium">
                            {error} try again or return to <a class="font-semibold underline hover:no-underline" href="/">home</a>.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='bg-white dark:bg-gray-900'>
            <Navbar />
            {contact ? (
                <div>
                    <div className='flex justify-center mt-24 py-8'>
                        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex flex-col items-center pb-10 font-inter">
                                <img class="w-24 h-24 mb-3 mt-6 rounded-full" src={`https://api.dicebear.com/5.x/big-smile/svg?seed=${contact.firstName}`} alt={contact.firstName} />
                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{contact.firstName} {contact.lastName}</h5>
                                <span class="text-sm text-gray-500 dark:text-gray-400">{contact.phone}</span>
                                {data ? (
                                    <div id="alert-border-3" class="font-inter mt-7 transition ease-in-out m-auto max-w-sm flex p-4 text-green-700 bg-green-100 border-t-4 border-green-500 dark:text-green-400 dark:bg-green-100" role="alert">
                                        <div class="ml-3 text-sm font-medium">
                                            <span class="font-bold">{data.success}!</span> OTP sent to {contact.firstName}.
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div id="alert-border-1" class="font-inter my-3 max-w-sm m-auto flex p-4 mb-4 text-red-700 bg-red-100 border-t-4 border-red-500 dark:text-red-400 dark:bg-gray-800" role="alert">
                                        <div class="ml-3 text-sm font-medium">
                                            <span class="font-bold">{error}!</span> Try again.
                                        </div>
                                    </div>
                                ) :
                                    <div class="flex mt-4 space-x-3 md:mt-6 font-inter">
                                        <form className='my-3'>
                                            <label for="first_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Send OTP to {contact.firstName}</label>
                                            <div class="relative w-80 m-auto">
                                                <input type="text" name="text" value={`Hi ${contact.firstName}, your OTP is: XXXXXX`} id="search-dropdown" class="block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required />
                                                <input value={`${contact.phone}`} name="phone" type="text" className="bg-green-900 hidden" />
                                                <button onClick={handleSubmit} type="submit" class="absolute top-0 right-0 p-2 text-xl font-medium text-blue-700 hover:text-blue-800 dark:text-blue-600 dark:hover:text-blue-700"><BsFillArrowRightCircleFill /></button>
                                            </div>
                                        </form>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div className='flex justify-center mt-5'>
                    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                            <div class="flex items-center w-full space-x-2">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            </div>
                            <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            </div>
                            <div class="flex items-center mt-4 space-x-3">
                                <svg class="text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                                <div>
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                    <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                            </div>
                            <div class="flex items-center w-full space-x-2 max-w-[440px]">
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            </div>
                            <div class="flex items-center w-full space-x-2 max-w-[360px]">
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
}

export default ContactInfo;