import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeadlineCard from "@/components/headline-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { Article, newsApiService } from "@/service/newsAPI.service";

const CATEGORIES = ["general", "business", "health", "science", "technology"];

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("general");

  useEffect(() => {
    fetchHeadlines(selectedCategory);
  }, [selectedCategory]);

  const fetchHeadlines = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsApiService.getTopHeadlines(category);
      setArticles(data);
    } catch (err) {
      setError("Failed to load headlines");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Current Affairs
        </ThemedText>

        {/* Categories Tab */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
            >
              <ThemedText
                type="default"
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        {/* Headlines List */}
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : error ? (
          <ThemedText type="default" style={styles.error}>
            {error}
          </ThemedText>
        ) : (
          <FlatList
            data={articles}
            renderItem={({ item }) => <HeadlineCard article={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            style={styles.newsList}
            contentContainerStyle={styles.newsListContent}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    marginTop: Spacing.three,
    textAlign: "center",
  },
  categoriesScroll: {
    marginVertical: Spacing.two,
  },
  categoriesContent: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.one,
  },
  categoryButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: Spacing.four,
  },
  newsList: {
    flex: 1,
  },
  newsListContent: {
    paddingVertical: Spacing.two,
  },
});
