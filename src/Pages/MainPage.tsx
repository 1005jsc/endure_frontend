import axios from 'axios';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';

import GoalInput from '../components/Main/GoalInput';
import GoalClear from '../components/Main/GoalClear';
import { GoalType, ResponseType } from '../Types/types';

const MainPage = () => {
  const {
    data: { data: currentGoal, message } = {
      currentGoal: {} as GoalType,
      message: undefined,
    },
    isLoading,
    isError,
  } = useQuery<ResponseType<GoalType>>(['goalNow'], async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/goal`);

    return response.data;
  });

  const queryClient = useQueryClient();

  const { mutate: increaseClickNum } = useMutation(
    async (id: number) => {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER}/goal/endureNum`,
        { id }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['goalNow']);
      },
      onError(error, variables, context) {
        console.log('에러뜸 11');
      },
    }
  );

  const handleClick = () => {
    if (!currentGoal?.id) return;

    increaseClickNum(currentGoal.id);
  };

  if (isLoading) {
    return '로딩중...';
  }

  if (isError) {
    return '서버데이터를 불러오는데 에러가 났습니다';
  }

  return (
    <MainPageSec>
      {/* <GoalInput /> */}

      <EndureButton onClick={handleClick}>忍</EndureButton>

      <MessageDiv>
        <ClickNumSpan>
          {currentGoal?.endureNum}/
          {currentGoal?.endureNum
            ? currentGoal?.endureNum >= 0 && currentGoal?.endureNum <= 99
              ? 100
              : currentGoal?.endureNum >= 100 && currentGoal?.endureNum <= 199
              ? 200
              : currentGoal?.endureNum >= 200 && currentGoal?.endureNum <= 299
              ? 300
              : currentGoal?.endureNum >= 300 && currentGoal?.endureNum <= 399
              ? 400
              : currentGoal?.endureNum >= 400 && currentGoal?.endureNum <= 500
              ? 500
              : 100
            : 100}
        </ClickNumSpan>
        <MessageSpan>{message}</MessageSpan>
      </MessageDiv>
      {currentGoal?.id && <GoalClear id={currentGoal?.id} />}
    </MainPageSec>
  );
};

export default MainPage;

const MainPageSec = styled.section`
  padding: 40px 40px;
  /* border: 1px solid black; */
`;

const EndureButton = styled.button`
  display: block;
  background-color: transparent;
  border: 1px solid #b2b0b0;
  padding: 10px 35px;
  margin: auto;
  font-size: 200px;
  border-radius: 20px;
  margin-bottom: 40px;
`;

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
`;

const ClickNumSpan = styled.span`
  margin-bottom: 16px;
`;
const MessageSpan = styled.span`
  margin-bottom: 16px;
`;
