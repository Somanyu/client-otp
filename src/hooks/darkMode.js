import { useEffect, useState } from "react";

/**
 * useLocalStorage is a custom Hook that allows a component to store and retrieve values in the browser's local storage.
 *
 * It takes in two arguments, key and initialValue. The key is used to identify the value in local storage,
 * and the initialValue is used as the default value in case the key is not found in local storage.
 *
 * The Hook returns an array containing the stored value, and a function to update the stored value.
 *
 * The Hook also includes error handling to catch any errors that may occur when interacting with local storage.
*/
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    })

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    }

    return [storedValue, setValue]
}


/**
 * useDarkMode is a custom Hook that allows a component to enable and disable a dark mode theme.
 *
 * The Hook uses the useLocalStorage Hook to store the dark mode state in the browser's local storage.
 *
 * The Hook also includes error handling to catch any errors that may occur when interacting with local storage.
*/
const useDarkMode = () => {
    const[enabled, setEnabled] = useLocalStorage('dark-theme')
    const isEnabled = typeof enabledState === 'undefined' && enabled

    useEffect(() => {
      const className = 'dark'
      const bodyClass = window.document.body.classList

      isEnabled ? bodyClass.add(className) : bodyClass.remove(className)
    }, [enabled, isEnabled]);

    return [enabled, setEnabled]
    
}

export default useDarkMode