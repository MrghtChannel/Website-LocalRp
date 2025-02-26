import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const About = () => {
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await fetch('/api/server');
        const data = await response.json();

        if (data.players !== undefined) {
          setOnlinePlayers(data.players);
        } else {
          setError(data.error || "Помилка отримання даних");
        }
      } catch (err) {
        console.error("Помилка отримання даних:", err);
        setError("Помилка запиту");
      }
    };

    fetchServerData();
    const interval = setInterval(fetchServerData, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-screen py-16" style={{ backgroundImage: 'url(dsadsae21.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex flex-col items-center justify-center mb-8 px-4">
        <span className="text-white text-4xl md:text-5xl font-semibold text-center">Про нас</span>
        <h2 className="text-5xl md:text-7xl font-semibold text-blue-600 mb-4 text-center">Знайомтесь з нами!</h2>
      </div>
      <div className="w-full h-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full h-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
            <div className="pt-16 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
            <img className="rounded-xl object-cover w-full sm:w-auto" src="/gos.webp" alt="LocalRp - Український сервер" />
            </div>
            <img className="rounded-xl object-cover w-full sm:w-auto" src="/crime.png" alt="LocalRp - Український сервер" />
          </div>

          <div className="w-full flex-col justify-center lg:items-start items-center gap-8 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-6 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-2.5 flex">
                <h2 className="text-white text-4xl font-bold leading-normal lg:text-start text-center">
                  Реалістичний та захоплюючий геймплей
                </h2>
                <p className="text-gray-300 text-base font-normal leading-relaxed lg:text-start text-center">
                  LocalRp – це новий GTAV RP сервер, створений українцями для українців. Ми пропонуємо захоплюючий та реалістичний досвід гри у світі GTA 5, де кожен гравець може створити свою унікальну історію.
                </p>
              </div>

              <div className="w-full lg:justify-start justify-center items-center sm:gap-8 gap-4 inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                  <h3 className="text-white text-4xl font-bold leading-normal">
                    {onlinePlayers !== null ? onlinePlayers : error || 'Завантаження...'}
                  </h3>
                  <h6 className="text-gray-300 text-base font-normal leading-relaxed">Гравців онлайн</h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-white text-4xl font-bold leading-normal">100+</h4>
                  <h6 className="text-gray-300 text-base font-normal leading-relaxed">Активних ролей</h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-white text-4xl font-bold leading-normal">24/7</h4>
                  <h6 className="text-gray-300 text-base font-normal leading-relaxed">Доступність сервера</h6>
                </div>
              </div>
            </div>
            <a href="https://discord.gg/TrBuYv86v5" className="w-full">
          <button className="px-6 py-3 bg-[#4554EE] text-black rounded-xl font-semibold hover:bg-blue-600 transition-shadow shadow-lg text-lg flex items-center justify-center">
            <span className="px-1.5 text-sm font-medium leading-6">Приєднатися зараз</span>
            <FaArrowRight className="ml-2 text-black" />
          </button>
        </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;