import Image from "next/image";
import { FaDownload, FaSteam } from "react-icons/fa";
import { SiRockstargames, SiEpicgames } from "react-icons/si";
import { useState } from "react";

export default function Home() {
  const [showAlert, setShowAlert] = useState(false);

  const handleCopyIP = () => {
    navigator.clipboard.writeText("s1.localrp.com.ua");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div
      id="how-to-play"
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fon.png')" }}
    >
      <div className="mt-20 text-center mb-8">
        <span className="text-white text-4xl md:text-5xl font-semibold">Як почати грати?</span>
        <h2 className="text-5xl md:text-7xl font-semibold text-blue-600 mb-4">Все просто!</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl text-center">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center bg-opacity-80">
          <h2 className="text-xl font-semibold mb-4">Крок 1</h2>
          <h3 className="text-2xl font-bold mb-2">Встановіть GTA 5</h3>
          <p className="text-gray-400">Купіть і/або встановіть ліцензійну GTA 5</p>
          <p className="text-gray-400">Підійде будь-яка версія гри</p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/"
              target="_blank"
              className="bg-gray-700 p-3 rounded-lg text-white text-3xl hover:bg-blue-600 transition flex items-center justify-center"
            >
              <FaSteam />
            </a>
            <a
              href="https://store.epicgames.com/en-US/p/grand-theft-auto-v"
              target="_blank"
              className="bg-gray-700 p-3 rounded-lg text-white text-3xl hover:bg-black transition flex items-center justify-center"
            >
              <SiEpicgames />
            </a>
            <a
              href="https://www.rockstargames.com/gta-v"
              target="_blank"
              className="bg-gray-700 p-3 rounded-lg text-white text-3xl hover:bg-yellow-500 transition flex items-center justify-center"
            >
              <SiRockstargames />
            </a>
          </div>
          <div className="mt-4">
            <Image src="/game-install-logo.webp" alt="GTA 5" width={180} height={180} />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center bg-opacity-80">
          <h2 className="text-xl font-semibold mb-4">Крок 2</h2>
          <h3 className="text-2xl font-bold mb-2">Встановіть Rage MP</h3>
          <p className="text-gray-400">Далі вам потрібно буде скачати та встановити Rage MP. Це безкоштовно.</p>
          <div className="flex justify-center mt-12">
            <Image src="/RageLogo.png" alt="Rage MP" width={180} height={180} />
          </div>
          <button className="mt-auto w-full px-8 py-4 bg-[#4554EE] text-black rounded-xl font-semibold hover:bg-blue-600 transition-shadow shadow-lg text-lg flex items-center justify-center gap-2">
            <FaDownload />
            <a href="/RAGEMultiplayer_Setup.exe" download className="text-black">
              <span>Завантажити</span>
            </a>
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center bg-opacity-80">
          <h2 className="text-xl font-semibold mb-4">Крок 3</h2>
          <h3 className="text-2xl font-bold mb-2">Відкрийте Rage MP</h3>
          <p className="text-gray-400">І знайдіть нас у списку, зазвичай ми на самому верху, не доведеться довго шукати.</p>
          <button
            onClick={handleCopyIP}
            className="mt-auto w-full px-8 py-4 bg-[#4554EE] text-black rounded-xl font-semibold hover:bg-blue-600 transition-shadow shadow-lg text-lg flex items-center justify-center gap-2"
          >
            <FaDownload /> <span>s1.localrp.com.ua</span>
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="fixed top-4 right-4 z-50 rounded-xl border border-gray-700 bg-gray-800 text-white p-4 shadow-xl animate-fadeIn">
          <div className="flex items-start gap-4">
            <span className="text-green-500">✓</span>

            <div className="flex-1">
              <strong className="block font-medium">IP скопійовано!</strong>
              <p className="mt-1 text-sm">s1.localrp.com.ua скопійовано в буфер обміну.</p>
            </div>

            <button onClick={() => setShowAlert(false)} className="text-gray-400 hover:text-gray-300">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
   