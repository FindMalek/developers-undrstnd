import type { Metadata } from "next"

import { site } from "@/lib/config"

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || site.url}${path}`
}

export function constructMetadata({
  title = site.name,
  description = site.description,
  image = absoluteUrl("/og"),
  ...props
}: {
  title?: string
  description?: string
  image?: string
  [key: string]: Metadata[keyof Metadata]
}): Metadata {
  return {
    title: {
      template: `%s | ${site.name}`,
      default: site.name,
    },
    description: description || site.description,
    keywords: site.keywords,
    openGraph: {
      title,
      description,
      url: site.url,
      siteName: site.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    icons: "/favicon.ico",
    metadataBase: new URL(site.url),
    authors: [
      {
        name: site.name,
        url: site.url,
      },
    ],
    ...props,
  }
}
