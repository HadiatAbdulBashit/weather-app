import axios from "axios";

const getSuggestLocation = async (searchKey) => {
  // API key default ini adalalh key personal yang hanya aktif sampai 12/Feb/2024, gunakan env variable untuk menggunakan key sendiri dengan menggunakan contoh .env.example
  const apiKey = process.env.API_KEY || "0cf0fea2677b42f899690517242901";
  const suggestUrl = `/v1/search.json?q=${
    searchKey ? searchKey : "auto:ip"
  }&key=${apiKey}`;

  // Mengambil saran lokasi ramalan cuaca berdasaykan key search
  return await axios.get(suggestUrl);
};

export default {
  getSuggestLocation,
};
