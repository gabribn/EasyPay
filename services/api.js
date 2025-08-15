import { API_BASE_URL } from '@env';

if (!API_BASE_URL) {
  console.error("A variável de ambiente API_BASE_URL não está definida no arquivo .env");
}

export default API_BASE_URL;