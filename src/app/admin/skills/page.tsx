import React from 'react';
import { getSkills, deleteSkill } from '../../actions/skills';
import { SkillsClient } from './SkillsClient';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import AdminHeader from '../components/AdminHeader';

export const revalidate = 0;

export default async function AdminSkills() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/api/auth/signin');
  }

  const dbSkills = await getSkills();

  return (
    <div className="admin-content">
      <AdminHeader title="Tech Skills" userName="Christian Edem" />
      <SkillsClient initialSkills={dbSkills} />
    </div>
  );
}