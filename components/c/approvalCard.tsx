import { ApprovalItem } from "@/hooks/useApproval";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  data: ApprovalItem;
};

export default function ApprovalCard({ data }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.topRow}>
        <View style={styles.emptySpace} />
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: data.bgColor,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: data.textColor,
              },
            ]}
          >
            {data.status}
          </Text>
        </View>
      </View>
      <Text style={[styles.name, { color: theme.colors.onSurface }]}>
        {data.name}
      </Text>
      <Text style={[styles.meta, { color: theme.colors.onSurfaceVariant }]}>
        {data.date} • {data.reason}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: wp("3%"),
    padding: wp("4%"),
    gap: wp("1.5%"),
    marginBottom: wp("2%"),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  emptySpace: {
    flex: 1,
  },
  name: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  meta: {
    fontSize: wp("3.4%"),
  },
  statusPill: {
    borderRadius: wp("4%"),
    paddingVertical: wp("1%"),
    paddingHorizontal: wp("3%"),
  },
  statusText: {
    fontSize: wp("3.2%"),
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
