import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import TopUpForm from "./donate";

export default function GTA5Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDonateModal = () => setIsDonateModalOpen(true); 
  const closeDonateModal = () => setIsDonateModalOpen(false);

  useEffect(() => {
    if (isModalOpen || isDonateModalOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isDonateModalOpen]);

  return (
    <div className="flex flex-col min-h-screen text-white relative">
      <video
        autoPlay
        loop
        muted
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        onError={() => alert("Не вдалося завантажити відео.")}
      >
        <source src="/bg.mp4" type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>

      <nav className="w-[95%] max-w-5xl mx-auto flex justify-between items-center p-3 relative z-10 bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-xl m-4">
        <div className="flex items-center space-x-2">
          <img src="/logo2.png" alt="Логотип" className="w-10 h-10 rounded-full" />
        </div>

        <ul className="hidden md:flex space-x-4 text-white">
          <a href="/">
            <li className="hover:text-blue-400 cursor-pointer transition-colors border-b-2 border-transparent hover:border-white">Головна</li>
          </a>
          <a href="#news">
            <li className="hover:text-blue-400 cursor-pointer transition-colors border-b-2 border-transparent hover:border-white">Новини</li>
          </a>
          <a href="#how-to-play">
            <li className="hover:text-blue-400 cursor-pointer transition-colors border-b-2 border-transparent hover:border-white">Як почати грати</li>
          </a>
          <a href="https://forum.localrp.com.ua">
            <li className="hover:text-blue-400 cursor-pointer transition-colors border-b-2 border-transparent hover:border-white">Форум</li>
          </a>
          <a href="https://wiki.localrp.com.ua">
            <li className="hover:text-blue-400 cursor-pointer transition-colors border-b-2 border-transparent hover:border-white">Вікі</li>
          </a>
          <li
            onClick={openDonateModal}
            className="hover:text-blue-400 cursor-pointer transition-colors border-b-2 border-transparent hover:border-white"
          >
            Донат
          </li>
        </ul>

        <div className="flex space-x-3">
          <a href="https://cabinet.localrp.com.ua">
            <button
              className="px-5 py-2 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-shadow shadow-lg flex items-center space-x-2 text-lg"
            >
              Кабінет →
            </button>
          </a>
        </div>
      </nav>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
        <a href="#how-to-play">
          <button className="px-6 py-3 bg-[#4554EE] text-black rounded-xl font-semibold hover:bg-blue-600 transition-shadow shadow-lg text-lg">
            Почати гру
          </button>
        </a>
        <a href="https://cabinet.localrp.com.ua">
          <button
            className="px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-shadow shadow-lg flex items-center space-x-2 text-lg"
          >
            <FaSignInAlt />
            <span>Авторизуватися</span>
          </button>
        </a>
      </div>

      {isDonateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="w-full h-full flex items-center justify-center">
            <TopUpForm closeModal={closeDonateModal} /> 
          </div>
        </div>
      )}
    </div>
  );
}
