import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node"
import { findMany } from "~/models/post.server";

export const loader = async () => {
    const posts = await findMany()
    return json({ posts })
}
export default function PostItems() {
    const data = useLoaderData<typeof loader>();
    return (
        <div className="my-4">
            <div className="flex flex-row justify-between">
                <div>
                  <h1 className="font-extrabold">Posts</h1>
                </div>
                <div>
                    <Link to="/posts/new" className="w-2 h-2 bg-cyan-500 py-2 px-2 rounded-md">
                        New Posts
                    </Link>
                </div>   
            </div>
            <ul className="">
            {data.posts.map((post) => (
                <li key={post.id} className="border border-sky-500 p-4 my-4 " >
                    <Link to={post.slug}>
                        <h3>{post.title}</h3>
                        {new Date(post.createdAt).toLocaleString()}
                    </Link>
                </li>
            ))}
            </ul>            
        </div>
    )
}