const NEWS_API_KEY = "a9754b9640bf4c9687fbbc9493f95890";
const BASE_URL = "https://newsapi.org/v2";

export interface Article {
  id: string;
  title: string;
  description: string | null;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author?: string | null;
  url: string;
  content?: string | null;
}

interface NewsResponse {
  articles: any[];
  totalResults: number;
  status: string;
}

export const newsApiService = {
  async getTopHeadlines(category: string = "general"): Promise<Article[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/top-headlines?category=${category}&country=us&apiKey=${NEWS_API_KEY}`,
      );
      const data: NewsResponse = await response.json();

      if (data.status !== "ok") {
        throw new Error("Failed to fetch headlines");
      }

      return data.articles.map((article, index) => ({
        ...article,
        id: `${article.source.name}-${index}-${Date.now()}`,
      }));
    } catch (error) {
      console.error("Error fetching headlines:", error);
      throw error;
    }
  },
};
