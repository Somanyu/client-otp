// {data ? (

//     <div id="alert-border-3" class="transition ease-in-out m-auto max-w-sm flex p-4 mb-4 text-green-700 bg-green-100 border-t-4 border-green-500 dark:text-green-400 dark:bg-gray-800" role="alert">
//         <div class="ml-3 text-sm font-medium">
//             <span class="font-bold">{data.success}!</span> OTP sent to {contact.firstName}.
//         </div>
//     </div>
// ) : error ? (
//     <div id="alert-border-1" class="max-w-sm m-auto flex p-4 mb-4 text-red-700 bg-red-100 border-t-4 border-red-500 dark:text-red-400 dark:bg-gray-800" role="alert">
//         <div class="ml-3 text-sm font-medium">
//             <span class="font-bold">{error}!</span> Try again.
//         </div>
//     </div>
// ) :

//     <form class="space-y-6" action="#">
//         <div>
//             <input value={`Hi ${contact.firstName}, your OTP is: ${random}`} type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
//             <input value={`${contact.phone}`} name="phone" type="hidden" />
//         </div>
//         <button onClick={handleSubmit} type="submit" class="max-w-sm m-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send text</button>
//     </form>
// }