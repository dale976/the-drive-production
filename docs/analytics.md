# Google Analytics setup

The production measurement ID is configured in `.env.production` as `G-GX3HML0L5J`. Vite includes it during production builds, including Cloudflare builds. This file contains only public configuration; never add secrets to it. Local development remains unconfigured unless you explicitly set an ID in `.env.local`.

1. Create a GA4 web property and stream for the production domain under your own Google account.
2. Set VITE_GA_MEASUREMENT_ID to its G- identifier in the build environment, then rebuild and deploy. This ID is public, not a secret. Without it, analytics and the consent banner are inactive.
3. Turn OFF Enhanced Measurement for this stream. The application sends page views, selected clicks and 90% scroll events itself. Automatic history tracking would duplicate page views; automatic form/link collection could send unintended information.
4. Disable Google Signals, advertising personalisation and user-provided data collection. Set event retention to 2 months. Review the privacy notice against your actual business retention practices and Google account settings before launch.
5. Mark generate_lead as a key event. It fires only after Web3Forms confirms success, never for a submit-button click or failed request.
6. Verify production in GA Realtime: accept analytics, navigate between pages, click register interest and submit a test enquiry. Confirm one page_view per navigation and one generate_lead per successful enquiry. Rejecting analytics must produce no Google Analytics requests. Cookie settings allows withdrawal; withdrawal reloads the page to unload Google’s script.

Events: page_view, view_tour_click, register_interest_click, email_click, social_click, scroll (90%), generate_lead.

No Google Tag Manager container is needed. Do not add another analytics snippet. Query strings, fragments, form values and free-text link labels are not sent. This deliberately omits UTM campaign parameters; automatic source attribution is limited because referrers are also omitted. Add a reviewed campaign allowlist later if campaign reporting is required.

For local testing use .env.local (do not configure a production ID for routine local development). Consent is saved in localStorage; if browser storage is unavailable analytics remains off. Ad blockers and consent choices mean totals are not a complete count of all visitors.
