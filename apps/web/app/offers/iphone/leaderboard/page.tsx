import type { Metadata } from 'next';
import IPhoneLeaderboardContent from '@/components/pages/IPhoneLeaderboardContent';

export const metadata: Metadata = {
  title: 'iPhone Draw Leaderboard | Fisique Fitness Kokapet',
  description: "See who's in the running to win an iPhone at Fisique Fitness Kokapet. Join our 3-month training program to enter the draw!",
  alternates: { canonical: 'https://fisique.fitness/offers/iphone/leaderboard' },
};

export const revalidate = 60;

export default function IPhoneLeaderboardPage() {
  return <IPhoneLeaderboardContent />;
}
