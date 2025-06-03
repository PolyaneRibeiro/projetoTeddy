import { Ionicons } from "@expo/vector-icons";
import {
    DrawerItem
} from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

type Route = "/" | "/clients" | '/clientsSelecteds';

const drawerItems: { label: string; icon: string; route: Route }[] = [
    {
        label: "Home",
        icon: "home",
        route: "/",
    },
    {
        label: "Clientes",
        icon: "person",
        route: "/clients",
    },
    {
        label: "Clientes Selecionados",
        icon: "person",
        route: "/clientsSelecteds",
    },
];

export default function CustomDrawer() {
    const pathname = usePathname();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("@/assets/images/logo_teddy.png")}
                    style={styles.logo}
                />
            </View>

            <View style={styles.menuContainer}>
                {drawerItems.map((item) => {
                    const isActive = pathname === item.route;

                    return (
                        <View key={item.route} style={styles.itemWrapper}>
                            <DrawerItem
                                label={item.label}
                                onPress={() => router.push(item.route)}
                                icon={({ color, size }) => (
                                    <Ionicons
                                        name={item.icon as any}
                                        size={20}
                                        color={isActive ? "#f58020" : "#000"}
                                    />
                                )}
                                labelStyle={[
                                    styles.label,
                                    isActive && { color: "#f58020", fontWeight: "bold" },
                                ]}
                                style={[styles.item, isActive && styles.itemActive]}
                            />
                            {isActive && <View style={styles.activeLine} />}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a3a3a3',
      },
    logoContainer: {
        alignItems: "center",
        marginTop: 70 ,
        marginBottom: 30,
        backgroundColor: '#a3a3a3',
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: "contain",
    },
    menuContainer: {
        padding: 20,
        backgroundColor: '#fff',
        height: '100%',
        borderTopLeftRadius: 32,
    },
    itemWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    activeLine: {
        width: 3,
        height: "80%",
        backgroundColor: "#f58020",
        borderRadius: 4,
        marginRight: 8,
    },
    item: {
        flex: 1,
    },
    itemActive: {
        backgroundColor: "transparent",
    },
    label: {
        fontSize: 16,
    },
});
