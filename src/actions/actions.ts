"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
    await prisma.user.create({
        data: {
            userName: formData.get("userName") as string,
            email: formData.get("email") as string,
            hashedPassword: formData.get("hashedPassword") as string
        },
    });

    revalidatePath("/posts");
}

export async function createPost(formData: FormData) {
    await prisma.post.create({
        data: {
            title: formData.get("title") as string,
            slug: (formData.get("title") as string)
                .replace(/\s+/g, "-")
                .toLowerCase(),
            content: formData.get("content") as string,
            authorUserName: formData.get("authorUserName") as string,
        },
    });

    revalidatePath("/posts");
}

export async function editPost(formData: FormData, id: string) {
    await prisma.post.update({
        where: { id },
        data: {
            title: formData.get("title") as string,
            slug: (formData.get("title") as string)
                .replace(/\s+/g, "-")
                .toLowerCase(),
            content: formData.get("content") as string,
        },
    });
}

export async function deletePost(slug: string) {
    await prisma.post.delete({
        where: { slug },
    });
}
