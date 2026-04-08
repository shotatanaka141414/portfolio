import { listClientLogos } from "@/lib/home-client-logos";

import { ClientsMarqueeTrack } from "./ClientsMarqueeTrack";

export function ClientsMarquee() {
  const logos = listClientLogos();
  return <ClientsMarqueeTrack logos={logos} />;
}
