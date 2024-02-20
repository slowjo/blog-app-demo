import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JSXMapSerializer, PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
// import { components } from "@/slices";
import { getPostLikes, getUserPostBookmark, getUserPostLike } from "../actions";
import MarkButton from "@/components/MarkButton";
import Image from "next/image";

type Params = { uid: string };

const components: JSXMapSerializer = {
  image: ({ node }) => (
    <Image src={node.url} width={node.dimensions.width} height={node.dimensions.height} alt={node.alt || ''} className="fade-in" />
  )
}

export default async function Page({ params }: { params: Params }) {
    const client = createClient();
    const page = await client
    .getByUID("post", params.uid)
    .catch(() => notFound());

    const { data, error, guest } = await getUserPostLike(page.id)

    const { count, error : allLikesError } = await getPostLikes(page.id)

    const { data : bookmarkData, error : bookMarkError, guest : bookMarkGuest } = await getUserPostBookmark(page.id)

//   return <SliceZone slices={page.data.slices} components={components} />;

    return (
        <main className="p-5 md:p-20">
            <article className="prose prose-img:rounded-xl mx-auto">
                <div className="not-prose flex justify-end gap-5">
                    <MarkButton postId={page.id} isMarked={bookmarkData ? true : false} guest={guest} markAs={'bookmark'} />
                    {/* <p className="text-sm text-slate-300">Bookmarked: {bookmarkData ? 'Yes' : 'No'}</p> */}
                    <MarkButton postId={page.id} isMarked={data ? true : false} guest={guest} markAs={'like'} count={count} />
                    {/* <p className="text-sm text-slate-300">Liked: {data ? 'Yes' : 'No'}</p> */}
                </div>
                <h1>{page.data.title}</h1>
                <PrismicRichText field={page.data.textandimages} components={components} />
            </article>
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
