import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle:{
            backgroundColor:"#1D1616",
            borderColor:"#1D1616"
        },
        tabBarActiveTintColor: "#D84040",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title:"Missions",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="list-ul" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rockets"
        options={{
          title:"Rockets"
          ,tabBarIcon: ({ color }) => (
            <FontAwesome size={26} name="rocket" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title:"Favourites",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={26} name="star" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
