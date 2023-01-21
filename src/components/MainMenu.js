import { Link } from "react-router-dom";

function MainMenu() {
    return (
        <>
            <h1 className="text-3xl font-bold underline text-red-700">
                Main Menu
            </h1>
            <Link to="/firstmenu">First Menu</Link>
            <Link to="/secondmenu">Second Menu</Link>
        </>
    );
}

export default MainMenu;