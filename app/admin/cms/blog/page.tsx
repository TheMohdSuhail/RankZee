"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { sampleBlogPosts, BlogPostItem } from "@/lib/data/sample-blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminCmsBlogPage() {
  const { success, error } = useToast();
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPostItem> | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "blogPosts"));
      if (!snap.empty) {
        const list: BlogPostItem[] = snap.docs.map((d) => ({
          ...(d.data() as BlogPostItem),
          slug: d.id,
        }));
        setPosts(list);
      } else {
        setPosts(sampleBlogPosts);
      }
    } catch {
      setPosts(sampleBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (post: BlogPostItem) => {
    const updated = !post.published;
    try {
      await updateDoc(doc(db, "blogPosts", post.slug), { published: updated });
    } catch {
      // optimistic
    }
    setPosts((prev) =>
      prev.map((p) => (p.slug === post.slug ? { ...p, published: updated } : p))
    );
    success("Status Updated", `Post marked as ${updated ? "Published" : "Draft"}`);
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Delete this blog article permanently?")) return;
    try {
      await deleteDoc(doc(db, "blogPosts", slug));
    } catch {
      // optimistic
    }
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
    success("Post Deleted", "Article removed.");
  };

  const handleOpenEdit = (post?: BlogPostItem) => {
    if (post) {
      setEditingPost(post);
      setTagsInput(post.tags ? post.tags.join(", ") : "");
    } else {
      setEditingPost({
        slug: "",
        title: "",
        excerpt: "",
        content: "# Heading\n\nWrite your markdown content here...",
        coverImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80",
        author: {
          name: "Aman Sharma",
          role: "Head of SEO",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        readTime: "5 min read",
        publishedAt: new Date().toISOString().split("T")[0],
        published: true,
      });
      setTagsInput("SEO, Growth");
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.slug || !editingPost?.title) {
      error("Missing Fields", "Slug and Title are required.");
      return;
    }
    setSaving(true);
    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const fullPost: BlogPostItem = {
      slug: editingPost.slug.toLowerCase().trim(),
      title: editingPost.title.trim(),
      excerpt: editingPost.excerpt || "",
      content: editingPost.content || "",
      coverImage: editingPost.coverImage || "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80",
      tags: parsedTags,
      author: editingPost.author || {
        name: "RankZee Team",
        role: "Editorial",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      },
      readTime: editingPost.readTime || "5 min read",
      publishedAt: editingPost.publishedAt || new Date().toISOString().split("T")[0],
      seo: {
        metaTitle: `${editingPost.title} | RankZee Intel`,
        metaDescription: editingPost.excerpt || "",
      },
      published: Boolean(editingPost.published),
    };

    try {
      await setDoc(doc(db, "blogPosts", fullPost.slug), fullPost, { merge: true });
    } catch {
      // optimistic
    }

    setPosts((prev) => {
      const exists = prev.some((p) => p.slug === fullPost.slug);
      if (exists) {
        return prev.map((p) => (p.slug === fullPost.slug ? fullPost : p));
      }
      return [...prev, fullPost];
    });

    setSaving(false);
    setIsModalOpen(false);
    success("Article Saved", "Article updated in Firestore.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
            Blog & Intel CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish thought leadership, technical playbooks, and SEO analyses.
          </p>
        </div>

        <Button size="sm" onClick={() => handleOpenEdit()} className="text-xs font-bold">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          <span>New Article</span>
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-white">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 font-mono">
                  <th className="py-3 px-4">Article Title</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Date & Read Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => (
                  <tr key={post.slug} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">
                      <div>{post.title}</div>
                      <span className="text-[11px] text-cyan-300 font-mono">/blog/{post.slug}</span>
                    </td>

                    <td className="py-3 px-4 text-slate-300">{post.author?.name}</td>

                    <td className="py-3 px-4 text-slate-400">
                      {post.publishedAt} ({post.readTime})
                    </td>

                    <td className="py-3 px-4">
                      <Badge variant={post.published ? "success" : "secondary"} className="text-[10px]">
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                        >
                          {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
                        </button>
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal */}
      {isModalOpen && editingPost && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingPost.title ? `Edit Article: ${editingPost.title}` : "New Blog Article"}
          className="max-w-2xl"
        >
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
              <Input
                value={editingPost.title || ""}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                required
                className="text-xs h-9"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Slug *</label>
                <Input
                  value={editingPost.slug || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  required
                  className="text-xs h-9 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma-separated)</label>
                <Input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="text-xs h-9"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Summary Excerpt</label>
              <Textarea
                rows={2}
                value={editingPost.excerpt || ""}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Markdown Content Body</label>
              <Textarea
                rows={6}
                value={editingPost.content || ""}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                className="text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Image URL</label>
              <Input
                value={editingPost.coverImage || ""}
                onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                className="text-xs h-9"
              />
            </div>

            <Button type="submit" disabled={saving} size="sm" className="w-full font-bold">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save Article to CMS"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}

