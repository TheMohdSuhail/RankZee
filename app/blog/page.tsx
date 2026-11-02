import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sampleBlogPosts } from "@/lib/data/sample-blog";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Growth Intel & Digital Marketing Insights | RankZee Blog",
  description: "Tested SEO frameworks, Meta Advantage+ blueprints, and Core Web Vitals guides from senior performance engineers.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogListingPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="neon" className="mb-3 uppercase tracking-wider text-xs">
            Growth Intel
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight mb-6">
            Actionable <span className="text-neon-gradient">Marketing Science</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Zero theoretical filler. Battle-tested playbooks, algorithmic analyses, and technical teardowns from the front lines of digital growth.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {sampleBlogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="backdrop-blur-md bg-white/90 text-blue-700 border-blue-200 text-[10px] font-semibold">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{post.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>

                  <h2 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-slate-700 font-medium">{post.author.name}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
