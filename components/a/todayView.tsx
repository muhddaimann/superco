import OptionModal from "@/components/optionModal";
import { Option, useOption } from "@/hooks/useOption";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function TodayView() {
  const theme = useTheme();
  const { teamOptions } = useOption();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Option>(teamOptions[0]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Today’s Status
        </Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.selector}
        >
          <Text style={[styles.selectorText, { color: theme.colors.primary }]}>
            {selectedTeam.label}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={wp("4.5%")}
            color={theme.colors.primary}
          />
        </Pressable>
      </View>

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
          <View
            style={[
              styles.chip,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: theme.colors.onPrimaryContainer },
              ]}
            >
              Present: 5
            </Text>
          </View>
          <View
            style={[styles.chip, { backgroundColor: theme.colors.secondary }]}
          >
            <Text
              style={[styles.chipText, { color: theme.colors.onSecondary }]}
            >
              Late: 2
            </Text>
          </View>
          <View
            style={[
              styles.chip,
              { backgroundColor: theme.colors.secondaryContainer },
            ]}
          >
            <Text
              style={[styles.chipText, { color: theme.colors.onSecondary }]}
            >
              WFH: 3
            </Text>
          </View>
          <View
            style={[styles.chip, { backgroundColor: theme.colors.tertiary }]}
          >
            <Text style={[styles.chipText, { color: theme.colors.onTertiary }]}>
              Leave: 1
            </Text>
          </View>
        </View>
      </View>

      <OptionModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        title="Choose Team"
        options={teamOptions}
        selected={selectedTeam.value}
        onSelect={(value) => {
          const match = teamOptions.find((t) => t.value === value);
          if (match) setSelectedTeam(match);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: wp("2%") },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: wp("1%"),
    paddingHorizontal: wp("3%"),
    borderRadius: wp("5%"),
  },
  selectorText: {
    fontSize: wp("3.6%"),
    fontWeight: "400",
    marginRight: wp("1%"),
  },
  title: {
    fontSize: wp("4.4%"),
    fontWeight: "600",
  },
  card: {
    borderRadius: wp("2%"),
    padding: wp("4%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp("2%"),
  },
  chip: {
    paddingVertical: wp("1.5%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("4%"),
  },
  chipText: {
    fontSize: wp("3.4%"),
    fontWeight: "600",
  },
});
