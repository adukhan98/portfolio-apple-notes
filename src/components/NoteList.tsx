'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Post } from '@/lib/posts';
import { useMemo } from 'react';

interface NoteListProps {
    posts: Post[];
    onNoteSelect?: () => void;
}

export function NoteList({ posts, onNoteSelect }: NoteListProps) {
    const searchParams = useSearchParams();
    const currentNoteSlug = searchParams.get('note');

    const filteredPosts = posts;

    // Memoize grouped posts to prevent recalculation on every render
    const groupedPosts = useMemo(() => groupPostsByDate(filteredPosts), [filteredPosts]);

    return (
        <div className="w-[340px] h-screen overflow-y-auto shrink-0 border-r"
            style={{
                backgroundColor: 'var(--sidebar-bg)',
                borderColor: 'var(--border-color)'
            }}>
            {Object.entries(groupedPosts).map(([group, groupPosts]) => (
                <div key={group}>
                    {groupPosts.length > 0 && (
                        <div className="note-list-header">
                            {group}
                        </div>
                    )}
                    {groupPosts.map(post => {
                        const isActive = currentNoteSlug === post.slug || (!currentNoteSlug && post === filteredPosts[0]);

                        return (
                            <Link
                                key={post.slug}
                                href={`/?note=${post.slug}`}
                                className={`note-item block ${isActive ? 'active' : ''}`}
                                style={{ borderColor: 'var(--border-color)' }}
                                onClick={onNoteSelect}
                            >
                                <div className="note-item-title">
                                    {post.title}
                                </div>
                                <div className="note-item-meta">
                                    <span className="note-item-date">{formatDate(post.updated_at)}</span>
                                    <span className="note-item-preview">
                                        {getPreview(post.content)}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ))}
            {filteredPosts.length === 0 && (
                <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
                    no notes found.
                </div>
            )}
        </div>
    );
}

function getPreview(content: string): string {
    // Remove markdown formatting and get first ~35 chars
    const cleaned = content
        .replace(/^#.*$/gm, '') // Remove headers
        .replace(/[*_#`\[\]]/g, '') // Remove markdown chars
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();
    return cleaned.substring(0, 35) + (cleaned.length > 35 ? '...' : '');
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    const now = new Date();

    // If today, show time
    if (isSameDay(d, now)) {
        return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }

    // If yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (isSameDay(d, yesterday)) {
        return 'Yesterday';
    }

    // If within this week, show day name
    const daysDiff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
        return d.toLocaleDateString('en-US', { weekday: 'long' });
    }

    // Otherwise show date
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function groupPostsByDate(posts: Post[]) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const groups: Record<string, Post[]> = {
        'Today': [],
        'Yesterday': [],
        'Previous 7 Days': [],
        'Older': []
    };

    posts.forEach(post => {
        const d = new Date(post.updated_at);
        if (isSameDay(d, today)) {
            groups['Today'].push(post);
        } else if (isSameDay(d, yesterday)) {
            groups['Yesterday'].push(post);
        } else if (d > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
            groups['Previous 7 Days'].push(post);
        } else {
            groups['Older'].push(post);
        }
    });

    return groups;
}

function isSameDay(d1: Date, d2: Date) {
    return d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();
}
