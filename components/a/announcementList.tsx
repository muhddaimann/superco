import AnnouncementCard from "@/components/a/announcementCard";
import { NotificationTag, useNotification } from "@/hooks/useAnnouncement";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const INITIAL_COUNT = 5;
const LOAD_COUNT = 5;

export default function AnnouncementList() {
  const theme = useTheme();
  const { notifications } = useNotification();
  const [selectedTag, setSelectedTag] = useState<"all" | NotificationTag>(
    "all"
  );
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [expanded, setExpanded] = useState(false);

  const filterOptions: ("all" | NotificationTag)[] = [
    "all",
    "Update",
    "Reminder",
    "Alert",
  ];

  const filtered =
    selectedTag === "all"
      ? notifications
      : notifications.filter((item) => item.tag === selectedTag);

  const handleToggle = () => {
    if (expanded) {
      setVisibleCount(INITIAL_COUNT);
      setExpanded(false);
    } else {
      const nextCount = Math.min(visibleCount + LOAD_COUNT, filtered.length);
      if (nextCount >= filtered.length) {
        setExpanded(true);
      }
      setVisibleCount(nextCount);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.filterRow}>
        {filterOptions.map((tag) => (
          <Pressable
            key={tag}
            style={[
              styles.filterBtn,
              {
                backgroundColor:
                  selectedTag === tag
                    ? theme.colors.primary
                    : theme.colors.surfaceVariant,
              },
            ]}
            onPress={() => {
              setSelectedTag(tag);
              setVisibleCount(INITIAL_COUNT);
              setExpanded(false);
            }}
          >
            <Text
              style={{
                color:
                  selectedTag === tag
                    ? theme.colors.onPrimary
                    : theme.colors.onSurfaceVariant,
                fontWeight: "600",
                fontSize: wp("3.4%"),
              }}
            >
              {tag.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.slice(0, visibleCount).map((item) => (
          <AnnouncementCard key={item.id} data={item} />
        ))}
        {filtered.length > INITIAL_COUNT && (
          <Pressable onPress={handleToggle} style={styles.toggleBtn}>
            <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>
              {expanded ? "Collapse" : "Load More"}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: wp("2%"),
  },
  filterRow: {
    flexDirection: "row",
    gap: wp("2%"),
  },
  filterBtn: {
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("2%"),
  },
  toggleBtn: {
    alignItems: "center",
    paddingVertical: wp("3%"),
  },
});
