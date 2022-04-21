import styled from 'styled-components/native';
import Text from '../../../components/Text';

export const Content = styled.View`
  margin-top: 32px;
`;

export const Title = styled(Text)<{ color: string }>`
  color: ${({ color }) => color};
`;
