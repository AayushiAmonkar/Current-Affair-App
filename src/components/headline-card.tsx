import { Spacing } from "@/constants/theme";
import { Article } from "@/service/newsAPI.service";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface HeadlineCardProps {
  article: Article;
}

export default function HeadlineCard({ article }: HeadlineCardProps) {
  return (
    <Pressable>
      <ThemedView style={styles.card}>
        {article.urlToImage && (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        )}
        <ThemedView style={styles.content}>
          <ThemedText type="small" style={styles.source}>
            {article.source.name}
          </ThemedText>
          <ThemedText type="default" numberOfLines={2} style={styles.title}>
            {article.title}
          </ThemedText>
          <ThemedText type="small" numberOfLines={2} style={styles.description}>
            {article.description}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: Spacing.two,
    borderRadius: Spacing.three,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.one,
  },
  source: {
    opacity: 0.6,
  },
  title: {
    fontWeight: "600",
  },
  description: {
    opacity: 0.7,
  },
});
