'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Post } from '@/lib/posts';
import { useSearchParams } from 'next/navigation';

interface NoteEditorProps {
    posts: Post[];
}

export function NoteEditor({ posts }: NoteEditorProps) {
    const searchParams = useSearchParams();
    const currentNoteSlug = searchParams.get('note');

    // Memoize activePost lookup to prevent re-finding on every render
    const activePost = useMemo(() => {
        return currentNoteSlug
            ? posts.find(p => p.slug === currentNoteSlug)
            : posts[0];
    }, [currentNoteSlug, posts]);

    const [formattedDate, setFormattedDate] = React.useState('');

    React.useEffect(() => {
        if (activePost) {
            const date = new Date(activePost.updated_at);
            const dateStr = date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const timeStr = date.toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: '2-digit'
            });
            setFormattedDate(`${dateStr} at ${timeStr}`);
        }
    }, [activePost]);

    if (!activePost) {
        return (
            <div className="flex-1 h-screen flex items-center justify-center"
                style={{ backgroundColor: 'var(--background)', color: 'var(--text-secondary)' }}>
                No note selected
            </div>
        );
    }

    return (
        <div className="flex-1 h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
            {/* Date header - Apple Notes style */}
            <div className="note-editor-mobile-header pt-6 pb-4 px-4 md:px-16 text-center text-[13px] font-medium"
                style={{ color: 'var(--text-secondary)' }}>
                {formattedDate || '\u00A0'}
            </div>

            {/* Content area */}
            <div className="note-editor-mobile note-editor-content flex-1 overflow-y-auto px-4 md:px-16 pb-16">
                <div className="prose dark:prose-invert max-w-[680px]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {activePost.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

