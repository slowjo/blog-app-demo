This is a blog app demo built with Next.js, Tailwind CSS, Flowbite, Prismic, Supabase and Clerk.

## Description

The app allows the admin to publish blog posts via Prismic. Users can read posts and, if logged in, like posts and add them to their reading list.

## Usage

To make a clone of this code work, these steps are necessary:

- Create a Prismic account and in the cloned code's directory run `npx @slicemachine/init@latest` in your terminal, and select 'new project'. Follow Prismic's guide on adding webhooks to trigger deployment when your content changes.
- Create a Supabase account, create a new Supabase project and create these tables:
```
create table
  public.bookmarks (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    "postId" text not null,
    "userId" text not null,
    constraint bookmarks_pkey primary key (id),
    constraint uc_bookmarks unique ("postId", "userId")
  ) tablespace pg_default;

create table
  public.uniquelikes (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    "postId" text not null,
    "userId" text not null,
    constraint uniquelikes_pkey primary key (id),
    constraint uc_uniquelike unique ("postId", "userId")
  ) tablespace pg_default;
```
- Create a Clerk account, create a new Clerk project, and create a JWT template for Supabase with the Supabase JWT secret.
- Add these environment variables to your project:
```
NEXT_PUBLIC_SUPABASE_URL=your supabase project url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your supabase anon key

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your clerk public key
CLERK_SECRET_KEY=your clerk secret key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.