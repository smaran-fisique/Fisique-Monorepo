import { OfferEntrantsClient } from '@/components/admin/OfferEntrantsClient';

export default function OfferEntrantsPage({ params }: { params: { offerId: string } }) {
  return <OfferEntrantsClient offerId={params.offerId} />;
}
