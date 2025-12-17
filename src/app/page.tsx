'use client';

import { NoteList } from '@/components/NoteList';
import { NoteEditor } from '@/components/NoteEditor';
import { getAllPosts } from '@/lib/posts';
import { Suspense, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState<ReturnType<typeof getAllPosts>>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch posts on client side
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#1E1E1E]">
      {/* Mobile hamburger button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      />

      {/* Mobile sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button
          className="mobile-close-btn"
          onClick={closeSidebar}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        <Suspense fallback={<div className="w-full h-full" style={{ backgroundColor: 'var(--sidebar-bg)' }} />}>
          <NoteList posts={posts} onNoteSelect={closeSidebar} />
        </Suspense>
      </div>

      {/* Desktop sidebar */}
      <div className="desktop-sidebar">
        <Suspense fallback={<div className="w-[340px] border-r" />}>
          <NoteList posts={posts} />
        </Suspense>
      </div>

      {/* Content area */}
      <Suspense fallback={<div className="flex-1" />}>
        <NoteEditor posts={posts} />
      </Suspense>
    </main>
  );
}
