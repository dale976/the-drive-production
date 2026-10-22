# Manual Stripe bookings

The website collects enquiries only. It does not create Stripe products, payment links, invoices or reservations. No Stripe keys, SDK, webhook or database is needed in this application.

## Products

Create the following one-time GBP products in the Stripe Dashboard, with quantity one per booking:

| Product | Price | Use |
|---|---:|---|
| Alpine GT 2027 — deposit | £500 | Reserve one car and two people sharing accommodation after approval and terms acceptance |
| Alpine GT 2027 — balance | £2,795 | Manually invoice the remaining balance, due 30 days before departure |

The package total is £3,295. Keep Dashboard prices and `src/data/tours.js` aligned. The exact departure day has not been published; calculate each invoice deadline from the confirmed departure date.

## Before accepting deposits

The lawyer-approved booking terms are pending. Publish the final terms at a stable URL before sending live payment invitations. Preserve the version used for each booking. Do not use placeholder terms or collect payment before acceptance.

Create a deposit Payment Link through the Dashboard. Configure the terms URL and mandatory terms acceptance in checkout, then verify in Stripe test mode that payment cannot complete with the checkbox unchecked and that the linked terms are the final version. Merely including terms in an email or invoice footer is not the required acceptance gate. Confirm where acceptance evidence is available in your Dashboard and retain it with the booking's terms version before going live.

See Stripe's [Payment Links configuration guide](https://docs.stripe.com/payment-links/customize) and [required terms consent reference](https://docs.stripe.com/api/payment_links/payment_links/object#payment_link_object-consent_collection-terms_of_service). The website's contact-permission checkbox is separate from booking terms acceptance.

## Personal review and reservation

1. Review the emailed event enquiry, including car, ownership and performance-car driving experience. The tour is intended for owners; consider changed circumstances personally in the interests of the whole group.
2. Confirm availability manually before inviting a guest. Send the approved guest the deposit Payment Link personally, explaining the £3,295 total, £500 deposit, £2,795 balance and due date.
3. A personally emailed Payment Link can still be forwarded. Check the payer against the approved enquiry and manage invitations and available spaces manually; there is no identity or capacity enforcement in the website.
4. Check Stripe for a successful £500 payment and terms acceptance before recording the space as reserved. An enquiry, opened link, failed payment or pending payment does not reserve a space. Send the guest their booking confirmation after verifying successful payment.
5. Use the customer's Stripe record for subsequent invoicing. If the deposit is shown as a guest payment rather than a reusable customer, create or reconcile the customer record manually before invoicing; do not assume email alone is a unique customer identifier.
6. Create and send a manual £2,795 balance invoice from the Dashboard in time for payment 30 days before confirmed departure. Apply the £2,795 balance product, not the full £3,295 package total. Manage paid/overdue status, cancellations and refunds manually under the final terms.

See [Stripe Dashboard invoicing](https://docs.stripe.com/invoicing/dashboard).

## Website verification

Use stubbed responses for form testing. Do not email real enquiries or make live payments as part of automated tests. Stripe product creation and checkout configuration require a separate manual check; a successful website build does not verify them.
