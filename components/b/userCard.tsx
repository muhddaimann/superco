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
      <View style={styles.row}>
        <Text style={[styles.teamTitle, { color: theme.colors.onSurface }]}>
          Team
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: wp("6%"),
    paddingHorizontal: wp("5%"),
    borderBottomLeftRadius: wp("4%"),
    borderBottomRightRadius: wp("4%"),
    marginBottom: wp("3%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
  },
  teamTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
  },
});
