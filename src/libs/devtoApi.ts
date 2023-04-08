import axios from 'axios';

export const fetchData = async () => {
  const { data } = await axios.get(`https://dev.to/api/articles?page=1&per_page=10&top=1`);
  return data;
}

export const fetchDataPerPage = async (page: string | undefined) => {
  const { data } = await axios.get(`https://dev.to/api/articles?page=${page}&per_page=10`);
  return data;
}

export const fetchDataWithTag = async (tag: string | undefined) => {
  const { data } = await axios.get(`https://dev.to/api/articles?&page=1&per_page=10&tag=${tag}`);
  
  return data;
}