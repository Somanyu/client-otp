import { useState, useEffect } from 'react';

function SecondMenu() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/contact/getlist')
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json()
            })
            .then(data => setContacts(data))
            .catch(err => setError(err.message));
    }, []);

    useEffect(() => {
        if (reload) {
            window.location.reload();
        }
    }, [reload]);

    if (error) {
        return (
            <>
                <div className='p-5 font-inter'>
                    <div id="alert-border-2" class="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                        <svg class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div class="ml-3 text-sm font-medium">
                            {error}. Kindly <button onClick={() => setReload(true)} class="font-semibold underline hover:no-underline">reload</button> and try again or return to <a class="font-semibold underline hover:no-underline" href="/">home</a>.
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <h1 className="text-3xl font-bold text-black text-center font-karla p-4">
                Message List
            </h1>

            <div className='p-5'>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="font-karla text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Avatar
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    OTP
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => (

                                <tr key={contact.name} class="bg-white border-b font-inter dark:bg-gray-900 dark:border-gray-700">
                                    <td class="px-6 py-4">
                                        <img class="w-10 h-10 rounded-full" src={`https://api.dicebear.com/5.x/big-smile/svg?seed=${contact.name}`} alt={contact.name} />
                                    </td>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {contact.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {contact.OTP}
                                    </td>
                                    <td class="px-6 py-4">
                                        {contact.date}
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

export default SecondMenu;