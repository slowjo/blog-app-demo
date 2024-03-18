import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
// import { components } from "@/slices";
import Article from "@/components/Article";
import { Suspense } from "react";
// import HorizontalLoadingCrd from "@/components/HorizontalLoadingCard";

type Params = { uid: string };

export default function Page({ params }: { params: Params }) {
    return (
        <main className="p-5 md:p-20">
          {/* <Suspense fallback={<div className="grid mx-auto max-w-lg"><HorizontalLoadingCard /></div>}>
            <Article articleUid={params.uid} />
          </Suspense> */}
        </main>
    )
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("post", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
