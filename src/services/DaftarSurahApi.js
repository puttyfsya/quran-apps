import axios from 'axios';

const BASE_URL = 'https://api.quran.gading.dev';

// Fungsi daftar surah
export const getSurahs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/surah`);
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
};

// Fungsi detail surah
export const getSurahDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/surah/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching surah detail:', error);
    throw error;
  }
};
