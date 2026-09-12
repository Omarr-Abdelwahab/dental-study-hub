# Dental Study Hub Demo

## Working demo

The original Lovable foundation is now connected to a complete interactive prototype:

- Public landing page and searchable course catalogue
- Course details, fixed access dates and free YouTube preview
- Student sign-in/sign-up demo and editable profile
- Simulated one-time checkout with approved, pending and declined outcomes
- Student dashboard with course progress, continue watching, bookmarks, streaks,
  announcements, quiz history and expired courses
- Lesson player with curriculum search, playback persistence, PDF slides, downloads,
  bookmarks and mandatory quizzes with explanations
- Admin overview, course editor, student access controls, payment records and
  announcements
- Responsive desktop and mobile layouts

### Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Student | `student@demo.com` | `demo1234` |
| Admin | `admin@demo.com` | `demo1234` |

The header also includes one-click **Student demo** and **Admin demo** controls.

### Run locally

```bash
npm install
npm run dev
```

Alternatively, use `bun install` and `bun run dev`.

All accounts, purchases and admin changes are browser-local demo data. Use **Reset demo
data** to return to the seeded state. Production authentication, Paymob integration,
secure video delivery and server-side authorization are intentionally not included.

---

Build a polished, high-fidelity, responsive web application demo for an English-only online dental education platform called Dental Study Hub. Keep the brand name centralized so it can be replaced later.

Product purpose

The platform helps university dental students study their college subjects through structured video courses, lesson slides, and mandatory quizzes. It is supplementary academic support, not an accredited continuing-education platform.

This must feel like a real educational product, not just a landing-page mockup.

Demo implementation

Build the first version as a functional front-end demo using realistic seeded data and localStorage persistence.

Do not require Supabase or a real payment gateway yet.

Simulate authentication, checkout, enrollments, progress, quizzes, bookmarks, and admin actions.

Provide quick buttons to enter as a demo student or demo admin.

Clearly label the checkout as a demo so no real payment information is requested.

Keep the data layer organized so Supabase and Paymob can replace the mock services later.

All important buttons and flows must work.

Avoid dead buttons, empty generic pages, and “coming soon” screens.

Use React, TypeScript, Tailwind CSS, shadcn/ui, and Lucide icons.

Core business model

Courses are purchased individually.

This is not a recurring subscription and there is no platform-wide subscription.

Each course has:

A one-time price

A sales opening date

A sales closing date

A universal course access opening date

A universal course access closing date

Everyone enrolled in the same course loses access on the same closing date, regardless of when they purchased it.

Use wording such as:

“Buy Course”

“Enroll Now”

“Access available until 31 January 2027”

Do not use wording such as “monthly subscription” or “cancel subscription.”

Before checkout, clearly show the remaining access period. Once sales close, replace the purchase button with “Enrollment Closed.”

After the access closing date:

Paid videos, slides, and quizzes become locked.

The course remains visible in the student dashboard.

Previous progress and quiz results remain visible.

Display “Access ended on [date].”

Do not provide certificates.

All currently published lessons should become accessible immediately after purchase. Do not implement scheduled or gradual lesson releases in this demo.

User roles

Guest

A guest can:

Browse the landing page and course catalog

View course information and curriculum

Watch free preview snippets

Create an account or sign in

Begin checkout

A guest cannot access paid lessons, slides, or quizzes.

Student

A student can:

View purchased courses

Continue from the last watched lesson and video timestamp

See course and lesson progress

Watch embedded YouTube lessons

View lesson PDFs

Download PDFs only when the admin enables downloading

Complete mandatory lesson quizzes

Search the course curriculum

Bookmark lessons for revision

View recently watched lessons

Maintain a learning streak

View announcements and notifications

See the exact course access closing date

Admin

An admin can:

Create, edit, publish, unpublish, and archive courses

Set course prices and all sales/access dates

Add and reorder sections and lessons

Add YouTube video URLs

Upload or attach PDF slides

Enable or disable PDF downloading per lesson

Add free preview videos or mark content as a preview

Create and edit lesson quizzes

View students and their enrollments

View student progress and quiz results

View mock payment records

Manually grant or revoke course access

Publish course announcements

View basic revenue and engagement analytics

Public pages

Landing page

Create a professional academic landing page containing:

Clean navigation with logo, Courses, About, and Sign In

Hero section focused on helping dental students understand their subjects

