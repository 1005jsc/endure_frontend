import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';

const GoalClear = () => {
  const queryClient = useQueryClient();

  const { mutate: clearGoal } = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/goal/done`
      );

      return response.data;
    },
    {
      onSuccess: () => {
        console.log('잘 됬으');
        queryClient.invalidateQueries(['clickNum']);
        queryClient.invalidateQueries(['goal']);
      },
      onError(error, variables, context) {
        console.log('목표 완료하기 api에 에러뜸 ');
      },
    }
  );

  const handleClick = () => {
    clearGoal();
  };

  return (
    <GoalClearDiv>
      <GoalClearButton onClick={handleClick}>목표 완료!</GoalClearButton>
    </GoalClearDiv>
  );
};

export default GoalClear;

const GoalClearDiv = styled.div``;
const GoalClearButton = styled.button`
  display: block;
  margin: auto;
  background-color: transparent;
  border: 1px solid #b2b0b0;
  border-radius: 12px;
  padding: 8px 18px;
  font-size: 26px;
`;
