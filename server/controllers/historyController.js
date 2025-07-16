import HistoryData from '../models/HistoryData.js';


export const saveHistorySnapshot = async (req, res) => {
  try {
    const coinsSnapshot = req.body;
    if (!Array.isArray(coinsSnapshot)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    await HistoryData.insertMany(coinsSnapshot);
    res.status(201).json({ message: 'History snapshot saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving history', error: err.message });
  }
};


export const getCoinHistory = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await HistoryData.find({ coinId }).sort({ timestamp: -1 });

    if (!history.length) return res.status(404).json({ message: 'No history found for this coin' });

    res.status(200).json({ message: 'History fetched successfully', data: history });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history', error: err.message });
  }
};
