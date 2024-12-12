import { deletePost } from "@/actions/actions";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function PostPage({ params }) {
    const post = await prisma.post.findUnique({
        where: {
            slug: String(params.slug),
        },
    });


    return (
        <>
            <div className="text-center items-center justify-center mt-96 gap-12 flex flex-col">
                <div>
                    <span className="text-xs text-white/20">{post.id}</span>
                    <h2 className="text-3xl text-green-600">{post?.title}</h2>
                    <p>{post?.content}</p>
                </div>
                <div className="">
                    <form action={deletePost}>
                        <button
                            type="submit"
                            className="bg-red-600 py-2 px-4 rounded-md"
                        >
                            Delete post
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
