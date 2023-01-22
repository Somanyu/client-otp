import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import 'flowbite';
import Navbar from "./Navbar";


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

    // Generating 6 digit random OTP.
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
        <div className='bg-white dark:bg-gray-900'>
            <Navbar />
            {contact ? (
                <div>
                    <div className='flex justify-center mt-24 py-8'>
                        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            {/* <div>
                                <Link to="/firstmenu" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white hover:bg-gray-100  dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"><svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </Link>
                            </div> */}
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
                                        {/* <Link to="/firstmenu" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Back</Link> */}
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