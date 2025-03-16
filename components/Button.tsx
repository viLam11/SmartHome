import { Text, TouchableOpacity } from 'react-native';

type MyButtonProps = {
  title: string;
  onPress: () => void;
};

const MyButton = ({ title, onPress }: MyButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-500 p-4 rounded-lg"
    >
      <Text className="text-white text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;
