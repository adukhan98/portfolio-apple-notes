import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export interface Post {
    slug: string;
    title: string;
    folder: string;
    is_pinned: boolean;
    updated_at: string;
    content: string;
}

export function getAllPosts(): Post[] {
    // Get all folders in content directory
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const folders = fs.readdirSync(contentDirectory);
    let allPosts: Post[] = [];

    folders.forEach((folder) => {
        const folderPath = path.join(contentDirectory, folder);
        if (fs.statSync(folderPath).isDirectory()) {
            const files = fs.readdirSync(folderPath);

            files.forEach((file) => {
                if (file.endsWith('.md')) {
                    const filePath = path.join(folderPath, file);
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data, content } = matter(fileContents);

                    allPosts.push({
                        slug: data.slug || file.replace(/\.md$/, ''),
                        title: data.title || 'Untitled',
                        folder: data.folder || folder,
                        is_pinned: data.is_pinned || false,
                        updated_at: data.updated_at || new Date().toISOString(),
                        content: content,
                    });
                }
            });
        }
    });

    return sortPosts(allPosts);
}

export function getPostsByFolder(folder: string): Post[] {
    const allPosts = getAllPosts();
    return allPosts.filter((post) => post.folder === folder);
}

export function getPostBySlug(slug: string): Post | undefined {
    const allPosts = getAllPosts();
    return allPosts.find((post) => post.slug === slug);
}

function sortPosts(posts: Post[]): Post[] {
    return posts.sort((a, b) => {
        // 1. Pinned items first
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;

        // 2. Sort by updated_at descending
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateB - dateA;
    });
}
