import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  flex: 1;
  margin: 0 20px;
`;

export const List = styled.FlatList`
  flex: 1;
  padding-top: 10px;
  margin-top: 20px;
`;

export const ContentLoading = styled.View`
  margin-top: 40px;
`;
