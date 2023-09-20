import { useLoaderData, Link } from '@remix-run/react'
import { json, redirect } from '@remix-run/node'
import { getPost, getDelete } from '~/models/post.server';
// export const loader = async ({ params }) => {
//     const post = await db.post.findUnique({
//         where: { slug: params.slug }
//     });
//     if (!post) throw new Error('Post Not Found');
//     const data = { post }
//     return data;
// }

export const loader = async ({ params }) => {
    const post = await getPost(params.slug);
    return json({ post });
}

export const action = async ({params,request}) => {
    const form = await request.formData()
    if (form.get('_method') === 'delete') {
        const post = await getPost(params.slug);
        if (!post) throw new Error('Post not found');
        await getDelete(params.slug);
        return redirect('/posts');
    }
}

export default function Post() {
    const {post} = useLoaderData<typeof loader>();
    return (
        <div className='mt-4'>
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="font-extrabold">{post.title}</h1>
                </div>
                <div>
                    <Link to="/posts" className="w-2 h-2 bg-cyan-500 py-2 px-2 rounded-md">
                        Back
                    </Link>
                </div>   
            </div>
            <div className='text-center mt-3'>
                {post.body}
            </div>
            <div className='mt-4'>
                <form method='POST'>
                    <input type="hidden" name='_method' value="delete"/>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
                </form>
            </div>
        </div>
    );
}