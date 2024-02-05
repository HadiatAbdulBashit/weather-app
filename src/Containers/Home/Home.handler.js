import axios from "axios";

const getForecast = async (location) => {
  // API key default ini adalalh key personal yang hanya aktif sampai 12/Feb/2024, gunakan env variable untuk menggunakan key sendiri dengan menggunakan contoh .env.example
  const apiKey = process.env.API_KEY || "0cf0fea2677b42f899690517242901";
  const forecastUrl = `/v1/forecast.json?key=${apiKey}&q=${location}&days=6`;

  // Mengambil data ramalan cuaca saat ini dan 5 hari selanjutnya
  return await axios.get(forecastUrl);
};

export default {
  getForecast,
};
