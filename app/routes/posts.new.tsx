import { Link, Form } from "@remix-run/react"
import { redirect  } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const action = async ({ request }) => {
    const form = await request.formData()
    const title = form.get("title");
    const slug  = form.get("slug");
    const body  = form.get("body");

    const fields = { title, slug, body }
    const post = await db.post.create({data: fields});
    return redirect(`/posts/${post.id}`);
}
export default function NewPost()
{
    return (
        <div className="mt-4">
            <div className="flex flex-row justify-between">
                <div>
                  <h1 className="font-extrabold">New Posts</h1>
                </div>
                <div>
                    <Link to="/posts" className="w-2 h-2 bg-cyan-500 py-2 px-2 rounded-md">
                        Back
                    </Link>
                </div>   
            </div>
            <div className="grid justify-items-center  shadow-2xl ">
                <Form method="POST">
                 <div className="mb-4 ">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                    <input type="text" className="form-input px-1 py-1 rounded-md" name="title"  id="title"/>
                 </div>
                 <div className="mb-4">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900">Slug</label>
                    <input type="text" name="slug" className="form-input px-1 py-1 rounded-md shadow-sm bg-gray-50 "  id="slug"/>
                 </div>
                 <div className="mb-2">
                    <label htmlFor="post_body" className="block mb-2 text-sm font-medium text-gray-900">Post Body</label>
                    <textarea  className="form-textarea px-2 py-2 rounded-md" name="body"  id="post_body"/>
                 </div>
                 <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Post</button>
                </Form>
            </div>
        </div>
    )
}