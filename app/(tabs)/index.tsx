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
import InfoCard from "@/components/InfoCard";
import { useContext, useEffect, useState } from "react";
import { FavContext } from "@/context/FavContext";

const fetchData = async (past: boolean) => {
  const url = past
    ? "https://api.spacexdata.com/v4/launches/past"
    : "https://api.spacexdata.com/v4/launches/upcoming";
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fetchRockets = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/rockets");
  const data = await response.json();
  return data;
};

const index = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const toggleSwitch = () => {
    setSearchQuery("");
    setIsEnabled((previousState) => !previousState);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["spacex", isEnabled],
    queryFn: () => fetchData(isEnabled),
  });

  const { data: rockets } = useQuery({
    queryKey: ["rockets"],
    queryFn: fetchRockets,
  });

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [isEnabled, data]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item: any) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const findRocketName = (id: string) => {
    const found = rockets.find((rocket: any) => {
      if (rocket.id === id) {
        return rocket;
      }
    });
    return found.name;
  };

  const ListHeader = () => {
    return (
      <View className="flex flex-row items-center justify-between">
        <Text className="text-white font-bold text-2xl">SpaceX Database</Text>
        <View className="flex flex-row justify-end items-center">
          <Text className="text-white text-sm">Upcoming</Text>
          <Switch
            trackColor={{ false: "white", true: "gray" }}
            thumbColor={isEnabled ? "white" : "gray"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text className="text-white text-sm">Past</Text>
        </View>
      </View>
    );
  };


  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 bg-[#1D1616]">
        <View className="mb-4">
          <ListHeader />
          <View className="">
            <TextInput
              className="text-white border border-white rounded-2xl w-full"
              placeholder="Search"
              placeholderTextColor="white"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>
        {isLoading ? (
          <Text className="text-2xl text-white font-bold text-center mt-10 animate-pulse p-5">
            Loading ...
          </Text>
        ) : (
          <FlatList
            className="px-5 flex-1"
            data={filteredData}
            renderItem={({ item }) => (
              <InfoCard
                name={item.name}
                rocketName={findRocketName(item.rocket)}
                date={item.date_utc}
                success={
                  item.success !== null
                    ? item.success === true
                      ? "Pass"
                      : "Fail"
                    : "TBD"
                }
                id={item.id}
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="h-3" />}
            extraData={rockets}
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
export default index;
