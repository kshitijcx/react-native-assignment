import InfoCard from "@/components/InfoCard";
import { FavContext } from "@/context/FavContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FavouritesPage = () => {
  const { items } = useContext(FavContext);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 py-3 bg-[#1D1616]">
        <View className="mb-4">
          <View className="mb-4 flex flex-row items-center justify-between">
            <Text className="text-white font-bold text-2xl">
              Favourite Launches
            </Text>
            <Ionicons name="star" size={40} color="white" />
          </View>
        </View>

        <FlatList
          className="px-5 flex-1"
          data={items}
          renderItem={({ item }) => (
            <InfoCard
              name={item.name}
              rocketName={item.rocketName}
              date={item.date}
              success={item.success}
              id={item.id}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-3" />}
          ListEmptyComponent={<Text className="text-white font-bold text-2xl text-center">No Favourites Added</Text>}
        />
      </View>
    </SafeAreaView>
  );
};
export default FavouritesPage;
