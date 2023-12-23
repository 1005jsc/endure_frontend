import axios from 'axios';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { ClickNumDataType } from '../Types/types';

const MainPage = () => {
  const {
    data: clickNumData,
    isLoading,
    isError,
  } = useQuery<ClickNumDataType>(['getTodos'], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_LOCAL}/clickNum`
    );

    return response.data;
  });

  const queryClient = useQueryClient();
  const { mutate: increaseClickNum } = useMutation(
    async () => {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_LOCAL}/clickNum`
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getTodos']);
      },
      onError(error, variables, context) {
        console.log('에러뜸 11');
      },
    }
  );

  const handleClick = () => {
    increaseClickNum();
  };

  if (isLoading) {
    return '로딩중...';
  }

  if (isError) {
    return '서버데이터를 불러오는데 에러가 났습니다';
  }

  return (
    <MainPageSec>
      <div>
        <p>
          {clickNumData?.currentNum}/
          {clickNumData?.currentNum
            ? clickNumData?.currentNum >= 0 && clickNumData?.currentNum <= 99
              ? 100
              : clickNumData?.currentNum >= 100 &&
                clickNumData?.currentNum <= 199
              ? 200
              : clickNumData?.currentNum >= 200 &&
                clickNumData?.currentNum <= 299
              ? 300
              : clickNumData?.currentNum >= 300 &&
                clickNumData?.currentNum <= 399
              ? 400
              : clickNumData?.currentNum >= 400 &&
                clickNumData?.currentNum <= 500
              ? 500
              : 100
            : 100}
        </p>
        <p>{clickNumData?.message}</p>

        <button onClick={handleClick}>참을인 1번 누르기</button>
      </div>
    </MainPageSec>
  );
};

export default MainPage;

const MainPageSec = styled.section`
  padding: 20px 40px;
`;
