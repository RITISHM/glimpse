# GLIMPSE Universal Platform

# Implementation Plan

## Implementation Principle

Do not build two products.

The implementation should transform the internal idea of:

``` text
Only photographers create events
```

into:

``` text
Users create collections
```

Commercial users can still create specialized event collections.

The existing React frontend, Express API, FastAPI ML service, Supabase
storage/database, and collection-scoped face matching should be reused.
The current architecture already separates the public Express API from
the internal ML service and stores face data against an event scope,
which can be generalized to a collection scope.
fileciteturn3file0L87-L124 fileciteturn3file7L972-L1012

------------------------------------------------------------------------

# Phase 1 --- Account Type

## Frontend

After signup or on first onboarding, show:

``` text
How will you use GLIMPSE?

[ Personal ]
General photo sharing and discovery

[ Commercial ]
Professional and event-focused use
```

Store the choice through the existing public API.

## Backend

Add to profile:

``` text
account_type
```

Allowed values:

``` text
personal
commercial
```

Default should be selected deliberately by the onboarding flow.

------------------------------------------------------------------------

# Phase 2 --- Plan and Limits

Create a centralized configuration.

Example:

``` javascript
const PLAN_LIMITS = {
  personal_free: {
    maxPhotos: 100,
    maxCollections: 3
  },
  personal_premium: {
    maxPhotos: 1000,
    maxCollections: 20
  },
  commercial_starter: {
    maxPhotos: 1000,
    maxCollections: 10
  },
  commercial_pro: {
    maxPhotos: 10000,
    maxCollections: 100
  }
};
```

These numbers are placeholders and should be changed based on final cost
calculations.

Before upload:

``` text
User
 ↓
Read Account Plan
 ↓
Calculate Current Usage
 ↓
Check Limit
 ↓
Accept Upload OR Return Limit Error
```

Important: validate limits in Express, not only in the frontend.

------------------------------------------------------------------------

# Phase 3 --- Generalize the Event Model

## Fast MVP approach

Do not rename every existing event file and route immediately.

Add:

``` text
collection_type
```

to the existing event/collection record.

Values:

``` text
general
event
```

The UI can display:

-   Create Collection for general users.
-   Create Event for commercial/event users.

Internally, both continue through the same upload pipeline.

## Production refactor later

Generalize:

``` text
events → collections
event_id → collection_id
```

This should be performed carefully through a database migration rather
than a rushed rename.

------------------------------------------------------------------------

# Phase 4 --- Dashboard Adaptation

## Personal

Show:

``` text
My Collections
Upload Allowance
Processing Status
Create Collection
```

## Commercial

Show:

``` text
My Events
Event Upload Allowance
Processing Status
Create Event
```

Both dashboards can reuse the same card, table, upload, and status
components.

------------------------------------------------------------------------

# Phase 5 --- Reuse Upload and ML Pipeline

Current architecture:

``` text
React
  ↓
Express API
  ↓
Storage / Database
  ↓
FastAPI ML Service
```

The React + JavaScript frontend and Express public API are already
defined for the current project, while ML processing remains isolated in
FastAPI. fileciteturn3file0L55-L83 fileciteturn3file0L87-L124

Generalize the processing input:

``` text
collectionId
photos
```

Then:

``` text
Upload Photos
     ↓
Create Processing Job / State
     ↓
Face Detection
     ↓
Face Embeddings
     ↓
Store Against collectionId
     ↓
Update Status
```

The recipient workflow remains collection-scoped.

This follows the current design where guest face searches are restricted
to the current event scope; the same protection should be retained when
generalized to collections. fileciteturn3file8L1158-L1177

------------------------------------------------------------------------

# Phase 6 --- Sharing

Reuse the existing shareable URL concept.

``` text
/g/{collectionId}
```

When opened:

``` text
Resolve Collection
      ↓
Load Collection Metadata
      ↓
Show Consent
      ↓
Capture / Upload Selfie
      ↓
Call Existing Matching Flow
      ↓
Return Results Only From This Collection
```

