import HomeIcon from "@/assets/images/home.png";
import HomeActiveIcon from "@/assets/images/homeActive.png";
import PersonIcon from "@/assets/images/person.png";
import PersonActiveIcon from "@/assets/images/personActive.png";
import PersonSelectedIcon from "@/assets/images/personSelected.png";
import PersonSelectedActiveIcon from "@/assets/images/personSelectedActive.png";
import {
    DrawerItem
} from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Route = "/" | "/clients" | '/clientsSelecteds';

const drawerItems: { label: string; icon: ImageSourcePropType; iconActive: ImageSourcePropType; route: Route }[] = [
    {
        label: "Home",
        icon: HomeIcon,
        iconActive: HomeActiveIcon,
        route: "/",
    },
    {
        label: "Clientes",
        icon: PersonIcon,
        iconActive: PersonActiveIcon,
        route: "/clients",
    },
    {
        label: "Clientes Selecionados",
        icon: PersonSelectedIcon,
        iconActive: PersonSelectedActiveIcon,
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
                                icon={() => (
                                    <Image
                                        source={isActive ? item.iconActive : item.icon}
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
        marginTop: 70,
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
