"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaCalendarAlt, FaUser, FaTag, FaArrowRight, FaSpinner } from "react-icons/fa";
import { NewsService, NewsArticle } from "@/services/news.service";
import { format } from "date-fns";

const CATEGORIES = ["All", "Development", "Updates", "Tutorial", "Community", "Education"];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await NewsService.getPublished();
                setPosts(data);
            } catch (error) {
                console.error("Failed to load blog posts");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Featured Logic: First post is featured
    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    const filteredPosts = otherPosts.filter((post) => {
        const postCategory = post.category || "General";
        const matchesCategory = activeCategory === "All" || postCategory === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#250000] text-white selection:bg-orange-500 selection:text-white">
           

            <main className="pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-orange-500 mb-6 font-[family-name:var(--font-fuzzy-bubbles)]">
                        Phoenix Blog
                    </h1>
                    <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Insights, updates, and stories from the Phoenix Token ecosystem.
                        Stay ahead of the curve with our latest articles.
                    </p>
                </section>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <FaSpinner className="animate-spin text-4xl text-orange-500" />
                    </div>
                ) : (
                    <>
                        {/* Featured Post */}
                        {featuredPost && (
                            <section className="mb-20">
                                <div className="group relative rounded-3xl overflow-hidden border border-orange-500/30 bg-gradient-to-br from-neutral-900/80 to-black/80 backdrop-blur-xl hover:border-orange-500/60 transition-all duration-300 shadow-2xl hover:shadow-orange-500/20">
                                    <div className="grid md:grid-cols-2 gap-0">
                                        <div className="relative h-64 md:h-auto overflow-hidden bg-neutral-900">
                                            {featuredPost.imageUrl ? (
                                                <Image
                                                    src={featuredPost.imageUrl}
                                                    alt={featuredPost.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-neutral-700">No Image</div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                                Featured
                                            </div>
                                        </div>
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="flex items-center gap-4 text-sm text-orange-400 mb-4">
                                                <span className="flex items-center gap-1"><FaCalendarAlt /> {format(featuredPost.publishedAt, "MMM d, yyyy")}</span>
                                                <span className="flex items-center gap-1"><FaTag /> {featuredPost.category || "General"}</span>
                                            </div>
                                            <Link href={`/blog/${featuredPost.id}`} className="block">
                                                <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-orange-500 transition-colors leading-tight">
                                                    {featuredPost.title}
                                                </h2>
                                            </Link>
                                            <p className="text-neutral-300 mb-6 text-lg leading-relaxed line-clamp-3">
                                                {featuredPost.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 overflow-hidden">
                                                        {featuredPost.author.photoURL ? (
                                                            <img src={featuredPost.author.photoURL} alt={featuredPost.author.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <FaUser />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">{featuredPost.author.name || "Admin"}</p>
                                                        <p className="text-xs text-neutral-400">{NewsService.calculateReadTime(featuredPost.content)}</p>
                                                    </div>
                                                </div>
                                                <Link href={`/blog/${featuredPost.id}`} className="flex items-center gap-2 text-orange-500 font-bold hover:translate-x-1 transition-transform">
                                                    Read Article <FaArrowRight />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Search & Filter */}
                        <section className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                            {/* Categories */}
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border ${activeCategory === cat
                                            ? "bg-orange-500 border-orange-500 text-black shadow-lg shadow-orange-500/25 scale-105"
                                            : "bg-transparent border-orange-500/30 text-neutral-400 hover:border-orange-500 hover:text-orange-500"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full md:w-80">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-black/50 border border-orange-500/30 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-neutral-600"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                            </div>
                        </section>

                        {/* Blog Post Grid */}
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post) => (
                                    <article key={post.id} className="group bg-neutral-900/50 border border-orange-500/20 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col h-full">
                                        <div className="relative h-48 overflow-hidden bg-neutral-900">
                                            {post.imageUrl ? (
                                                <Image
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-neutral-700">No Image</div>
                                            )}
                                            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-orange-500 text-xs font-bold px-3 py-1 rounded-lg border border-orange-500/20">
                                                {post.category || "General"}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                                                <span className="flex items-center gap-1"><FaCalendarAlt /> {format(post.publishedAt, "MMM d, yyyy")}</span>
                                                <span>•</span>
                                                <span>{NewsService.calculateReadTime(post.content)}</span>
                                            </div>
                                            <Link href={`/blog/${post.id}`} className="block mb-3">
                                                <h3 className="text-xl font-bold leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                            </Link>
                                            <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-neutral-300 overflow-hidden">
                                                        {post.author.photoURL ? (
                                                            <img src={post.author.photoURL} alt={post.author.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <FaUser />
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-neutral-400 font-medium">{post.author.name || "Admin"}</span>
                                                </div>
                                                <Link href={`/blog/${post.id}`} className="text-orange-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 -translate-x-2 group-hover:translate-x-0 duration-300">
                                                    Read <FaArrowRight size={12} />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-neutral-900/30 rounded-3xl border border-dashed border-neutral-800">
                                {posts.length === 0 ? (
                                    <>
                                        <div className="bg-neutral-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FaSearch className="text-3xl text-neutral-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-300 mb-2">No articles yet</h3>
                                        <p className="text-neutral-500">Check back soon for updates!</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-neutral-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FaSearch className="text-3xl text-neutral-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-300 mb-2">No articles found</h3>
                                        <p className="text-neutral-500">Try adjusting your search or category filter.</p>
                                        <button
                                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                                            className="mt-6 px-6 py-2 bg-orange-500/10 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-black font-bold transition-all"
                                        >
                                            Clear Filters
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </>
                )}

            </main>

           
        </div>
    );
}
