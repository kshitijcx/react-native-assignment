import {
  FlatList,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import RocketCard from "@/components/RocketCard";
import Ionicons from '@expo/vector-icons/Ionicons';

const fetchData = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/rockets");
  const data = await response.json();
  return data;
};

const RocketsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rocketsList"],
    queryFn: fetchData,
  });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 py-3 bg-[#1D1616]">
        <View className="mb-4 flex flex-row items-center justify-between">
          <Text className="text-white font-bold text-2xl">
            Rockets Database
          </Text>
          <Ionicons name="rocket" size={40} color="white" />
        </View>
        {isLoading ? (
          <Text className="text-2xl text-white font-bold text-center mt-10 animate-pulse p-5">
            Loading ...
          </Text>
        ) : (
          <FlatList
            className="px-5"
            data={data}
            renderItem={({ item }) => (
              <RocketCard
                name={item.name}
                cost={item.cost_per_launch}
                successRate={item.success_rate_pct}
                description={item.description}
                imgPath={item.flickr_images[0]}
              />
            )}
            keyExtractor={(_,index) => index.toString()}
            ItemSeparatorComponent={() => <View className="h-3" />}
            ListFooterComponent={
              <View className="py-4">
                <Text className="text-white text-center">End of List</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default RocketsPage;
