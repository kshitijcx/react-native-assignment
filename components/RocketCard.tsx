import { Image, Text, View } from "react-native";
const RocketCard = ({
  name,
  cost,
  successRate,
  description,
  imgPath,
}: {
  name: string;
  cost: number;
  successRate: number;
  description: string;
  imgPath: string;
}) => {
  return (
    <View className="bg-[#8E1616] px-3 py-4 rounded-2xl border-2 border-black shadow-md shadow-white">
      <View className="flex flex-row items-center justify-between">
        <View className="w-60 gap-2">
          <Text className="text-white font-bold text-xl">Name: {name}</Text>
          <Text className="text-gray-300 font-bold">
            Cost Per Launch: {cost}
          </Text>
          <Text className="text-gray-300 font-bold">
            Success Rate: {successRate}%
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: imgPath }}
            height={75}
            width={75}
            className="rounded-2xl"
          />
        </View>
      </View>
      <Text className="text-gray-400 font-medium text-sm mt-4">
        {description}
      </Text>
    </View>
  );
};
export default RocketCard;
