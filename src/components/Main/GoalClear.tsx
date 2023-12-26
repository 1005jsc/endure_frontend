import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import {
  convertJsDateToMysqlDatetime,
  convertJsDateToMysqlDatetime3,
} from '../../util/date/date';

type GoalClearProps = {
  id: number;
};

const GoalClear = ({ id }: GoalClearProps) => {
  const queryClient = useQueryClient();

  const { mutate: clearGoal } = useMutation(
    async (id: number) => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/goal/done`,
        {
          id: id,
          doneDate: convertJsDateToMysqlDatetime3(),
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['goalNow']);
        queryClient.invalidateQueries(['goalList']);
      },
      onError(error, variables, context) {
        console.log('목표 완료하기 api에 에러뜸 ');
      },
    }
  );

  const handleClick = () => {
    clearGoal(id);
  };

  return (
    <GoalClearDiv>
      <GoalClearButton onClick={handleClick}>목표 완료!</GoalClearButton>
    </GoalClearDiv>
  );
};

export default GoalClear;

const GoalClearDiv = styled.div`
  margin-bottom: 60px;
`;
const GoalClearButton = styled.button`
  display: block;
  margin: auto;
  background-color: transparent;
  border: 1px solid #b2b0b0;
  border-radius: 12px;
  padding: 8px 18px;
  font-size: 26px;
`;
