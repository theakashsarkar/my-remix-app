import { useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'
export const loader = async ({ params }) => {
    const post = await db.post.findUnique({
        where: { slug: params.slug }
    });
    if (!post) throw new Error('Post Not Found');
    const data = { post }
    return data;
}
export default function Post() {
    const {post} = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}