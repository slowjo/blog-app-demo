import Hero from '@/components/Hero';


export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-24">
      <Hero />
    </main>
  )
}
