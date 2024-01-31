import PostCard from '@/components/PostCard';
import { getPosts } from '@/app/actions';
import Hero from '@/components/Hero';


export default async function Home() {
  const { data : posts, error } = await getPosts()

  console.log(posts);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Hero />
      {/* <ul className="flex gap-5">
        {posts && posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul> */}
    </main>
  )
}
