import { FaGooglePay, FaApplePay, FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer 
      className="text-gray-400 bg-cover bg-center" 
      style={{ backgroundImage: "url('background-4.6c0bb12e.webp')" }}
    >
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 flex items-center">
            <a href="/" className="flex items-center">
              <img src="logo.png" className="h-16" alt="LocalRP Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white"></span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">Гравцям</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#how-to-play" className="hover:underline">Почати грати</a>
                </li>
                <li className="mb-4">
                  <a href="/donate" className="hover:underline">Поповнення рахунку</a>
                </li>
                <li className="mb-4">
                  <a href="https://forum.localrp.com.ua/" className="hover:underline">Форум</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">Важлива інформація</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="/Terms-of-use.pdf" className="hover:underline">Умови використання</a>
                </li>
                <li className="mb-4">
                  <a href="/User-Agreement.pdf" className="hover:underline">Угода користувача</a>
                </li>
                <li className="mb-4">
                  <a href="/Rules-of-payment.pdf" className="hover:underline">Правила оплати</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">Контакти</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://discord.com/invite/TrBuYv86v5" className="hover:underline">Канал підтримки в Discord</a>
                </li>
                <li className="mb-4">
                  <a href="mailto:help@local-rp.com" className="hover:underline">help@local-rp.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-700 sm:mx-auto lg:my-4" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2024-25 <a href="/" className="hover:underline">LocalRp</a>. All Rights Reserved.
          </span>
          <div className="flex mt-2 sm:justify-center sm:mt-0 space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaGooglePay className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaApplePay className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaCcVisa className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaCcMastercard className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaPaypal className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">
          LocalRp is not affiliated with or endorsed by Take-Two, Rockstar North Interactive, or any other rights holder.
          All the used trademarks belong to their respective owners.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
