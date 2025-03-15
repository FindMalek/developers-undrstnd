import type { Metadata } from "next"
import { showBetaFeature } from "@undrstnd/feature-flags"
import { getDictionary } from "@undrstnd/internationalization"
import { createMetadata } from "@undrstnd/seo/metadata"

import { Cases } from "./components/cases"
import { CTA } from "./components/cta"
import { FAQ } from "./components/faq"
import { Features } from "./components/features"
import { Hero } from "./components/hero"
import { Stats } from "./components/stats"
import { Testimonials } from "./components/testimonials"

type HomeProps = {
  params: Promise<{
    locale: string
  }>
}

export const generateMetadata = async ({
  params,
}: HomeProps): Promise<Metadata> => {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return createMetadata(dictionary.web.home.meta)
}

const Home = async ({ params }: HomeProps) => {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const betaFeature = await showBetaFeature()

  return (
    <>
      {betaFeature && (
        <div className="w-full bg-black py-2 text-center text-white">
          Beta feature now available
        </div>
      )}
      <Hero dictionary={dictionary} />
      <Cases dictionary={dictionary} />
      <Features dictionary={dictionary} />
      <Stats dictionary={dictionary} />
      <Testimonials dictionary={dictionary} />
      <FAQ dictionary={dictionary} />
      <CTA dictionary={dictionary} />
    </>
  )
}

export default Home
