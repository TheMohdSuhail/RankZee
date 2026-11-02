import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { sampleBlogPosts, BlogPostItem } from "@/lib/data/sample-blog";
import { adminDb } from "@/lib/firebase/admin";
import { Badge } from "@/components/ui/badge";
import { StructuredData } from "@/components/seo/structured-data";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

interface Props {
  params: { slug: string };
}

async function getBlogPost(slug: string): Promise<BlogPostItem | null> {
  try {
    const snap = await adminDb().collection("blogPosts").doc(slug).get();
    if (snap.exists) {
      return snap.data() as BlogPostItem;
    }
  } catch {
    // fallback
  }
  return sampleBlogPosts.find((p) => p.slug === slug) || null;
}

export async function generateStaticParams() {
  return sampleBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.seo?.metaTitle || `${post.title} | RankZee Intel`,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [post.coverImage || `/api/og?title=${encodeURIComponent(post.title)}`],
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-800 min-h-screen">
      {/* Schema Markup for Article */}
      <StructuredData
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: [post.coverImage],
          datePublished: post.publishedAt,
          author: {
            "@type": "Person",
            name: post.author.name,
            jobTitle: post.author.role,
          },
          publisher: {
            "@type": "Organization",
            name: "RankZee Digital Solutions",
          },
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="neon" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author & Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-slate-900 font-sans text-sm">{post.author.name}</p>
              <p className="text-[11px] text-blue-600 font-sans font-medium">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{post.publishedAt}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden border border-slate-200/80 mb-12 shadow-sm">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Markdown Content Body */}
        <div className="mb-16">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Author Bio Box */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left mb-16">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shrink-0">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Written by {post.author.name}</h3>
            <p className="text-xs text-blue-600 font-medium mb-2">{post.author.role}</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Senior growth strategist specializing in enterprise search engine positioning, algorithmic ad delivery, and technical performance marketing.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
