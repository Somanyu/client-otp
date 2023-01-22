function Footer() {
    return (
        <div class="bg-white dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-900 font-inter lg:w-1/2 md:w-3/4 sm:w-3/4 m-auto pt-28 pb-7 lg:pb-8">

                <footer class="p-4 bg-white rounded-lg shadow md:flex sm:flex md:items-center sm:items-center md:justify-between sm:justify-between md:p-6 dark:bg-gray-800">
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Made with ♥️ by <a href="https://www.linkedin.com/in/somanyusamal/" class="hover:underline">Somanyu</a>.
                    </span>
                    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="/" class="mr-4 hover:underline md:mr-6 ">Github</a>
                        </li>
                        <li>
                            <a href="/" class="mr-4 hover:underline md:mr-6">Twitter</a>
                        </li>
                        <li>
                            <a href="/" class="mr-4 hover:underline md:mr-6">Portfolio</a>
                        </li>
                        <li>
                            <a href="/" class="hover:underline">Hackerank</a>
                        </li>
                    </ul>
                </footer>

            </div>
        </div>
    );
}

export default Footer;