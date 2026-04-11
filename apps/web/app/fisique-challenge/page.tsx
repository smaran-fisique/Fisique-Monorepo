import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import FisiqueChallengeContent from '@/components/pages/FisiqueChallengeContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/fisique-challenge');
  return buildMetadata(seo, {
    title: 'Fisique Champions Challenge | Win a Garmin Vivoactive 5',
    description: 'Compete, refer, and climb the leaderboard to win premium rewards at Fisique Fitness Kokapet.',
    path: '/fisique-challenge',
  });
}

export const revalidate = 3600;

export default function FisiqueChallengesPage() {
  return (
    <Suspense>
      <FisiqueChallengeContent />
    </Suspense>
  );
}
