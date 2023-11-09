import { TouchableOpacityProps } from 'react-native';

import { Container, Title, FilterStyledProps } from './styles';

type FilterProps = TouchableOpacityProps &
  FilterStyledProps & {
    title: string;
  };

export function Filter({ title, isActive = false, ...rest }: FilterProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
