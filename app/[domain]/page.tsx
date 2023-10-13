import { getSiteData } from "@/lib/fetchers";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);
  if (!data) {
    return null;
  }
  const {
    pageTitle: title,
    description,
    image,
    logo,
  } = data as {
    pageTitle: string;
    description: string;
    image: string;
    logo: string;
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@vercel",
    },
    icons: [logo],
    metadataBase: new URL(`https://${domain}`),
    // Optional: Set canonical URL to custom domain if it exists
    ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
      data.customDomain && {
        alternates: {
          canonical: `https://${data.customDomain}`,
        },
      }),
  };
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const data = await getSiteData(params.domain);

  return (
    <iframe
      className="min-h-screen w-full border-none"
      src={"https://x-frame-options.vercel.app/?url=" + data?.targetUrl}
    />
  );
}
