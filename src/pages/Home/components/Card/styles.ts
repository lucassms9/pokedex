import styled from 'styled-components/native';
import { darken, lighten } from 'polished';

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
  margin-left: 20px;
  margin-top: 15px;
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
export const Type = styled.View<{ backgroundColor: 'string' }>`
  background-color: ${(props) => darken(0.2, props.backgroundColor)}
  min-width: 40px;
  height: 25px;
  padding: 4px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
  elevation: 8;
`;
export const ContentType = styled.ScrollView`
  margin-top: 5px;
  height: 20px;
`;
