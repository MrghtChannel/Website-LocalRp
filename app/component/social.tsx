import { FaTelegram, FaDiscord, FaYoutube } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si"; 

const socials = [
  { name: "TikTok", icon: <SiTiktok />, active: false, link: "https://www.tiktok.com/@localrp" },  
  { name: "Telegram", icon: <FaTelegram />, active: false, link: "https://t.me/locarp" },
  { name: "Discord", icon: <FaDiscord />, active: false, link: "https://discord.gg/TrBuYv86v5r" },
  { name: "YouTube", icon: <FaYoutube />, active: false, link: "https://www.youtube.com/channel/@localrp" },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-col items-center text-white p-8 sm:p-16 rounded-xl w-full">
      <span className="text-4xl sm:text-5xl font-semibold text-center">СТАВАЙ ЧАСТИНОЮ</span>
      <h2 className="text-5xl sm:text-7xl font-semibold text-blue-600 mb-6 sm:mb-8 text-center">Нашого Ком'юніті</h2>
      <p className="text-gray-400 mt-4 text-lg sm:text-xl text-center">
        Дізнавайтесь всі новини серед перших, станьте частиною найбільшого ком’юніті та відчуйте недосяжний рівень разом з LOCALRP!
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mt-10 w-full max-w-5xl">
        {socials.map((social, index) => (
          <a 
            key={index} 
            href={social.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center p-6 sm:p-16 rounded-lg border border-gray-500 transition-all duration-300 w-full sm:w-1/4 text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-2xl"
          >
            <div className="text-6xl sm:text-9xl transition-transform duration-300 group-hover:scale-125 relative">
              <div className="absolute inset-0 text-transparent -webkit-text-stroke-2 -webkit-text-stroke-white z-0">
                {social.icon}
              </div>
              <div className="relative z-10 text-current">{social.icon}</div>
            </div>
            <span className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold relative">
              <span className="absolute inset-0 text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white z-0">
                {social.name}
              </span>
              <span className="relative z-10">{social.name}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