Primary CTA: “Explore Courses”

Secondary CTA: “Watch Free Preview”

Featured courses

“How It Works” section:



Choose a course

Pay once

Learn until the displayed closing date

Platform benefits: structured lessons, slides, quizzes, and progress tracking

Course-focused content without a placeholder instructor profile

Frequently asked questions

Footer with contact, privacy, and terms links

Do not use fake university affiliations, accreditation claims, certificates, student counts, or medical claims.

Course catalog

Create a responsive course-card grid with:

Thumbnail

Subject/category

Course title

Instructor

Number of lessons

Total duration

Price in EGP

Closing date

Course status: Open, Upcoming, Enrollment Closed, or Expired

Free Preview badge where applicable

Add search and simple subject filtering.

Course details page

Include:

Course title and thumbnail

Instructor information

Course description

Learning outcomes

Intended academic level

Price

Total duration, sections, lessons, and quizzes

Sales closing date

Access closing date

Curriculum accordion

Free preview video

Clear one-time-payment explanation

Enroll Now button

FAQ covering access dates, quizzes, slides, and refunds

Make the access rule impossible to miss before purchase.

Authentication demo

Create Sign Up, Sign In, Forgot Password, and Profile screens.

Registration fields:

Full name

Email

Password

Phone number

University

Academic year

Add two demo-entry buttons:

“Enter Student Demo”

“Enter Admin Demo”

Persist the selected role and demo data in localStorage.

Checkout flow

Build a realistic simulated checkout flow:

Order summary

Course price in EGP

Student information

Course access closing date

Remaining access duration

Agreement checkbox confirming the student understands the fixed closing date

“Complete Demo Payment” button

Payment-processing state

Successful payment screen

Automatic enrollment and redirect to My Courses

Do not collect or store real card details.

Create mock payment states for successful, pending, and failed payments. Structure the payment service so a hosted Paymob checkout can replace it later.

Student dashboard

Create a personalized dashboard containing:

Greeting and current learning streak

Continue Learning card

Active courses

Recently watched lessons

Overall progress bars

Last watched timestamp

Course closing-date countdown

Bookmarked lessons

Recent quiz results

Course announcements

Expired courses in a separate section

For each active course card, display:

Completion percentage

Completed lessons out of total lessons

Last activity

Access closing date

Days remaining

Continue Course button

Use a Netflix-style “Continue Learning” experience without copying Netflix’s visual branding.

Course learning interface

Create a focused learning page with:

Course title and progress

Collapsible section-and-lesson sidebar

Search field for finding lessons

Status indicators for unwatched, in progress, completed, and bookmarked lessons

Main YouTube video player

Lesson title, description, duration, and resources

Resume message such as “Continue from 12:48”

Tabs or sections for Overview, Slides, Quiz, and Discussion/Support

Previous Lesson and Next Lesson navigation

Bookmark for Revision button

Course closing-date reminder

All published lessons should be navigable. Quizzes are mandatory for marking lessons complete, but failing a quiz must not lock other lessons. Students often need to jump directly to a particular college topic before an exam.

Video progress tracking

Use the YouTube IFrame Player API where possible.

Track and persist:

Last watched timestamp

Watched duration

Percentage watched

Most recently watched lesson

Last activity date

Save playback progress approximately every 10 seconds, when paused, and when leaving the page.

When the student returns, offer to resume from the saved timestamp.

The system should not claim that unlisted YouTube videos provide DRM or complete screen-recording protection.

Lesson slides

Each lesson can have a PDF uploaded by the admin.

Student behavior:

Display the PDF in an embedded viewer inside the lesson page.

Provide fullscreen viewing.

Only show the Download button when allowDownload is enabled.

Show a proper empty state if the lesson has no slides.

Do not use Canva-sharing permissions in this demo. Treat PDFs as the official lesson materials.

Mandatory quizzes

Every lesson contains a multiple-choice quiz.

Quiz rules:

Passing score: 70%

Unlimited attempts

One correct answer per question

Show the final score after submission

Clearly show passed or failed status

After submission, display the correct answer and a short explanation

Save every attempt with date and score

Mark the lesson complete only after the quiz is passed

Do not lock unrelated or later published lessons

Display:

Best score

Number of attempts

Previous attempts

Passed status

Retake Quiz button

The admin quiz builder should allow:

Adding, editing, and deleting questions

Adding four answer choices

Selecting the correct answer

