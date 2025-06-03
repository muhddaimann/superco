import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const tabs = ["Leave", "WFH", "Overtime"];

export default function UserCard() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("Leave");

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        Approval
      </Text>

      <View
        style={[
          styles.tabContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === tab ? theme.colors.primary : "transparent",
              },
            ]}
          >
            <Text
              style={{
                color:
                  activeTab === tab
                    ? theme.colors.onPrimary
                    : theme.colors.onSurfaceVariant,
                fontWeight: activeTab === tab ? "700" : "500",
                fontSize: wp("3.5%"),
              }}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingVertical: wp("4%"),
    paddingHorizontal: wp("5%"),
    borderBottomLeftRadius: wp("4%"),
    borderBottomRightRadius: wp("4%"),
    marginBottom: wp("3%"),
    gap: wp("2%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: wp("4.8%"),
    fontWeight: "700",
    marginBottom: wp("2%"),
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("1%"),
    borderRadius: wp("3%"),
  },
  tab: {
    flex: 1,
    paddingVertical: wp("2%"),
    alignItems: "center",
    borderRadius: wp("3%"),
  },
});
