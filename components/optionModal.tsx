import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const screenHeight = Dimensions.get("window").height;

export type Option = {
  label: string;
  value: string;
};

type OptionModalProps = {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function OptionModal({
  visible,
  onDismiss,
  title,
  options,
  selected,
  onSelect,
}: OptionModalProps) {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const [render, setRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRender(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => setRender(false));
    }
  }, [visible, slideAnim]);

  if (!render) return null;

  return (
    <Modal transparent visible={render} animationType="none">
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onDismiss} />
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.colors.background,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            {title}
          </Text>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            {options.map((option) => {
              const isSelected = selected === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => onSelect(option.value)}
                  style={[
                    styles.option,
                    {
                      backgroundColor: isSelected
                        ? theme.colors.primary
                        : theme.colors.surfaceVariant,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: wp("3.8%"),
                      fontWeight: "500",
                      color: isSelected
                        ? theme.colors.onPrimary
                        : theme.colors.onSurface,
                    }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    width: "100%",
    borderTopLeftRadius: wp("5%"),
    borderTopRightRadius: wp("5%"),
    paddingHorizontal: wp("5%"),
    paddingTop: wp("4%"),
    paddingBottom: wp("8%"),
    maxHeight: screenHeight * 0.5,
  },
  title: {
    fontSize: wp("4.2%"),
    fontWeight: "600",
    marginBottom: wp("3%"),
  },
  content: {
    gap: wp("2%"),
  },
  option: {
    paddingVertical: wp("3.5%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("3%"),
  },
});
