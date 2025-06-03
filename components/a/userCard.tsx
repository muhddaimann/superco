import { useGreeting } from "@/hooks/useGreeting";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function UserCard() {
  const theme = useTheme();
  const greeting = useGreeting();
  const today = format(new Date(), "d MMM yyyy");
  const router = useRouter();

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
      <View style={styles.topRow}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={wp("5%")}
            color={theme.colors.primary}
          />
          <Text style={[styles.dateText, { color: theme.colors.primary }]}>
            {today}
          </Text>
        </View>
        <Pressable onPress={() => router.push("/a/notificationPage")}>
          <View
            style={{
              backgroundColor: theme.colors.background,
              borderRadius: wp("5%"),
              padding: wp("2%"),
            }}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={wp("5%")}
              color={theme.colors.primary}
            />
          </View>
        </Pressable>
      </View>

      <Text style={[styles.greetingText, { color: theme.colors.onSurface }]}>
        {greeting}, <Text style={{ color: theme.colors.primary }}>Nasrul</Text>
      </Text>

      <View style={styles.hotseatRow}>
        <Pressable
          style={[
            styles.hotseatButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <MaterialCommunityIcons
            name="account-plus-outline"
            size={wp("5.5%")}
            color={theme.colors.onPrimary}
          />
          <Text style={[styles.hotseatText, { color: theme.colors.onPrimary }]}>
            Add
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.hotseatButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <MaterialCommunityIcons
            name="calendar-edit"
            size={wp("5.5%")}
            color={theme.colors.onPrimary}
          />
          <Text style={[styles.hotseatText, { color: theme.colors.onPrimary }]}>
            Shift
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.hotseatButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <MaterialCommunityIcons
            name="file-document-outline"
            size={wp("5.5%")}
            color={theme.colors.onPrimary}
          />
          <Text style={[styles.hotseatText, { color: theme.colors.onPrimary }]}>
            Approve
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.hotseatButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <MaterialCommunityIcons
            name="message-text-outline"
            size={wp("5.5%")}
            color={theme.colors.onPrimary}
          />
          <Text style={[styles.hotseatText, { color: theme.colors.onPrimary }]}>
            Chat
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingBottom: wp("4%"),
    paddingHorizontal: wp("5%"),
    borderBottomLeftRadius: wp("4%"),
    borderBottomRightRadius: wp("4%"),
    marginBottom: wp("3%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  dateText: {
    fontSize: wp("3.6%"),
    fontWeight: "400",
  },
  greetingText: {
    fontSize: wp("5%"),
    fontWeight: "700",
  },
  hotseatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp("4%"),
    gap: wp("2%"),
  },
  hotseatButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: wp("2.5%"),
    borderRadius: wp("3%"),
  },
  hotseatText: {
    fontSize: wp("3%"),
    fontWeight: "500",
  },
});
