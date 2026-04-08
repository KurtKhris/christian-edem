import React from 'react';
import { getSkills, deleteSkill } from '../../actions/skills';
import { SkillsClient } from './SkillsClient';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';

export const revalidate = 0;

export default async function AdminSkills() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/api/auth/signin');
  }

  const dbSkills = await getSkills();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">Manage Tech Skills</h2>
      </div>
      <SkillsClient initialSkills={dbSkills} />
    </div>
  );
}
