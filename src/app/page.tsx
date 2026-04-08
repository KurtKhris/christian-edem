import React from 'react';
import { Home } from '../screens/Home';
import { getProjects } from './actions/portfolio';
import { getSkills } from './actions/skills';

export const revalidate = 0; // Dynamic route

export default async function Page() {
  const dbProjects = await getProjects();
  const dbSkills = await getSkills();
  
  const visibleProjects = dbProjects.filter((p: any) => p.isVisible);
  const visibleSkills = dbSkills.filter((s: any) => s.isVisible);

  return (
    <div className="container-fluid">
      <Home initialProjects={visibleProjects} initialSkills={visibleSkills} />
    </div>
  );
}
