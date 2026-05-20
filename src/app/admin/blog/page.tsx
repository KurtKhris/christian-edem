'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BuildIcon from '@mui/icons-material/Build';
import {
  getAllPosts, createPost, updatePost,
  deletePost, togglePostVisibility
} from '../../actions/blog';
import AdminHeader from '../components/AdminHeader';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: '',
    title: '',
    content: '',
    excerpt: '',
    isVisible: true
  });
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentPost({ id: '', title: '', content: '', excerpt: '', isVisible: true });
    setIsEditing(false);
    setIsPreview(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData();
    formData.append('title', currentPost.title);
    formData.append('content', currentPost.content);
    formData.append('excerpt', currentPost.excerpt);
    formData.append('isVisible', currentPost.isVisible.toString());

    try {
      if (currentPost.id) {
        await updatePost(currentPost.id, formData);
        toast.success('Post updated successfully!');
      } else {
        await createPost(formData);
        toast.success('Post created successfully!');
      }
      handleReset();
      fetchPosts();
    } catch (error) {
      toast.error('Error saving post');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (post: any) => {
    setCurrentPost({
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      isVisible: post.isVisible
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      try {
        await deletePost(id);
        toast.success('Post deleted');
        fetchPosts();
      } catch (error) {
        toast.error('Error deleting post');
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-content">
        <AdminHeader title="Blog" userName="Christian Edem" />
        <div className="admin-loading">
          <div className="admin-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <AdminHeader title="Blog" userName="Christian Edem" />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="admin-badge admin-badge-purple">{posts.length} posts</span>
        {!isEditing && (
          <button className="admin-btn admin-btn-primary" onClick={() => setIsEditing(true)}>
            + New Post
          </button>
        )}
      </div>

      {isEditing && (
        <div className="admin-card mb-5">
          <div className="admin-card-header">
            <h3 className="admin-card-title">{currentPost.id ? 'Edit Post' : 'Create New Post'}</h3>
            <div className="d-flex gap-2">
              <button
                type="button"
                className={`admin-btn admin-btn-sm ${isPreview ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                onClick={() => setIsPreview(!isPreview)}
              >
                {isPreview ? <><BuildIcon fontSize="small" /> Edit Mode</> : 'Preview Mode'}
              </button>
              <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={handleReset}>
                Cancel
              </button>
            </div>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label className="admin-label">Post Title</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Mastering React Server Components"
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Excerpt (Short Summary)</label>
                <textarea
                  className="admin-input admin-textarea"
                  rows={2}
                  placeholder="A brief summary for the blog listing page..."
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Content (Markdown Support)</label>
                
                {isPreview ? (
                  <div className="markdown-preview" style={{
                    minHeight: '300px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: 'var(--admin-radius-sm)',
                    padding: '1.5rem'
                  }}>
                    <ReactMarkdown>
                      {currentPost.content || '*Nothing to preview yet...*'}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <textarea
                    className="admin-input admin-textarea"
                    rows={15}
                    placeholder="Write your article in Markdown here..."
                    value={currentPost.content}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    required
                    style={{ fontFamily: "'Courier New', monospace", fontSize: '0.9rem' }}
                  />
                )}
              </div>

              <div className="d-flex align-items-center gap-4">
                <label className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={currentPost.isVisible}
                    onChange={(e) => setCurrentPost({ ...currentPost, isVisible: e.target.checked })}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ fontSize: '0.9rem' }}>Published</span>
                </label>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : (currentPost.id ? 'Update Post' : 'Publish Post')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Posts</h3>
        </div>
        <div className="admin-card-body" style={{ padding: 0 }}>
          {posts.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">📝</div>
              <h3 className="admin-empty-title">No posts yet</h3>
              <p className="admin-empty-text">Create your first blog post</p>
              <button className="admin-btn admin-btn-primary" onClick={() => setIsEditing(true)}>
                + New Post
              </button>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th style={{ width: '100px' }}>Status</th>
                  <th style={{ width: '120px' }}>Created</th>
                  <th style={{ width: '140px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="fw-600">{post.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                        slug: /{post.slug}
                      </div>
                    </td>
                    <td>
                      {post.isVisible ? (
                        <span className="admin-badge admin-badge-success">Published</span>
                      ) : (
                        <span className="admin-badge admin-badge-warning">Draft</span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className={`admin-btn admin-btn-sm admin-btn-icon ${
                            post.isVisible ? 'admin-btn-success' : 'admin-btn-secondary'
                          }`}
                          title="Toggle Visibility"
                          onClick={async () => {
                            await togglePostVisibility(post.id, post.isVisible);
                            fetchPosts();
                          }}
                        >
                          {post.isVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                        </button>
                        <button
                          className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                          title="Edit"
                          onClick={() => startEdit(post)}
                        >
                          <EditIcon fontSize="small" />
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                          title="Delete"
                          onClick={() => handleDelete(post.id, post.title)}
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <style jsx>{`
        .fw-600 {
          font-weight: 600;
        }
        .markdown-preview h1,
        .markdown-preview h2,
        .markdown-preview h3 {
          margin-top: 1.5rem;
          color: #fff;
        }
        .markdown-preview p {
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
        }
        .markdown-preview code {
          background: rgba(255,255,255,0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
        }
        .markdown-preview pre {
          background: #111;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}