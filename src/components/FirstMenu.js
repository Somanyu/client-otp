/* eslint-disable no-unused-vars */
import contacts from '../json/contacts.json';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


function FirstMenu() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/contact')
          .then(res => res.json())
          .then(data => setContacts(data));
      }, []);
      
    return (
        <>
            <h1 className="text-3xl font-bold text-black text-center">
                Contact Info
            </h1>

            <div className='p-5'>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Last Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => (

                                <tr key={contact.id} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {contact.id}
                                    </th>
                                    <td class="px-6 py-4">
                                        {contact.firstName}
                                    </td>
                                    <td class="px-6 py-4">
                                        {contact.lastName}
                                    </td>
                                    <td class="px-6 py-4">
                                        {contact.phone}
                                    </td>
                                    <td class="px-6 py-4">
                                        {/* <Link to={`/info/${contact.id}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show</Link> */}
                                        <a href={`/info/${contact.id}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show</a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

export default FirstMenu;