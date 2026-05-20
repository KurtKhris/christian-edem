import React from "react";
import Link from "next/link";
import NavBars from "../../components/NavBars";
import { Footer } from "../../components/footer";
import { getVisiblePosts } from "../actions/blog";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const revalidate = 60; // Revalidate every minute

export default async function BlogIndexPage() {
  const posts = await getVisiblePosts();

  return (
    <div className="blog-index-page" style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <NavBars />
      
      <div className="blog-hero py-5 mt-5">
        <div className="container py-5 text-center">
          <span className="section-label mb-2">My Thoughts & Tutorials</span>
          <h1 className="display-4 fw-bold text-white mb-4">Technical <span className="gradient-text">Blog</span></h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Sharing my experiences, insights, and technical guides on web development, software engineering, and modern technologies.
          </p>
        </div>
      </div>

      <div className="container pb-5 mb-5">
        <div className="row g-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="col-md-6 col-lg-4">
                <Link href={`/blog/${post.slug}`} className="text-decoration-none h-100 d-block">
                  <div className="blog-card h-100 p-4 transition-all">
                    <div className="d-flex align-items-center mb-3 text-muted small">
                      <CalendarTodayIcon fontSize="inherit" className="me-2" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>
                    <h3 className="h4 text-white mb-3 fw-bold">{post.title}</h3>
                    <p className="text-muted small mb-4 text-truncate-3">
                      {post.excerpt || "Click to read this insightful technical article..."}
                    </p>
                    <div className="mt-auto pt-2 d-flex align-items-center text-primary fw-bold">
                      Read More <ArrowForwardIcon fontSize="small" className="ms-2" />
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-12 py-5 text-center">
              <div className="bg-dark p-5 rounded-4 border border-secondary">
                <h4 className="text-white mb-2">Coming Soon</h4>
                <p className="text-muted m-0">I'm currently drafting some amazing content. Stay tuned!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
