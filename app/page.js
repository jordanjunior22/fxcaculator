"use client";
import { useState } from 'react';
import Head from 'next/head';

const Home = () => {
  const [stopLoss, setStopLoss] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [accountSize, setAccountSize] = useState('');
  const [riskPerTrade, setRiskPerTrade] = useState('');

  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const sl = parseFloat(stopLoss);
    const entry = parseFloat(entryPrice);
    const tp = parseFloat(takeProfit);
    const risk = parseFloat(riskPerTrade);

    if (isNaN(sl) || isNaN(entry) || isNaN(tp) || isNaN(risk) || entry <= 0 || sl <= 0 || risk <= 0) {
      alert("Please enter valid positive numbers for all inputs.");
      return;
    }

    const riskPerShare = Math.abs(entry - sl);
    const positionSize = calculatePositionSize(riskPerTrade);
    const lotSize = calculateLotSize(positionSize);
    const totalRisk = lotSize * riskPerShare;
    const profitPerShare = Math.abs(entry - tp);
    const totalProfit = lotSize * profitPerShare;
    const riskRewardRatio = profitPerShare / riskPerShare;

    setResults({
      positionSize: positionSize.toFixed(0),
      lotSize: lotSize.toFixed(0),
      totalRisk: totalRisk.toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      riskRewardRatio: riskRewardRatio.toFixed(2),
    });
  };

  const calculatePositionSize = (riskPerTrade) => {
    return parseFloat(riskPerTrade);
  };

  const calculateLotSize = (positionSize) => {
    const positionSizeStr = positionSize.toString();
    const trailingZeros = positionSizeStr.length - (positionSizeStr.indexOf('.') + 1 || positionSizeStr.length);
    const divisor = Math.pow(10, trailingZeros);
    return positionSize / divisor;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }, (err) => {
      alert("Failed to copy text: " + err);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Forex Risk Calculator</title>
        <meta name="description" content="Forex Risk Calculator Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Forex Risk Calculator</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Stop Loss (SL):</label>
            <div className="flex">
              <input
                type="number"
                step="0.01"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => copyToClipboard(stopLoss)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Entry Price:</label>
            <div className="flex">
              <input
                type="number"
                step="0.01"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => copyToClipboard(entryPrice)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Take Profit (TP):</label>
            <div className="flex">
              <input
                type="number"
                step="0.01"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => copyToClipboard(takeProfit)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Account Size:</label>
            <div className="flex">
              <input
                type="number"
                step="0.01"
                value={accountSize}
                onChange={(e) => setAccountSize(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => copyToClipboard(accountSize)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Risk per Trade:</label>
            <div className="flex">
              <input
                type="number"
                step="0.01"
                value={riskPerTrade}
                onChange={(e) => setRiskPerTrade(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => copyToClipboard(riskPerTrade)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Calculate
          </button>
        </form>

        {results && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Results</h2>
            <div className="flex items-center">
              <p className="text-lg text-gray-700">Position Size: {results.positionSize} shares</p>
              <button
                type="button"
                onClick={() => copyToClipboard(results.positionSize)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center mt-2">
              <p className="text-lg text-gray-700">Lot Size: {results.lotSize} shares</p>
              <button
                type="button"
                onClick={() => copyToClipboard(results.lotSize)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center mt-2">
              <p className="text-lg text-gray-700">Total Risk: ${results.totalRisk}</p>
              <button
                type="button"
                onClick={() => copyToClipboard(results.totalRisk)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center mt-2">
              <p className="text-lg text-gray-700">Total Potential Profit: ${results.totalProfit}</p>
              <button
                type="button"
                onClick={() => copyToClipboard(results.totalProfit)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center mt-2">
              <p className="text-lg text-gray-700">Risk-Reward Ratio: {results.riskRewardRatio}</p>
              <button
                type="button"
                onClick={() => copyToClipboard(results.riskRewardRatio)}
                className="ml-2 py-2 px-4 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 text-gray-600 text-center">
        <p className="text-sm">Created by <a href="https://yourwebsite.com" className="text-black underline" target="_blank" rel="noopener noreferrer">Jordan Junior</a></p>
      </footer>
    </div>
  );
};

export default Home;
