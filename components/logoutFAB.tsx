import { useAuth } from "@/contexts/authContext";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type LogoutFABProps = {
  visible: boolean;
};

export default function LogoutFAB({ visible }: LogoutFABProps) {
  const theme = useTheme();
  const { logout } = useAuth();
  const scale = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: visible ? 1 : 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, scale, opacity]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <FAB
        icon="logout"
        onPress={handleLogout}
        style={{ backgroundColor: theme.colors.error }}
        color={theme.colors.onError}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: wp("30%"),
    right: wp("5%"),
    zIndex: 10,
    borderRadius: wp("4%"),
    elevation: 6,
  },
});
