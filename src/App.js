import MainMenu from "./components/MainMenu";
import FirstMenu from "./components/FirstMenu";
import SecondMenu from "./components/SecondMenu";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/firstmenu" element={<FirstMenu />} />
          <Route path="/secondmenu" element={<SecondMenu />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}