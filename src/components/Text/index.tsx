import React, { PropsWithChildren } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import { Theme } from '../../styles/styled';
import theme from '../../styles/theme';

import { Container } from './styles';

export type TextProps = RNTextProps & {
  variant?: keyof Theme['textVariantes'];
  color?: keyof Theme['colors'];
  bold?: boolean;
  textAlign?: keyof Theme['textAlignVariantes'];
};

const Text = ({
  variant,
  color,
  bold,
  children,
  textAlign,
  ...rest
}: PropsWithChildren<TextProps>) => {
  return (
    <Container
      variant={variant}
      color={color}
      bold={bold}
      textAlign={textAlign}
      {...rest}
    >
      {children}
    </Container>
  );
};

Text.defaultProps = {
  variant: 'body3',
  color: theme.colors.black,
  bold: false
};

export default Text;
