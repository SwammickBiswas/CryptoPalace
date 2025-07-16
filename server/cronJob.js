import cron from 'node-cron';
import axios from 'axios';
import HistoryData from './models/HistoryData.js';

cron.schedule('0 * * * *', async () => {   
  console.log('Cron Job Running — Fetching and Saving Snapshot');

  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
      },
    });

    console.log(`Fetched ${data.length} coins from CoinGecko`);

    const historyRecords = data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date(),
    }));

    const insertResult = await HistoryData.insertMany(historyRecords);
    console.log(`Inserted ${insertResult.length} records into HistoryData`);
  } catch (err) {
    console.error('Error in Cron Job:', err.response?.data || err.message);
  }
});
