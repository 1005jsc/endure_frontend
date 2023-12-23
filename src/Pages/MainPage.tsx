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
      <EndureButton onClick={handleClick}>忍</EndureButton>

      <MessageDiv>
        <ClickNumSpan>
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
        </ClickNumSpan>
        <MessageSpan>{clickNumData?.message}</MessageSpan>
      </MessageDiv>
    </MainPageSec>
  );
};

export default MainPage;

const MainPageSec = styled.section`
  padding: 20px 40px;
  border: 1px solid black;
`;

const EndureButton = styled.button`
  display: block;

  background-color: transparent;
  border: 1px solid #b2b0b0;
  padding: 10px 35px;
  margin: auto;
  font-size: 200px;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClickNumSpan = styled.span`
  margin-bottom: 16px;
`;
const MessageSpan = styled.span`
  margin-bottom: 16px;
`;
