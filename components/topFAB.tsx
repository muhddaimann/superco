import React, { useEffect, useRef } from "react";
import { Animated, Easing, ScrollView, StyleSheet } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type TopFABProps = {
  visible: boolean;
  scrollRef: React.RefObject<ScrollView | null>;
};

export default function TopFAB({ visible, scrollRef }: TopFABProps) {
  const theme = useTheme();
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

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

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
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
        icon="chevron-up"
        onPress={scrollToTop}
        size="small"
        style={{
          backgroundColor: theme.colors.primary,
        }}
        color={theme.colors.onPrimary}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    top: wp("2%"),
    zIndex: 10,
    borderRadius: wp("10%"),
    elevation: 6,
  },
});
