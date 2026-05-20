import React from "react";
import { notFound } from "next/navigation";
import BlogContent from "./BlogContent";
import NavBars from "../../../components/NavBars";
import { Footer } from "../../../components/footer";
import { getPostBySlug } from "../../actions/blog";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

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

      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <Link href="/blog" className="btn btn-link text-decoration-none text-muted mb-4 p-0 d-inline-flex align-items-center">
              <ArrowBackIcon fontSize="small" className="me-2" /> Back to Blog
            </Link>

            <header className="mb-5">
              <div className="d-flex align-items-center text-muted mb-3">
                <CalendarTodayIcon fontSize="inherit" className="me-2" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </div>
              <h1 className="display-4 fw-bold text-white mb-3">{post.title}</h1>
              {post.excerpt && (
                <p className="lead text-muted border-start border-primary border-4 ps-3">
                  {post.excerpt}
                </p>
              )}
            </header>

            <article className="post-content text-white">
              <BlogContent content={post.content} />
            </article>

            <div className="mt-5 pt-5 border-top border-secondary">
              <div className="bg-dark p-4 rounded-4 d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="text-white mb-1">Enjoyed this article?</h5>
                  <p className="text-muted small mb-0">Check out more of my thoughts on web development.</p>
                </div>
                <Link href="/blog" className="btn btn-primary px-4">Browse More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
