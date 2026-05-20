import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

interface GitHubStatsProps {
  githubData: {
    profile: {
      publicRepos: number;
      followers: number;
      following: number;
      avatarUrl: string;
    };
    repos: {
      id: number;
      name: string;
      description: string;
      url: string;
      language: string;
      stars: number;
      updatedAt: string;
    }[];
  } | null;
}

export default function GitHubStats({ githubData }: GitHubStatsProps) {
  if (!githubData) return null;

  return (
    <div className="github-section py-5">
      <div className="container">
        <h2 className="text-center mb-5"><span className="text-white">Live</span> <span style={{ color: "#2Ea1FF" }}>GitHub</span> <span className="text-white">Activity</span></h2>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="github-profile-card h-100 p-4 shadow text-center text-white d-flex flex-column align-items-center justify-content-center">
              <img src={githubData.profile.avatarUrl} alt="GitHub Avatar" className="github-avatar mb-3" />
              <h4 className="mb-1">@KurtKhris</h4>
              <p className="text-muted small mb-4">Live from GitHub API</p>
              
              <div className="d-flex justify-content-around w-100">
                <div className="gh-stat text-center">
                  <BookmarksIcon style={{ color: "#F7DF1E" }} />
                  <h4 className="mt-2 mb-0">{githubData.profile.publicRepos}</h4>
                  <p className="text-muted small">Repos</p>
                </div>
                <div className="gh-stat text-center">
                  <PeopleOutlineIcon style={{ color: "#2Ea1FF" }} />
                  <h4 className="mt-2 mb-0">{githubData.profile.followers}</h4>
                  <p className="text-muted small">Followers</p>
                </div>
              </div>

              <a href="https://github.com/KurtKhris" target="_blank" rel="noreferrer" className="btn btn-outline-light w-100 mt-4 rounded-pill">
                <GitHubIcon fontSize="small" className="me-2" /> View Profile
              </a>
            </div>
          </div>

          <div className="col-md-8">
            <h5 className="text-white mb-3"><FolderOpenIcon className="me-2" style={{ color: "var(--accent-from)" }} /> Recently Updated Repositories</h5>
            <div className="row g-3">
              {githubData.repos.map(repo => (
                <div className="col-sm-6" key={repo.id}>
                  <a href={repo.url} target="_blank" rel="noreferrer" className="text-decoration-none">
                    <div className="github-repo-card p-3 shadow h-100 transition-all">
                      <h6 className="repo-name text-white mb-2 d-flex justify-content-between align-items-center">
                        <span className="text-truncate">{repo.name}</span>
                        {repo.stars > 0 && <span className="badge bg-dark border border-secondary text-warning d-flex align-items-center"><StarOutlineIcon fontSize="small" className="me-1" /> {repo.stars}</span>}
                      </h6>
                      <p className="repo-desc text-muted small text-truncate-2 mb-3">
                        {repo.description || "No description provided."}
                      </p>
                      <div className="repo-meta d-flex justify-content-between align-items-center mt-auto">
                        <span className="badge" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}>
                          <span className="gh-lang-dot"></span> {repo.language || "Markdown"}
                        </span>
                        <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                          {new Date(repo.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
