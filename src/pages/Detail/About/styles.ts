import styled from 'styled-components/native';

export const Section = styled.View`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.Text<{ color: string }>`
  margin-bottom: 8px;
  color: ${({ color }) => color};
  font-size: 18px;
  font-weight: 700;
`;

export const SectionContent = styled.View`
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
`;

export const SectionSubtitle = styled.View`
  width: 100px;
`;

export const SectionText = styled.Text``;

export const Container = styled.ScrollView`
  flex: 1;
  padding-bottom: 100px;
`;

export const SectionItem = styled.View`
  align-self: flex-start;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
