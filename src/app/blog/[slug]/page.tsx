"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { NewsService, NewsArticle } from "@/services/news.service";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;
    // Slug is now the actual slug field, or falling back to ID if not found in updated getBySlug
    // In a real SEO optimized app, we would query by slug field.

    const [post, setPost] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            try {
                const data = await NewsService.getBySlug(slug as string);
                if (!data) {
                    router.push("/blog"); // Redirect if not found
                    return;
                }
                setPost(data);
            } catch (error) {
                console.error("Failed to load blog post", error);
                router.push("/blog");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#250000] text-white flex items-center justify-center">
                <FaSpinner className="animate-spin text-4xl text-orange-500" />
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="min-h-screen bg-[#250000] text-white selection:bg-orange-500 selection:text-white">
           

            <article className="pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-bold mb-8 transition-colors"
                >
                    <FaArrowLeft /> Back to Blog
                </Link>

                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-orange-400 mb-6">
                        <span className="flex items-center gap-1"><FaCalendarAlt /> {format(post.publishedAt, "MMM d, yyyy")}</span>
                        <span className="flex items-center gap-1"><FaTag /> {post.category || "General"}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-400">{NewsService.calculateReadTime(post.content)}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-3 mb-10">
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 overflow-hidden">
                            {post.author.photoURL ? (
                                <img src={post.author.photoURL} alt={post.author.name} className="w-full h-full object-cover" />
                            ) : (
                                <FaUser />
                            )}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-white">{post.author.name || "Admin"}</p>
                            <p className="text-xs text-neutral-400">Author</p>
                        </div>
                    </div>

                    {post.imageUrl && (
                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-orange-500/20 shadow-2xl">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                <div className="max-w-none text-neutral-200">
                    <ReactMarkdown
                        components={{
                            h1: ({ node, ...props }) => <h1 className="text-white text-3xl md:text-4xl font-bold mb-6 mt-8 leading-tight" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 mt-8 leading-tight" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-white text-xl md:text-2xl font-bold mb-4 mt-6 leading-snug" {...props} />,
                            p: ({ node, ...props }) => <p className="mb-6 font-light leading-relaxed text-lg text-neutral-200" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-6 space-y-2 text-neutral-200" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-neutral-200" {...props} />,
                            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                            strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-orange-500 pl-4 py-2 my-6 italic bg-orange-500/10 rounded-r-lg text-neutral-300" {...props} />,
                            a: ({ node, ...props }) => <a className="text-orange-500 hover:text-orange-400 font-medium hover:underline transition-colors" {...props} />,
                            img: ({ node, ...props }) => <img className="rounded-2xl my-8 w-full border border-orange-500/20" {...props} />,
                            code: ({ node, ...props }) => <code className="bg-black/30 text-orange-400 px-1.5 py-0.5 rounded font-mono text-sm border border-orange-500/20" {...props} />,
                            pre: ({ node, ...props }) => <pre className="bg-black/50 p-4 rounded-xl overflow-x-auto mb-6 border border-orange-500/20" {...props} />,
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>

        </div>
    );
}
