import test from 'node:test';
import assert from 'node:assert/strict';
import { alpineGtTour } from '../src/data/tours.js';
import { getEnquiryTour } from '../src/data/enquiries.js';

test('known event queries resolve to shared tour data', () => {
  assert.equal(getEnquiryTour('?tour=alpine-gt-2027'), alpineGtTour);
  assert.equal(getEnquiryTour('?source=home&tour=alpine-gt-2027'), alpineGtTour);
});

test('missing and unknown events resolve to general enquiries', () => {
  for (const search of ['', '?tour=', '?tour=unknown', '?tour=%3Cscript%3E']) {
    assert.equal(getEnquiryTour(search), null);
  }
});
