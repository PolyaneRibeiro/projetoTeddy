
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

const ScreenContainer = ({ children, style, ...rest }: ViewProps) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
