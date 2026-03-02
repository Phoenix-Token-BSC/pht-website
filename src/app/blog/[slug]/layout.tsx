import { Metadata } from "next";
import { adminDb } from "@/lib/firebase/admin";

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

async function getArticleBySlug(slug: string) {
  try {
    // Query by slug field
    const snapshot = await adminDb
      .collection("news")
      .where("slug", "==", slug)
      .where("isPublished", "==", true)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as {
        id: string;
        title: string;
        excerpt: string;
        content: string;
        imageUrl?: string;
        category?: string;
        slug: string;
        seo?: {
          metaTitle?: string;
          metaDescription?: string;
          keywords?: string[];
        };
        author: { email: string; name?: string; photoURL?: string };
      };
    }

    // Fallback: try by document ID (legacy support)
    const docRef = adminDb.collection("news").doc(slug);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      return { id: docSnap.id, ...docSnap.data() } as {
        id: string;
        title: string;
        excerpt: string;
        content: string;
        imageUrl?: string;
        category?: string;
        slug: string;
        seo?: {
          metaTitle?: string;
          metaDescription?: string;
          keywords?: string[];
        };
        author: { email: string; name?: string; photoURL?: string };
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching article for metadata:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Phoenix Token",
      description: "The requested blog article could not be found.",
    };
  }

  const title = article.seo?.metaTitle || article.title;
  const description =
    article.seo?.metaDescription ||
    article.excerpt ||
    article.content
      .replace(/[#*_~`>\-\[\]()!]/g, "")
      .slice(0, 160)
      .trim();
  const imageUrl = article.imageUrl;
  const keywords = article.seo?.keywords || [];

  return {
    title: `${title} | Phoenix Token Blog`,
    description,
    keywords,
    authors: article.author?.name ? [{ name: article.author.name }] : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function BlogPostLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}
