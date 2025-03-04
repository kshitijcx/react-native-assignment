import { Link, usePathname } from "expo-router";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useContext } from "react";
import { FavContext } from "@/context/FavContext";

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

  const path = usePathname();

  const { items, addItem, removeItem } = useContext(FavContext);

  const handleAddItem = () => {
    const newItem = { id, name, rocketName, date, success };
    addItem(newItem);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

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
        <View className="flex flex-row gap-2 items-center">
          <Link
            href={{
              pathname: "../[mission]",
              params: { missionId: id },
            }}
            asChild
          >
            <Button color="#D84040" title="More..." />
          </Link>
          {path === "/" && (
            <Button color="#D84040" title="Favourite" onPress={handleAddItem} />
          )}
          {path === "/favourite" && (
            <Button
              color="#D84040"
              title="Remove"
              onPress={() => handleRemoveItem(id)}
            />
          )}
        </View>
      </View>
      <View>
        <Text className="text-2xl font-bold text-white">{success}</Text>
      </View>
    </View>
  );
};
export default InfoCard;
