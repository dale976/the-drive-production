import { getTourBySlug } from './tours.js';

export function getEnquiryTour(search) {
  return getTourBySlug(new URLSearchParams(search).get('tour'));
}
