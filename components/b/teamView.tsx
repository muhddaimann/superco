import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function TeamView() {
  const theme = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Team Overview
        </Text>
        <Pressable>
          <Text style={[styles.viewMore, { color: theme.colors.primary }]}>
            View More
          </Text>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.teamName, { color: theme.colors.primary }]}>
          Web Team
        </Text>
        <View style={styles.memberList}>
          <Text style={styles.member}>• Aiman – Frontend</Text>
          <Text style={styles.member}>• Sarah – Backend</Text>
          <Text style={styles.member}>• Hafiz – Fullstack</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.teamName, { color: theme.colors.primary }]}>
          AI Team
        </Text>
        <View style={styles.memberList}>
          <Text style={styles.member}>• Lisa – Data Scientist</Text>
          <Text style={styles.member}>• Kumar – ML Engineer</Text>
          <Text style={styles.member}>• Mei Ling – AI Researcher</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: wp("2%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: wp("1%"),
  },
  title: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
  },
  viewMore: {
    fontSize: wp("3.2%"),
    fontWeight: "500",
  },
  card: {
    borderRadius: wp("3%"),
    padding: wp("4%"),
    gap: wp("1.5%"),
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  teamName: {
    fontSize: wp("4%"),
    fontWeight: "600",
    marginBottom: wp("1%"),
  },
  memberList: {
    gap: wp("1%"),
  },
  member: {
    fontSize: wp("3.4%"),
    color: "#666",
  },
});
