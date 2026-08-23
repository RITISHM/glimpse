# Product Requirements Document

# GLIMPSE Universal Platform

**Feature:** Universal User Access and Account Segmentation\
**Version:** 1.0\
**Status:** Proposed\
**Primary Goal:** Expand GLIMPSE beyond a single commercial customer
segment while preserving the existing event workflow.

------------------------------------------------------------------------

# 1. Overview

GLIMPSE currently supports an event-oriented workflow where
photographers create events, upload photographs, and distribute
event-specific access links.

This feature expands the platform so that authenticated users can use
GLIMPSE beyond the photographer-only model.

Users select an account usage type during signup or onboarding:

-   Personal
-   Commercial

The platform then applies different limits and plan rules while reusing
the same core collection, upload, processing, sharing, and face-matching
infrastructure.

------------------------------------------------------------------------

# 2. Problem Statement

GLIMPSE is vulnerable if its primary customer segment is temporarily
affected by a disruption to physical events.

If events are postponed for a restricted period, depending only on
photographers and event organizers can reduce usage and revenue.

The product therefore needs to broaden its addressable user base without
abandoning its original product identity.

------------------------------------------------------------------------

# 3. Goals

-   Allow non-photographer users to use GLIMPSE.
-   Preserve the existing commercial event workflow.
-   Reuse the existing ML and backend architecture.
-   Apply different usage limits to Personal and Commercial accounts.
-   Provide a clear basis for future pricing.
-   Support business continuity during periods when physical events are
    temporarily reduced.

------------------------------------------------------------------------

# 4. Non-Goals

This feature will not:

-   Build a separate social network.
-   Build a virtual-event platform.
-   Replace the event workflow.
-   Create separate frontend or backend applications.
-   Create a separate ML model for personal users.
-   Remove event-level isolation for commercial collections.

------------------------------------------------------------------------

# 5. User Types

## 5.1 Personal User

A general authenticated user using GLIMPSE outside the professional
event workflow.

Capabilities:

-   Create collections.
-   Upload photos within account limits.
-   Process photos.
-   Generate a shareable collection link.
-   Use the existing face-discovery workflow.

## 5.2 Commercial User

A photographer, studio, organizer, company, or other professional user.

Capabilities:

-   Create event-oriented collections.
-   Higher photo limits.
-   Multiple collections/events according to plan.
-   Event-specific sharing.
-   Existing QR/NFC/direct-link workflow where applicable.
-   Existing live processing status.

------------------------------------------------------------------------

# 6. Core User Stories

### Account selection

> As a new user, I want to select how I plan to use GLIMPSE so that the
> platform can provide the appropriate limits and experience.

### Personal use

> As a general user, I want to create a photo collection and share
> access so that recipients can use GLIMPSE's photo discovery workflow.

### Commercial use

> As a professional user, I want to continue creating event collections
> and delivering photos through the existing guest workflow.

### Platform administration

> As the platform, I want to enforce account and plan limits before
> expensive processing begins so that compute usage remains controlled.

------------------------------------------------------------------------

# 7. Functional Requirements

## FR-01: Account Type Selection

During signup or first-time onboarding, the user must select:

``` text
personal
commercial
```

Store:

``` text
account_type
```

The selection should not be repeatedly requested on every login.

------------------------------------------------------------------------

## FR-02: Account Profile

The user profile must support:

``` text
id
name
email
account_type
plan
created_at
```

Recommended initial plan values:

``` text
free
premium
commercial_starter
commercial_pro
```

Pricing does not need to be implemented in the MVP. Plan and limit
configuration can initially be enforced through application logic.

------------------------------------------------------------------------

## FR-03: Collection Model

The existing event-centric model should be generalized conceptually into
a collection while preserving event compatibility.

Recommended collection types:

``` text
general
event
```

A collection contains:

``` text
id
owner_id
collection_type
name
slug
status
created_at
```

Commercial event collections can additionally retain event metadata.

------------------------------------------------------------------------

## FR-04: Usage Limits

Limits must be checked before accepting uploads or starting expensive
processing.

Example configuration for the MVP:

  Account Type                Initial Photo Limit   Collection Limit
  -------------------- -------------------------- ------------------
  Personal Free            Configurable low limit       Configurable
  Personal Premium                   Higher limit             Higher
  Commercial Starter           Higher event limit           Multiple
  Commercial Pro         Highest configured limit           Multiple

The exact numbers should be configurable and not hard-coded throughout
the application.

Recommended approach:

``` text
Plan
  ↓
Limit Configuration
  ↓
Upload Validation
  ↓
Accept or Reject Upload
```

------------------------------------------------------------------------

## FR-05: Existing ML Pipeline Reuse

Both account types must use the existing pipeline:

``` text
Photo
  ↓
Face Detection
  ↓
Face Embedding
  ↓
Store Against Collection
```

Recipient matching:

``` text
Collection Link
  ↓
Consent
  ↓
Selfie
  ↓
Face Embedding
  ↓
Search Only Inside Current Collection
  ↓
Matched Photos
```

No second ML pipeline is required.

------------------------------------------------------------------------

## FR-06: Shareable Collection Access

Every shareable collection must have a unique identifier or slug.

Concept:

``` text
/g/{collection_id}
```

For event collections, the existing event URL structure may remain
supported.

------------------------------------------------------------------------

## FR-07: Live Processing Status

Every collection must expose actual processing states.

Recommended states:

``` text
DRAFT
UPLOADING
QUEUED
PROCESSING
READY
FAILED
```

The UI must display real backend state rather than an unrelated
animation.

------------------------------------------------------------------------

# 8. Data Model Changes

A production-friendly direction is:

``` text
profiles
--------
id
name
email
account_type
plan
created_at

collections
-----------
id
owner_id
collection_type
name
slug
status
created_at

photos
------
id
collection_id
storage_path
status
created_at

faces
-----
id
photo_id
collection_id
embedding
created_at

guest_sessions
--------------
id
collection_id
session_token
created_at
expires_at

matches
-------
id
guest_session_id
photo_id
similarity
created_at
```

Existing event tables do not need to be destroyed immediately. A
migration can either generalize them or maintain event-specific metadata
linked to the generalized collection.

------------------------------------------------------------------------

# 9. Acceptance Criteria

The feature is complete when:

-   [ ] A new user can select Personal or Commercial during onboarding.
-   [ ] Account type is stored.
-   [ ] Account type changes the displayed limits/experience.
-   [ ] A general user can create a general collection.
-   [ ] A commercial user can create an event collection.
-   [ ] Uploads are blocked when the configured plan limit is exceeded.
-   [ ] Existing event upload functionality still works.
-   [ ] Both collection types use the existing processing pipeline.
-   [ ] Shareable links open the correct collection.
-   [ ] Matching is restricted to the current collection.
-   [ ] Existing guest access remains login-free where the product flow
    requires it.

------------------------------------------------------------------------

# 10. Business Model Direction

The feature provides a natural pricing structure:

``` text
Personal
├── Free
└── Premium

Commercial
├── Starter
└── Professional
```

Revenue can later be linked to:

-   Higher photo limits.
-   More collections.
-   Larger processing allowance.
-   Extended storage.
-   Commercial event features.

The MVP should first implement the **limit architecture and pricing
presentation**, not a complex payment system.

------------------------------------------------------------------------

# 11. Pandemic Restriction Outcome

This feature provides temporary business continuity when the event
market slows because gatherings are postponed.

The platform broadens access during the disruption and retains its
event-focused commercial capability for when events return.

It is therefore both:

-   A short-term response to reduced event activity.
-   A long-term expansion of GLIMPSE's market.
