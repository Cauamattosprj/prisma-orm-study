import prisma from "@/lib/db";
import Link from "next/link";
import { createPost } from "@/actions/actions";

export default async function Home() {
    const posts = await prisma.post.findMany();

    return (
        <>
            <div className="text-center items-center justify-center mt-44 text-2xl">
                Total posts ({posts.length})
                <ul className="mt-8 border-t-white border-t-[0.5px]">
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            className="pt-2 border-y-white/20 border-y-[0.5px]"
                        >
                            <Link href={`/posts/${post.slug}`}>
                                <h2>{post.title}</h2>
                                <p className="text-white/20 text-xs">
                                    {post.content}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mt-12">
                    <form action={createPost} className="flex flex-col gap-4 text-black">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            className="p-2"
                        />
                        <textarea
                            placeholder="Content"
                            name="content"
                            className="p-2"
                        />
                        <button type="submit" className="bg-blue-600">
                            Create post
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
