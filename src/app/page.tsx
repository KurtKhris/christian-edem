import React from 'react';
import { Home } from '../screens/Home';
import { getProjects } from './actions/portfolio';
import { getSkills } from './actions/skills';
import { getEducation, getWorkExperience } from './actions/resume';
import { getVisibleTestimonials } from './actions/testimonials';

export const revalidate = 0;

export default async function Page() {
  const [dbProjects, dbSkills, dbEducation, dbWork, testimonials] = await Promise.all([
    getProjects(), getSkills(), getEducation(), getWorkExperience(), getVisibleTestimonials()
  ]);

  return (
    <div className="container-fluid">
      <Home
        initialProjects={dbProjects.filter((p: any) => p.isVisible)}
        initialSkills={dbSkills.filter((s: any) => s.isVisible)}
        initialEducation={dbEducation.filter((e: any) => e.isVisible)}
        initialWork={dbWork.filter((w: any) => w.isVisible)}
        testimonials={testimonials}
      />
    </div>
  );
}
