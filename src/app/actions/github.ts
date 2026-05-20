export async function getGitHubStats() {
  const username = "KurtKhris";
  try {
    // Fetch profile data
    const profileRes = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    // Fetch recent repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!profileRes.ok || !reposRes.ok) {
      return null;
    }

    const profileData = await profileRes.json();
    const reposData = await reposRes.json();

    return {
      profile: {
        publicRepos: profileData.public_repos,
        followers: profileData.followers,
        following: profileData.following,
        avatarUrl: profileData.avatar_url,
      },
      repos: reposData.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
      })),
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
}
