import AnnouncementList from "@/components/a/announcementList";
import UserCard from "@/components/a/userCardd";
import AnnouncementFAB from "@/components/announcementFAB";
import SkeletonLoad from "@/components/skeletonLoadd";
import TopFAB from "@/components/topFAB";
import { useTabVisibility } from "@/contexts/bottomContext";
import { useScrollDirection } from "@/hooks/useBottomNav";
import { useToast } from "@/hooks/useToast";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function NotificationPage() {
  const theme = useTheme();
  const { direction, onScroll } = useScrollDirection();
  const { setHideTabBar } = useTabVisibility();
  const { showToast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const [showFab, setShowFab] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (direction === "down") setHideTabBar(true);
    if (direction === "up") setHideTabBar(false);
  }, [direction, setHideTabBar]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast({ message: "Notification refreshed!", type: "success" });
    }, 800);
  }, [showToast]);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowFab(scrollY > wp("25%"));
    setShowAnnouncement(scrollY <= wp("25%"));
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={{ backgroundColor: theme.colors.surface }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          onScroll(e);
          handleScroll(e);
        }}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View
          style={[styles.full, { backgroundColor: theme.colors.background }]}
        >
          <UserCard />
          <View style={styles.body}>
            {loading ? (
              <SkeletonLoad />
            ) : (
              <>
                <AnnouncementList />
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <TopFAB visible={showFab} scrollRef={scrollRef} />
      <AnnouncementFAB
        visible={showAnnouncement}
        onPress={() => {
          showToast({ message: "Create new announcement", type: "info" });
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  full: {
    flex: 1,
    paddingBottom: Platform.OS === "android" ? wp("10%") : wp("26%"),
  },
  body: {
    width: "100%",
    paddingHorizontal: wp("4%"),
    gap: wp("2%"),
  },
});
