import styled from 'styled-components/native';

import Text from '../../../components/Text';

type StatValueProps = {
  width: number;
  backgroundColor: string;
};

export const Stat = styled.View`
  margin-bottom: 16px;

  flex-direction: row;
  align-items: center;
`;

export const StatGraph = styled.View`
  flex: 1;

  flex-direction: row;
  align-items: center;
`;

export const StatLine = styled.View`
  flex: 1;
  overflow: hidden;
  height: 3px;
  background: ${({ theme }) => theme.colors.lightGrey};
  margin-left: 16px;
`;

export const StatValue = styled.View<StatValueProps>`
  height: 3px;
  background: ${({ backgroundColor }) => backgroundColor};
  width: ${(props) => props.width}%;
`;

export const Title = styled(Text)<{ color: string }>`
  color: ${({ color }) => color};
  margin-bottom: 20px;
`;
