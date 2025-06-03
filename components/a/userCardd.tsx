import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function UserCard() {
  const theme = useTheme();

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
      <View style={styles.wrapper}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Notification Center
        </Text>
        <Text
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          All your approvals, reminders and alerts in one place.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderBottomLeftRadius: wp("4%"),
    borderBottomRightRadius: wp("4%"),
    paddingBottom: wp("6%"),
    paddingHorizontal: wp("5%"),
    marginBottom: wp("3%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  wrapper: {
    justifyContent: "center",
  },
  greeting: {
    fontSize: wp("3.8%"),
    fontWeight: "500",
    marginBottom: wp("1%"),
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "700",
  },
  subtitle: {
    fontSize: wp("3.5%"),
    marginTop: wp("1%"),
  },
});
