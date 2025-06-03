import CustomDrawer from "@/components/CustomDrawer";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <Drawer
        drawerContent={() => <CustomDrawer />}
        screenOptions={({ navigation }) => ({
          drawerPosition: "right",
          style: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: 32,
            padding: 0,
          },
          headerTitle: () => (
            <Image
              source={require("@/assets/images/logo_teddy.png")}
              style={{ width: 120, height: 40, resizeMode: "contain" }}
            />
          ),
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginRight: 16 }}
            >
              <Image
                source={require("@/assets/images/menu.png")}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Toast />
    </>
  );
}
