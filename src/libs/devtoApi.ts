import axios from 'axios';

export const fetchData = async () => {
  const data = await axios.get('https://dev.to/api/articles');
  console.log(data);
  return data;
}