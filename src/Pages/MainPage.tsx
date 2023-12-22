import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const MainPage = () => {
  const { data } = useQuery<any>('getTodos', async () => {
    const response = await axios.get(`http://localhost:8080/clickNum`);

    return response.data;
  });

  return (
    <>
      <div>
        MainPage
        <p>{data.currentNum}</p>
        <p>{data.message}</p>
      </div>
    </>
  );
};

export default MainPage;