Writing the answer explanation

Reordering questions

Learning streak

The streak is global across the platform, not separate for every course.

A day counts when the student either:

Watches at least 10 minutes of course content, or

Passes at least one lesson quiz

Logging in alone must not count.

Display:

Current streak

Longest streak

Weekly activity row

Short encouraging message

Count no more than one streak day per calendar date.

Admin dashboard

Create a separate admin layout with sidebar navigation.

Overview

Show realistic demo metrics:

Total revenue in EGP

Total enrollments

Active students

Average course completion

Average quiz score

Courses closing soon

Recent payments

Recent student activity

Use simple, readable charts only where they add value.

Course management

Display courses in a searchable table with:

Title

Status

Price

Enrollments

Sales closing date

Access closing date

Revenue

Edit action

Publish/unpublish action

Course editor

Organize the editor into clear sections or tabs:

Basic information

Instructor

Pricing

Sales and access dates

Curriculum

Free preview

Publishing settings

Allow the admin to build sections and lessons, reorder them, and configure:

Lesson title

Description

Duration

YouTube URL

PDF slides

Allow Download toggle

Preview status

Attached quiz

Published status

Student management

Create a searchable student table showing:

Name

Email

University

Academic year

Purchased courses

Enrollment status

Progress

Last activity

Streak

View Details action

The student detail view should show lesson progress, quiz attempts, payments, and controls to grant or revoke access.

Payments

Create a mock payments table showing:

Transaction ID

Student

Course

Amount

Date

Status

Payment method

View details

Announcements

Allow the admin to publish an announcement to:

One course

All enrolled students

Show announcements in the student dashboard and notification panel.

Seeded demo content

Create one main demo course:

Course: Oral Pathology Essentials
Price: EGP 1,499
Access ends: 31 January 2027
Sales close: 15 January 2027
Status: Open
Progress for demo student: Approximately 43%

Create at least three curriculum sections with two lessons each:

Foundations



Cell Injury and Adaptation — free preview

Inflammation and Repair

Oral Lesions



White Oral Lesions

Red and Pigmented Lesions

Clinical Revision



Case-Based Diagnosis

Final Subject Revision

Every lesson should have:

A realistic description

Duration

YouTube placeholder URL

Slide/PDF state

A three-question demo quiz

Answer explanations

Progress state

Also seed:

One upcoming course

One course with enrollment closed

One expired purchased course

Several payments

Several students

Announcements

Bookmarks

Quiz attempts

Video timestamps

A six-day current streak

Design direction

Create a clean, modern academic-medical identity.

Use:

Deep navy for trust and structure

Muted teal as the primary accent

Warm off-white backgrounds

White content cards

Subtle borders and restrained shadows

Clear typography such as Inter or Manrope

Generous spacing

Rounded corners without making everything excessively pill-shaped

Lucide icons

Professional dental or academic imagery

Avoid:

Excessive gradients

Glassmorphism everywhere

Neon colors

Cartoonish teeth

Overly clinical hospital styling

Generic AI-generated marketing copy

Crowded dashboards

Fake claims or testimonials

Certificate-related features

The product should feel credible to both a dentist instructor and university students.

Responsive behavior

Fully optimize for:

Desktop

Tablet

Mobile

On mobile:

Convert the admin sidebar into a drawer

Make the course curriculum collapsible

Keep video controls usable

Make checkout and quizzes comfortable to complete

Keep primary actions easy to reach without obstructing content

Include polished loading, empty, success, error, locked, expired, and payment-status states.

Required demo acceptance criteria

The finished demo must allow me to:

Enter as a guest and watch a free preview.

Sign in as the demo student.

See existing courses and saved progress.

Resume a lesson from a stored timestamp.

View lesson slides.

Complete and retake a mandatory quiz.

Pass a quiz and mark the lesson complete.

Navigate to another lesson without sequential locking.

Bookmark a lesson.

See streak and progress updates.

Complete a simulated course purchase.

See the purchased course appear in My Courses.

See an expired course with locked content but retained history.

Switch to the admin demo.

Create or edit a course.

Add sections, lessons, PDFs, and quizzes.

Change course price and closing dates.

View students, progress, payments, and analytics.

Manually grant or revoke access.

Publish an announcement.

Prioritize a coherent, working end-to-end demo over unnecessary production integrations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/36591bcb-6691-4494-ad6e-e78f16213be5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
