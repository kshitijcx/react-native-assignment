import InfoCardBig from "@/components/InfoCardBig";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const fetchMission = async (id: string | string[]) => {
  const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
  const data = await response.json();
  return data;
};

const fetchRocket = async (id: string | string[]) => {
  const response = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
  const data = await response.json();
  return data;
};

const fetchPayloads = async () => {
  const response = await fetch(`https://api.spacexdata.com/v4/payloads`);
  const data = await response.json();
  return data;
};

const fetchLaunchSite = async (id: string) => {
  const response = await fetch(
    `https://api.spacexdata.com/v4/launchpads/${id}`
  );
  const data = await response.json();
  return data;
};

const MissionPage = () => {
  const { missionId } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["mission", missionId],
    queryFn: () => fetchMission(missionId),
  });

  const { data: rocket, isLoading: isLoadingRocket } = useQuery({
    queryKey: ["rocket"],
    queryFn: () => fetchRocket(data.rocket),
    enabled: !!data,
  });

  const { data: payloads, isLoading: isLoadingPayloads } = useQuery({
    queryKey: ["payloads"],
    queryFn: fetchPayloads,
  });

  const { data: launchpad, isLoading: isLoadingLauchpad } = useQuery({
    queryKey: ["launchpad"],
    queryFn: () => fetchLaunchSite(data.launchpad),
    enabled: !!data,
  });

  const findPayloads = (payloadArr: string[]) => {
    const foundPayloads = payloads.filter((obj) =>
      payloadArr.some((searchValue) =>
        obj.id.toLowerCase().includes(String(searchValue).toLowerCase())
      )
    );
    const concatenatedPayload = foundPayloads.map((obj) => obj.name).join(", ");
    return concatenatedPayload;
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 bg-[#1D1616] justify-center">
        {isLoading ||
        isLoadingRocket ||
        isLoadingPayloads ||
        isLoadingLauchpad ? (
          <Text className="text-2xl text-white font-bold text-center mt-10 animate-pulse p-5">
            Loading...
          </Text>
        ) : (
          <InfoCardBig
            name={data.name}
            rocketName={rocket.name}
            date={data.date_utc}
            status={
              data.success !== null
                ? data.success === true
                  ? "Pass"
                  : "Fail"
                : "TBD"
            }
            imgPath={data.links.patch.large}
            description={data.details}
            youtube={data.links.webcast}
            article={data.links.article}
            wiki={data.links.wikipedia}
            payloads={findPayloads(data.payloads)}
            launchpad={launchpad.name}
            //   id={item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default MissionPage;
