import { Notification, useNotification } from "@/hooks/useAnnouncement";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  data: Notification;
};

export default function AnnouncementCard({ data }: Props) {
  const theme = useTheme();
  const { getTagStyle, getByStyle } = useNotification();
  const tagStyle = getTagStyle(data.tag);
  const byStyle = getByStyle(data.by);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          {data.title}
        </Text>
      </View>
        <Text style={[styles.message, { color: theme.colors.onSurface }]}>
        {data.message}
      </Text>
      <View style={styles.meta}>
        <View style={styles.pills}>
          <View style={[styles.pill, { backgroundColor: byStyle.bgColor }]}>
            <Text style={[styles.pillText, { color: byStyle.textColor }]}>
              {data.by}
            </Text>
          </View>
          <View style={[styles.pill, { backgroundColor: tagStyle.bgColor }]}>
            <Text style={[styles.pillText, { color: tagStyle.textColor }]}>
              {data.tag}
            </Text>
          </View>
        </View>
        <Text style={[styles.date, { color: theme.colors.onSurfaceVariant }]}>
          {data.date}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginBottom: wp("3%"),
    gap: wp("1.5%"),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  title: {
    fontSize: wp("4%"),
    fontWeight: "600",
    flexShrink: 1,
  },
  message: {
    fontSize: wp("3.6%"),
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp("1%"),
    alignItems: "center",
  },
  pills: {
    flexDirection: "row",
    gap: wp("1.5%"),
  },
  pill: {
    paddingHorizontal: wp("2.5%"),
    paddingVertical: wp("1%"),
    borderRadius: wp("2%"),
  },
  pillText: {
    fontSize: wp("3.2%"),
    fontWeight: "500",
  },
  date: {
    fontSize: wp("3.2%"),
  },
});
