import prisma from "@/lib/db";
import Link from "next/link";
import { createPost, createUser } from "@/actions/actions";

export default async function Home() {
    const posts = await prisma.post.findMany();
    const users = await prisma.user.findMany();

    return (
        <>
            <div className="text-center items-center justify-center mt-44 text-2xl">
                <div className="flex gap-12 justify-center">
                    {/* SHOW USERS */}
                    <div>
                        Total Users ({users.length})
                        <ul className="mt-8 border-t-white border-t-[0.5px]">
                            {users.map((user) => (
                                <li
                                    key={user.id}
                                    className="pt-2 border-y-white/20 border-y-[0.5px]"
                                >
                                    <Link href={`/users/${user.userName}`}>
                                        <h2>{user.userName}</h2>
                                        <p className="text-white/20 text-xs">
                                            {user.email}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* SHOW POSTS */}
                    <div>
                        Total posts ({posts.length})
                        <ul className="mt-8 border-t-white border-t-[0.5px]">
                            {posts.map((post) => (
                                <li
                                    key={post.id}
                                    className="pt-2 border-y-white/20 border-y-[0.5px] "
                                >
                                    <Link href={`/posts/${post.slug}`}>
                                        <h2>{post.title}</h2>
                                        <p className="text-white/20 text-xs text-ellipsis max-w-96 text-nowrap overflow-hidden mx-auto">
                                            {post.content}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center gap-8">
                    {/* USER */}
                    <div className="flex justify-center mt-12">
                        <form
                            action={createUser}
                            className="flex flex-col gap-4 text-black"
                        >
                            <input
                                type="text"
                                name="userName"
                                placeholder="Username"
                                className="p-2"
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                className="p-2"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="hashedPassword"
                                className="p-2"
                            />
                            <button type="submit" className="bg-blue-600">
                                Create user
                            </button>
                        </form>
                    </div>
                    {/* POST */}
                    <div className="flex justify-center mt-12">
                        <form
                            action={createPost}
                            className="flex flex-col gap-4 text-black"
                        >
                            <input
                                type="text"
                                name="authorUserName"
                                placeholder="Author"
                                className="p-2"
                            />
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
            </div>
        </>
    );
}
