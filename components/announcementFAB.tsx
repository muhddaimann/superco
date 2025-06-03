import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type AnnouncementFABProps = {
  visible: boolean;
  onPress: () => void;
};

export default function AnnouncementFAB({
  visible,
  onPress,
}: AnnouncementFABProps) {
  const theme = useTheme();
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
        icon="plus"
        onPress={onPress}
        style={{ backgroundColor: theme.colors.primary }}
        color={theme.colors.onPrimary}
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
