import axios from 'axios';

const swrFetcher = (url: string) => axios(url).then(res => res.data);

export default swrFetcher;
