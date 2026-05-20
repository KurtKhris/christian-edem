import { notFound } from "next/navigation";
import NavBars from "../../../components/NavBars";
import { Footer } from "../../../components/footer";
import { getPostBySlug } from "../../actions/blog";
import BlogPostClient from "./BlogPostClient";

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post || !post.isVisible) {
    notFound();
  }

  return (
    <div className="blog-post-page" style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <NavBars />
      <BlogPostClient post={post} />
      <Footer />
    </div>
  );
}
