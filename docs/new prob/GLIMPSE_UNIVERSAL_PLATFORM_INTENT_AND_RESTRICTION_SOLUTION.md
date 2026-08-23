# GLIMPSE Universal Platform

## Feature Intent and Restriction Solution

# 1. Why We Are Adding This Feature

GLIMPSE currently focuses primarily on event photographers and event
organizers. Its core workflow is:

Photographer creates event → uploads photos → photos are processed →
guests open an event-specific link → guests submit a selfie → GLIMPSE
finds their photos.

A pandemic restriction that prevents physical gatherings for a limited
period creates a direct business problem: events are postponed, so the
platform temporarily loses part of its primary commercial demand.

The important assumption is that events are **postponed, not permanently
eliminated**. GLIMPSE therefore needs a temporary source of continued
usage and revenue without abandoning its original event-focused market.

The solution is to expand GLIMPSE into a **universal intelligent photo
sharing platform**.

------------------------------------------------------------------------

# 2. Product Intent

The feature does not turn GLIMPSE into a generic cloud drive or a clone
of an existing photo-sharing service.

GLIMPSE keeps its core differentiator:

> Upload a collection of photos, share access, and let people discover
> the photos in which they appear through selfie-based matching.

The expansion is about **who can use the platform**, not about replacing
the technology.

Before:

-   Primarily photographers and event organizers create collections.

After:

-   Any authenticated user can create and manage a photo collection.
-   Commercial users receive higher limits and event-oriented
    capabilities.
-   Personal users receive lower limits and a simpler usage tier.

The same underlying pipeline is reused.

------------------------------------------------------------------------

# 3. The Universal Model

## User onboarding

During signup or first-time onboarding:

**How do you plan to use GLIMPSE?**

-   Personal Use
-   Commercial Use

The selected account type determines:

-   Upload limits
-   Collection limits
-   Available plan
-   Dashboard defaults
-   Commercial capabilities

It should not create two separate applications.

------------------------------------------------------------------------

# 4. Core Universal Workflow

``` text
USER
  ↓
Create Collection
  ↓
Upload Photos
  ↓
Processing
  ↓
Shareable Access
  ↓
Recipient Opens Collection
  ↓
Consent + Selfie
  ↓
Face Matching
  ↓
Relevant Photos
```

For commercial users:

``` text
Commercial User
      ↓
Create Event Collection
      ↓
Upload Event Photos
      ↓
Process
      ↓
NFC / QR / Direct Event Link
      ↓
Guest Selfie
      ↓
Event-Scoped Results
```

For general users:

``` text
User
  ↓
Create Collection
  ↓
Upload Photos
  ↓
Process
  ↓
Shareable Link
  ↓
Recipient Selfie
  ↓
Relevant Photos
```

The ML service only needs a collection identifier and the photos
associated with that collection.

------------------------------------------------------------------------

# 5. How This Solves the Pandemic Restriction

The restriction affects physical gatherings, which temporarily reduces
new event activity.

GLIMPSE does not pretend that physical events can continue normally.

Instead:

``` text
Physical Events Postponed
          ↓
Commercial Event Activity Drops Temporarily
          ↓
GLIMPSE Opens the Platform to a Wider User Base
          ↓
General Users Continue Creating Photo Collections
          ↓
Usage and Potential Revenue Continue
          ↓
Physical Events Resume
          ↓
Commercial Event Workflow Continues
```

This is a business-continuity pivot, not a replacement for the original
product.

The platform survives the restricted period by reducing dependence on a
single customer segment.

------------------------------------------------------------------------

# 6. Why This Does Not Have the Obvious Loophole

A weak pandemic solution would be:

-   Build a random virtual event.
-   Ask users to upload photos for no clear reason.
-   Pretend a virtual event is automatically a substitute for every
    physical event.

GLIMPSE does none of this.

The feature simply broadens platform access. Users who have a genuine
need to organize, distribute, or discover photos can use the same
technology regardless of whether they are professional photographers.

The value proposition remains consistent:

> GLIMPSE helps people move from a large photo collection to the photos
> relevant to them.

------------------------------------------------------------------------

# 7. Commercial Continuity Strategy

During normal conditions:

``` text
Primary Segment: Commercial Event Users
```

During the restricted period:

``` text
Commercial Event Users
        +
General Users
        ↓
Broader Platform Usage
```

When postponed events return:

``` text
General Usage Continues
        +
Commercial Event Demand Returns
        ↓
More Diversified GLIMPSE Platform
```

This makes the expansion useful after the restriction as well.

------------------------------------------------------------------------

# 8. Relationship to the Other Hackathon Restrictions

The existing GLIMPSE architecture already addresses the remaining
restrictions:

## Semiconductor shortage

GLIMPSE is software-first and browser-based. It does not require users
to purchase dedicated hardware. The ML workload can run only when
processing is required, reducing dependence on permanently running
specialized infrastructure.

## Monthly API/compute budget under ₹1500

The architecture uses open-source ML and on-demand processing instead of
paying for a commercial face-recognition API for every image. Usage
limits can additionally prevent uncontrolled processing costs.

## True live status on demand

Every collection, including general and event collections, can reuse the
existing real processing states:

-   Uploaded
-   Queued
-   Processing
-   Matching data ready
-   Ready
-   Failed

The feature therefore strengthens the platform without creating a
separate technical system.

------------------------------------------------------------------------

# 9. Final Positioning

**Before:**

> An intelligent event photo delivery platform.

**Expanded:**

> **GLIMPSE is a universal intelligent photo sharing and discovery
> platform, with specialized workflows for commercial event delivery.**

The core tagline remains:

# GLIMPSE --- Your Photos Find You.
