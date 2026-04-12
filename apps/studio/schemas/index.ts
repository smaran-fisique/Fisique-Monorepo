import { post } from './post'
import { category } from './category'
import { gymLocation } from './gymLocation'
import { testimonial } from './testimonial'
import { offer } from './offer'
import { siteSettings } from './siteSettings'
import { program } from './program'
import { trainer } from './trainer'
import { legalPage } from './legalPage'
import { announcement } from './announcement'
import { challenge } from './challenge'

export const schemaTypes = [
  // Content
  post,
  category,
  // Site
  gymLocation,
  trainer,
  program,
  testimonial,
  offer,
  announcement,
  challenge,
  legalPage,
  siteSettings,
]
