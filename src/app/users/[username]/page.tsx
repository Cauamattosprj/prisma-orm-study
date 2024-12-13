import React from "react";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function UserPage({ params }) {
    const user = await prisma.user.findUnique({
        where: {
            userName: String(params.username),
        },
        include: {
            posts: true,
        },
    });

    return (
        <>
            <div className="text-center items-center justify-center mt-96 gap-12 flex flex-col">
                <div>
                    <span className="text-xs text-white/20">
                        {user?.userName}
                    </span>
                    <h2 className="text-3xl text-green-600">{user?.email}</h2>
                    <div className="flex gap-4">
                        {user?.posts.map((post) => (
                            <ul>
                                <li
                                    key={post.id}
                                    className="mt-2 border-[0.5px] p-4 border-white/20 rounded-xl"
                                >
                                    <Link href={`/posts/${post.slug}`}>
                                        <h4 className="text-lg text-white">
                                            {post.title}
                                        </h4>
                                        <p className="text-sm text-gray-400">
                                            {post.content}
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="">
                    <form action="">
                        <button
                            type="submit"
                            className="bg-red-600 py-2 px-4 rounded-md"
                        >
                            Delete user
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
