import styled from 'styled-components';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import KeyDetector from '../../hooks/KeyDetector';
import { GoalType } from '../../Types/types';

type GoalInputProps = {
  id: number;
  goalName: GoalType['goalName'];
};

const GoalInput = ({ id, goalName }: GoalInputProps) => {
  const [newGoal, setNewGoal] = useState<GoalType['goalName']>('');

  useEffect(() => {
    setNewGoal(goalName);
  }, [goalName]);

  const queryClient = useQueryClient();

  const { mutate: setGoal } = useMutation(
    async (newGoalName: GoalType['goalName']) => {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER}/goal/name`,
        {
          id,
          goalName: newGoalName,
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['goalNow']);
      },
      onError(error, variables, context) {
        console.log('목표 보내기 api에 에러뜸 ');
      },
    }
  );

  const handleGoalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewGoal(e.target.value);
  };

  const handleBlur = () => {
    if (newGoal !== goalName) setGoal(newGoal);
  };

  const handleKeyPress = (key: any) => {
    if (key === 'Enter') {
      if (newGoal !== goalName) setGoal(newGoal);
    }
  };

  return (
    <GoalInputDiv>
      <GoalTitleSpan>목표 : </GoalTitleSpan>
      <GoalInputInput
        onBlur={handleBlur}
        onChange={handleGoalChange}
        type="text"
        value={newGoal ? newGoal : ''}
        maxLength={99}
      />
      <KeyDetector sendKeyValue={handleKeyPress} />
    </GoalInputDiv>
  );
};

export default GoalInput;

const GoalInputDiv = styled.div`
  margin-bottom: 30px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding: 20px;
`;
const GoalTitleSpan = styled.span`
  width: 40px;
`;

const GoalInputInput = styled.input`
  border: none;
  /* border: 1px solid black; */
  /* line-height: 22px; */
  margin-left: 20px;
  padding: 12px 40px;
  padding-left: 8px;
  font-size: 16px;
  /* &:focus {
    outline: none;
  } */
  flex: 1;
`;
