import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Animated } from "react-native";

const { height, width } = Dimensions.get("window");

import Constants from "expo-constants";

import { TAB_BUTTON_WIDTH } from "./tabs";

export const Container = styled(Animated.View)`
  height: ${height - (Constants.statusBarHeight + 64)}px;
  background: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 16px 0;
  top: -30px;
`;
export const ImageBall = styled.Image`
  width: 50px;
  height: 50px;
  position: absolute;
  opacity: 0.2;
  top: -20px;
`;

export const Tabs = styled.View`
  padding: 16px 0 24px;
  margin: 0 24px;
  border-style: solid;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const TabButton = styled.TouchableOpacity`
  height: 24px;
  width: ${TAB_BUTTON_WIDTH}px;
  color: #fff;
  align-items: center;
  justify-content: center;
`;

export const SelectedIndicator = styled(Animated.View)`
  height: 2px;
  width: ${TAB_BUTTON_WIDTH}px;
  background: ${({ theme }) => theme.colors.blue};

  position: absolute;
  bottom: -1px;
`;

export const SlideWrapper = styled.View`
  width: ${width}px;
  padding: 24px;
`;
