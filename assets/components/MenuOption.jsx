import { TouchableOpacity } from 'react-native';

export const MenuOption = ({
  onSelect,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={{padding: 5}}>
      {children}
    </TouchableOpacity>
  );
};