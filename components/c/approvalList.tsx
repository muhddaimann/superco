import ApprovalCard from "@/components/c/approvalCard";
import OptionModal from "@/components/optionModal";
import { ApprovalStatus, useApproval } from "@/hooks/useApproval";
import { Option, useOption } from "@/hooks/useOption";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type StatusFilter = "All" | ApprovalStatus;

export default function ApprovalList() {
  const theme = useTheme();
  const { teamOptions } = useOption();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Option>(teamOptions[0]);
  const statusFilters: StatusFilter[] = ["All", "Pending", "Approved", "Cancelled"];
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");

  const { getByStatus } = useApproval();
  const filteredData = getByStatus(selectedStatus);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Approval List
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

      <View style={styles.row}>
        {statusFilters.map((status) => (
          <Pressable
            key={status}
            onPress={() => setSelectedStatus(status)}
            style={[
              styles.chip,
              {
                backgroundColor:
                  selectedStatus === status
                    ? theme.colors.primary
                    : theme.colors.surface,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color:
                    selectedStatus === status
                      ? theme.colors.onPrimary
                      : theme.colors.onSurfaceVariant,
                },
              ]}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {filteredData.map((item) => (
            <ApprovalCard key={item.id} data={item} />
          ))}
        </View>
      </ScrollView>

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
  section: { gap: wp("2%"), flex: 1 },
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
    paddingHorizontal: wp("1%"),
    paddingBottom: wp("2%"),
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
