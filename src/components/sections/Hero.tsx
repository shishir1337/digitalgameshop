import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { HeroClient, type HeroSlide } from './Hero.client'
import { exclusiveOffers } from '@/lib/constants'

export async function Hero() {
  const payload = await getPayload({ config: configPromise })

  // Fetch all published hero slides, ordered by the order field
  const heroSlidesResult = await payload.find({
    collection: 'hero-slides',
    depth: 2, // Populate the image relation
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: 'order',
    limit: 100, // Allow up to 100 slides
  })

  // Transform Payload data to HeroSlide format
  const slides: HeroSlide[] = heroSlidesResult.docs.map((slide) => {
    // Handle image - it can be a Media object or a number (ID)
    const image = typeof slide.image === 'object' && slide.image !== null 
      ? slide.image 
      : (typeof slide.image === 'string' ? slide.image : null)
    
    if (!image) {
      throw new Error(`Hero slide "${slide.title}" has an invalid image`)
    }

    return {
      id: slide.id.toString(),
      image: image as HeroSlide['image'],
      alt: slide.alt,
      link: slide.link,
      color: slide.color,
    }
  })

  // If no slides, return null (or you could show a fallback)
  if (slides.length === 0) {
    return null
  }

  return <HeroClient slides={slides} exclusiveOffers={[...exclusiveOffers]} />
}
