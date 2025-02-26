import { useState } from "react";
import { FaEnvelope, FaCoins } from "react-icons/fa";

const Donate = ({ closeModal }: { closeModal: () => void }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [termsChecked, setTermsChecked] = useState(false);
  const [contentAgreementChecked, setContentAgreementChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (parseFloat(value) < 22 && value !== "") {
      setErrorMessage("Сума повинна бути не менше 22 грн.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsChecked || !contentAgreementChecked) {
      setErrorMessage("Будь ласка, погодьтеся з умовами");
      return;
    }

    setLoading(true);

    try {
      const emailCheckRes = await fetch('/api/checkEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const emailCheckData = await emailCheckRes.json();

      if (!emailCheckData.exists) {
        setErrorMessage("Ця пошта не знайдена у системі");
        setLoading(false);
        return;
      }

      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount, paymentMethod }),
      });

      const data = await res.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        setErrorMessage(data.error || 'Не вдалося створити платіж');
      }
    } catch (error) {
      setErrorMessage('Сталася помилка. Спробуйте ще раз.');
    }

    setLoading(false);
  };

  const isButtonDisabled =
    (parseFloat(amount) < 22 || !termsChecked || !contentAgreementChecked) && amount !== "";

  return (
    <div className="min-h-screen flex items-center justify-center fixed inset-0 bg-black bg-opacity-50">
      <div className="bg-gray-900 text-white p-10 rounded-xl shadow-lg w-4/5 sm:w-1/2 md:w-1/3 relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-4xl text-white hover:text-gray-400">
          &times;
        </button>

        <h2 className="text-yellow-400 text-center font-bold text-xl mb-6">
          <FaCoins className="inline-block mr-2" /> Поповнення рахунку
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
              Пошта
            </label>
            <div className="flex items-center border border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-yellow-500">
              <FaEnvelope className="text-gray-400 mx-3" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-r focus:outline-none"
                placeholder="Пошта"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="amount" className="block text-sm text-gray-400 mb-2">
              Сума (грн)
            </label>
            <div className="flex items-center border border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-yellow-500">
              <FaCoins className="text-gray-400 mx-3" />
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="w-full p-3 bg-gray-800 text-white rounded-r focus:outline-none"
                placeholder="Сума (грн)"
                min="22"
              />
            </div>
            <div className="mt-2 text-blue-500 flex items-center">
              {amount && (
                <>
                  <FaCoins className="text-yellow-400 mr-2" />
                  <span>{Math.round(parseFloat(amount) * 1.2).toLocaleString()} lcCoin</span>
                </>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="payment-method" className="block text-sm text-gray-400 mb-2">
              Оберіть спосіб оплати
            </label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg"
            >
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
              <option value="сryptomus">Cryptomus</option>
            </select>
          </div>

          <div className="text-red-500 mb-4">{errorMessage}</div>

          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={termsChecked}
                onChange={() => setTermsChecked(!termsChecked)}
                className="mr-2 rounded-lg"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                Я ознайомився з умовами оферти
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="content-agreement"
                checked={contentAgreementChecked}
                onChange={() => setContentAgreementChecked(!contentAgreementChecked)}
                className="mr-2 rounded-lg"
              />
              <label htmlFor="content-agreement" className="text-sm text-gray-400">
                Я згоден активувати контент у своїй обліковій записі LocalRp, розуміючи, що після цього не зможу розірвати договір або отримати відшкодування.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-blue-500 text-white rounded-lg mt-4 transition-transform transform hover:scale-105 focus:outline-none ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isButtonDisabled || loading}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 8 8 8 8 0 0 1-8-8z"></path>
                </svg>
                Перевірка...
              </span>
            ) : (
              "Оплатити"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
