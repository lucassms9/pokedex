import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{ backgroundColor: string }>`
  margin-bottom: 25px;
  flex-direction: row;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 8px;
  height: 100px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 4.65px;
  elevation: 8;
`;

export const ContentInfo = styled.View`
  flex: 0.7;
  justify-content: center;
  margin-left: 25px;
`;

export const ContentImage = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;

export const IconBall = styled.Image`
  width: 110px;
  height: 110px;
  opacity: 0.05;
`;
export const IconPokemon = styled.Image`
  width: 120px;
  height: 120px;
  right: 10px;
  position: absolute;
  top: -20px;
`;
export const Type = styled.View`
  background-color: #8cb331;
  width: 40px;
  padding: 4px;
  border-radius: 4px;
`;
export const ContentType = styled.View`
  margin-top: 5px;
`;