Commercial event collections can continue using their existing
event-specific URLs, QR codes, and optional NFC workflow.

------------------------------------------------------------------------

# Phase 7 --- Live Status

Use the same real states across all collection types:

``` text
UPLOADING
QUEUED
PROCESSING
READY
FAILED
```

The existing project already defines a true live processing flow from
upload through event readiness; this should simply be reused for
generalized collections. fileciteturn3file3L400-L421

------------------------------------------------------------------------

# Fast Implementation Priority

## Priority 1 --- Must Build

1.  Add account type.
2.  Add plan/limit configuration.
3.  Add upload validation.
4.  Add general/event collection type.
5.  Reuse current upload flow.
6.  Reuse current ML flow.
7.  Update dashboard labels.

## Priority 2 --- Strong Demo Value

1.  Show Personal vs Commercial onboarding.
2.  Display current photo allowance.
3.  Show a limit reached message.
4.  Demonstrate a general collection.
5.  Demonstrate the existing commercial event workflow.

## Priority 3 --- Later

-   Real payment integration.
-   Automated subscription billing.
-   Detailed usage analytics.
-   Team accounts.
-   Advanced permissions.
-   Large-scale job queue.

------------------------------------------------------------------------

# End-to-End Demo

## Demo A --- Personal

``` text
Sign Up
 ↓
Select Personal
 ↓
Create Collection
 ↓
Upload Photos
 ↓
Processing Status
 ↓
Share Link
 ↓
Recipient Opens Link
 ↓
Selfie
 ↓
Matching Photos
```

## Demo B --- Commercial

``` text
Sign Up
 ↓
Select Commercial
 ↓
Create Event
 ↓
Upload Event Photos
 ↓
Processing Status
 ↓
Event Link / QR / NFC
 ↓
Guest Opens Portal
 ↓
Selfie
 ↓
Event-Scoped Results
```

------------------------------------------------------------------------

# Testing Checklist

## Account

-   [ ] Personal account is stored correctly.
-   [ ] Commercial account is stored correctly.
-   [ ] Account type survives logout/login.

## Limits

-   [ ] Valid uploads succeed.
-   [ ] Over-limit uploads are rejected by the backend.
-   [ ] Frontend displays the reason.

## General Collection

-   [ ] Can be created.
-   [ ] Photos upload.
-   [ ] Processing completes.
-   [ ] Share link works.
-   [ ] Matching remains collection-scoped.

## Commercial Event

-   [ ] Existing event creation still works.
-   [ ] Existing guest link still works.
-   [ ] Existing QR/NFC flow is unaffected.
-   [ ] Existing event matching still works.

------------------------------------------------------------------------

# How the Feature Addresses the Restrictions

## 1. Pandemic / no physical gatherings

Broader access reduces dependence on new physical events during the
restricted period.

## 2. Semiconductor shortage

The feature remains browser-first and reuses on-demand software
infrastructure instead of requiring new dedicated user hardware. The
current project already positions ML processing as on-demand to reduce
idle infrastructure. fileciteturn3file9L1330-L1344

## 3. ₹1500 monthly API/compute restriction

Account and plan limits become a direct cost-control mechanism.
Expensive processing is limited before it starts, while the existing
architecture uses open-source/on-demand processing rather than a paid
face-recognition API for every request. fileciteturn3file2L347-L350

## 4. True live status

Both Personal and Commercial collections use the same actual processing
states, so users can see the real status of their upload and processing
lifecycle. fileciteturn3file3L402-L421

------------------------------------------------------------------------

# Final Recommendation

Implement the pivot as a **platform expansion**, not as a separate
pandemic mode.

The product should continue to be GLIMPSE.

Its user base becomes broader:

``` text
General Users
      +
Photographers
      +
Event Organizers
      ↓
    GLIMPSE
```

The technology remains focused on the same differentiator:

# GLIMPSE --- Your Photos Find You.
