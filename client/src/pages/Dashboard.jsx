import { useEffect, useState } from 'react';
import API from '../services/Api';

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/coins');
      setCoins(res.data.data || res.data);
      setFilteredCoins(res.data.data || res.data);
    } catch (err) {
      console.error('Error fetching coins:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(value) ||
        coin.symbol.toLowerCase().includes(value)
    );
    setFilteredCoins(filtered);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">📊 Crypto Dashboard</h2>
          <button
            onClick={fetchCoins}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition"
          >
            Refresh 🔄
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="🔍 Search by Name or Symbol..."
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {loading ? (
          <p className="text-center text-gray-600">⏳ Loading Coins...</p>
        ) : filteredCoins.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCoins.map((coin) => (
              <div
                key={coin.coinId || coin.id}
                className="bg-gray-50 border p-4 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={coin.image || `https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/50`}
                    alt={coin.name}
                    className="w-8 h-8"
                  />
                  <h3 className="text-lg font-semibold">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-1">
                  💰 Price: <span className="font-bold">${coin.current_price || coin.price}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  📈 24h Change:{' '}
                  <span className={`${coin.change24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {coin.change24h ? coin.change24h.toFixed(2) : 0}%
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No coins match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
