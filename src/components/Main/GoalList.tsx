import { useQuery } from 'react-query';
import { GoalType, ResponseType } from '../../Types/types';
import axios from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';
import { toStringByFormatting } from '../../util/date/date';

type GoalListProps = {};

const WhenTableChangeNum = 8;

const GoalList = ({}: GoalListProps) => {
  const {
    data: { data: goalList } = { data: [] as GoalType[] },
    isLoading,
    isError,
  } = useQuery<ResponseType<GoalType[]>>(['goalList'], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/goal/list`
    );

    return response.data;
  });

  const isScrollbarShow =
    goalList.length && goalList.length >= WhenTableChangeNum;

  return (
    <GoalListDiv>
      <TitleDiv isscrollbarshow={isScrollbarShow ? 1 : 0}>
        <CreatedDateTitleDiv>
          <CreatedDateTitle>시작 날짜</CreatedDateTitle>
        </CreatedDateTitleDiv>

        <GoalNameTitleDiv>
          <GoalNameTitle>목표이름</GoalNameTitle>
        </GoalNameTitleDiv>

        <DoneTitleDiv>
          <DoneTitle>진행상황</DoneTitle>
        </DoneTitleDiv>

        <EndureNumTitleDiv>
          <EndureNumTitle>참을忍 갯수</EndureNumTitle>
        </EndureNumTitleDiv>

        <DoneDateTitleDiv>
          <DoneDateTitle>완료 날짜</DoneDateTitle>
        </DoneDateTitleDiv>
      </TitleDiv>

      <ContainerDiv>
        {/* <ContainerDiv> */}
        {goalList.map((goal, i) => {
          return (
            <SmallDiv key={goal.id} removebordertop={i === 0 ? 1 : 0}>
              <CreatedDateDiv>
                <CreatedDateSpan>{goal.createdDate}</CreatedDateSpan>
              </CreatedDateDiv>
              <GoalNameDiv>
                <GoalNameSpan>{goal.goalName}</GoalNameSpan>
              </GoalNameDiv>
              <DoneDiv>
                <DoneSpan>{goal.doneDate ? '완료됨' : '진행중'}</DoneSpan>
              </DoneDiv>
              <EndureNumDiv>
                <EndureNumSpan>{goal.endureNum}</EndureNumSpan>
              </EndureNumDiv>
              <DoneDateDiv>
                <DoneDateSpan>{goal.doneDate}</DoneDateSpan>
              </DoneDateDiv>
            </SmallDiv>
          );
        })}
      </ContainerDiv>
    </GoalListDiv>
  );
};

export default GoalList;

const GoalListDiv = styled.div`
  border: 1px solid black;
  margin: auto;
  width: 80%;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  position: relative;
`;

const TitleDiv = styled.div<{ isscrollbarshow: number }>`
  display: flex;
  align-items: center;

  /* ${({ isscrollbarshow }) => {
    if (isscrollbarshow === 1) {
      return `padding-right: 15px;`;
    }
  }} */
  padding-right: ${({ isscrollbarshow }) =>
    isscrollbarshow === 1 ? '15px' : '0'};
  border-bottom: 1px solid black;
`;

const CommonTitleDiv = styled.div`
  flex: 1;
  display: flex;

  justify-content: center;
  padding: 12px;
  border-right: 1px solid black;
`;

const GoalNameTitleDiv = styled(CommonTitleDiv)``;
const CreatedDateTitleDiv = styled(CommonTitleDiv)``;
const DoneTitleDiv = styled(CommonTitleDiv)``;
const EndureNumTitleDiv = styled(CommonTitleDiv)``;
const DoneDateTitleDiv = styled(CommonTitleDiv)`
  border-right: none;
`;

const CommonTitleSpan = styled.span``;

const CreatedDateTitle = styled(CommonTitleSpan)``;
const GoalNameTitle = styled(CommonTitleSpan)``;
const DoneTitle = styled(CommonTitleSpan)``;
const EndureNumTitle = styled(CommonTitleSpan)``;
const DoneDateTitle = styled(CommonTitleSpan)``;

// 데이터 쪽
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;

  overflow: auto;
  max-height: 300px;
`;

const SmallDiv = styled.div<{ removebordertop: number }>`
  display: flex;
  align-items: center;
  height: 46px;
  border-top: 1px solid black;

  ${({ removebordertop }) => {
    if (removebordertop === 1) {
      return `border-top: none;`;
    }
  }}
`;

const CommonDiv = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  /* border: 1px solid black; */
  border-right: 1px solid black;
  height: 100%;
`;

const CreatedDateDiv = styled(CommonDiv)``;
const GoalNameDiv = styled(CommonDiv)``;
const DoneDiv = styled(CommonDiv)``;
const EndureNumDiv = styled(CommonDiv)``;
const DoneDateDiv = styled(CommonDiv)`
  border-right: none;
`;

const CommonSpan = styled.span``;

const CreatedDateSpan = styled(CommonSpan)``;
const GoalNameSpan = styled(CommonSpan)``;
const DoneSpan = styled(CommonSpan)``;
const EndureNumSpan = styled(CommonSpan)``;
const DoneDateSpan = styled(CommonSpan)``;
