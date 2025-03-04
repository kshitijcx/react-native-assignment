import { Link, usePathname } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
const InfoCard = ({
  name,
  rocketName,
  date,
  success,
  id,
}: {
  name: string;
  rocketName: string;
  date: string;
  success: string;
  id: string;
}) => {
  const dateObj = new Date(date);
  const dateString = dateObj.toLocaleDateString();
  const timeString = dateObj.toLocaleTimeString();

  return (
    <View className="bg-[#8E1616] px-3 py-4 rounded-2xl gap-2 border-2 border-black shadow-md shadow-white flex flex-row items-center justify-around">
      <View className="w-60 gap-2">
        <Text className="text-white font-bold text-xl">Mission: {name}</Text>
        <Text className="text-gray-300 font-bold">
          Rocket Name: {rocketName}
        </Text>
        <Text className="text-gray-300 font-bold">
          {dateString} {timeString}
        </Text>
        <Link
          href={{
            pathname: "./[mission]",
            params: { missionId: id },
          }}
          asChild
        >
          <Pressable className="bg-[#D84040] w-20 py-2 rounded-2xl border-2 mt-2">
            <Text className="text-center text-white font-semibold">More</Text>
          </Pressable>
        </Link>
      </View>
      <View>
        <Text className="text-2xl font-bold text-white">{success}</Text>
      </View>
    </View>
  );
};
export default InfoCard;
