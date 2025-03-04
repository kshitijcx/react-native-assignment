import { Text, Image, View, Linking, Button, Pressable } from "react-native";
const InfoCardBig = ({
  name,
  rocketName,
  date,
  status,
  description,
  youtube,
  article,
  wiki,
  payloads,
  launchpad,
}: {
  name: string;
  rocketName: string;
  date: string;
  status: string;
  description: string;
  youtube: string;
  article: string;
  wiki: string;
  payloads: string;
  launchpad: string;
}) => {
  const dateObj = new Date(date);
  const dateString = dateObj.toLocaleDateString();
  const timeString = dateObj.toLocaleTimeString();

  return (
    <View className="bg-[#8E1616] px-3 py-10 rounded-2xl border-2 border-black shadow-md shadow-white">
      <View className="items-center gap-4">
        <Text className="text-white font-bold text-3--xl text-center">
          Mission: {name}
        </Text>
        <Text className="text-gray-300 font-bold text-xl">
          Rocket Name: {rocketName}
        </Text>
        <Text className="text-gray-300 font-bold text-xl">
          {dateString} {timeString}
        </Text>
        {payloads && (
          <Text className="text-gray-300 font-bold text-xl">
            Payloads: {payloads}
          </Text>
        )}

        {launchpad && (
          <Text className="text-gray-300 font-bold text-xl">
            Launchsite: {launchpad}
          </Text>
        )}

        <Text className="text-gray-300 font-bold text-xl">
          Status: {status}
        </Text>
        {youtube && (
          <Text
            style={{ color: "#0096FF" }}
            className="text-lg font-bold"
            onPress={() => Linking.openURL(youtube)}
          >
            Youtube Link
          </Text>
        )}

        {article && (
          <Text
            style={{ color: "#0096FF" }}
            className="text-lg font-bold"
            onPress={() => Linking.openURL(article)}
          >
            Article Link
          </Text>
        )}

        {wiki && (
          <Text
            style={{ color: "#0096FF" }}
            className="text-lg font-bold"
            onPress={() => Linking.openURL(wiki)}
          >
            Wikipedia Link
          </Text>
        )}

        <Text className="text-gray-400 font-medium text-sm mt-4">
          {description ? description : "No details available."}
        </Text>
      </View>
    </View>
  );
};
export default InfoCardBig;
