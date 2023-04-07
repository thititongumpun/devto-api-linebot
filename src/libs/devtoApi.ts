import axios from 'axios';

export const fetchData = async () => {
  const { data } = await axios.get('https://dev.to/api/articles?page=1&per_page=10');
  
  return data;
}