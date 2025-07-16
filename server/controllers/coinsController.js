import axios from "axios"
import CurrentData from "../models/CurrentData.js";

export const getCoins = async (req, res) => {
  try {

    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
  params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 10, page: 1 }
});


    await CurrentData.deleteMany({});
    await CurrentData.insertMany(data.map(coin => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date()
    })));

    res.status(200).json({ message: 'Coins fetched successfully', data });
  } catch (err) {
    console.error('Error fetching coins:', err.response?.data || err.message);
    res.status(500).json({ message: 'Error fetching coins', error: err.message });
  }
};
