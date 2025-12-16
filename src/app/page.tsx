import { NoteList } from '@/components/NoteList';
import { NoteEditor } from '@/components/NoteEditor';
import { getAllPosts } from '@/lib/posts';
import { Suspense } from 'react';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#1E1E1E]">
      <Suspense fallback={<div className="w-[300px] border-r"></div>}>
        <NoteList posts={posts} />
      </Suspense>

      <Suspense fallback={<div className="flex-1"></div>}>
        <NoteEditor posts={posts} />
      </Suspense>
    </main>
  );
}
