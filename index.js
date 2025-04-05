
import React, { useState } from 'react';
import '../styles/globals.css';

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [slotResult, setSlotResult] = useState("");
  const [minesResults, setMinesResults] = useState([]);
  const [aviatorCoeff, setAviatorCoeff] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [paid, setPaid] = useState(false);

  const checkPayment = async () => {
    if (!transactionId) return alert("Введите ID транзакции!");
    try {
      const res = await fetch(`/api/check?tx=${transactionId}`);
      const data = await res.json();
      if (data.success) {
        setPaid(true);
        setBalance(1000);
        alert("✅ Оплата подтверждена!");
      } else {
        alert("❌ Оплата не найдена. Проверьте ID.");
      }
    } catch (e) {
      alert("Ошибка при проверке оплаты");
    }
  };

  const playSlots = () => {
    if (!paid) return alert("💸 Пополните баланс через @send!");
    const items = ["🍒", "🍋", "💎", "💰"];
    const result = Array(3).fill(null).map(() => items[Math.floor(Math.random() * items.length)]);
    setSlotResult(result.join(" "));
    if (new Set(result).size === 1) setBalance(prev => prev + 500);
    else setBalance(prev => prev - 100);
  };

  const playMines = () => {
    if (!paid) return alert("💸 Пополните баланс через @send!");
    const win = Math.random() > 0.3;
    const next = [...minesResults, win ? "✅" : "💣"];
    setMinesResults(next.slice(-10));
    setBalance(prev => prev + (win ? 300 : -200));
  };

  const playAviator = () => {
    if (!paid) return alert("💸 Пополните баланс через @send!");
    const coeff = (Math.random() * 3 + 1).toFixed(2);
    setAviatorCoeff(coeff);
    setBalance(prev => prev + parseFloat(coeff) * 100);
  };

  return (
    <main>
      <h1>🎰 Mini Казино 1Win Style</h1>
      <p>💰 Баланс: {balance.toFixed(0)}₽</p>

      {!paid && (
        <div style={{ marginBottom: 20 }}>
          <p>⚠️ Для игры нужно пополнить баланс</p>
          <a href="https://t.me/send" target="_blank">
            <button>Пополнить через @send</button>
          </a>
          <br />
          <input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Введи ID транзакции" />
          <button onClick={checkPayment}>Проверить оплату</button>
        </div>
      )}

      <div>
        <button onClick={playSlots}>Играть в Слоты 🎰</button>
        <p>{slotResult}</p>
      </div>

      <div>
        <button onClick={playMines}>Сигнал Мины 💣</button>
        <div>{minesResults.map((r, i) => <span key={i}>{r} </span>)}</div>
      </div>

      <div>
        <button onClick={playAviator}>Запустить Авиатор ✈️</button>
        <p>{aviatorCoeff && `Коэф.: x${aviatorCoeff}`}</p>
      </div>

      <footer>
        💸 Пополнение через <a href="https://t.me/send" target="_blank" style={{color:'#ffcc00'}}>@send</a>
      </footer>
    </main>
  );
}
