import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
    {
        title: faker.book.title(),
        slug: faker.lorem.words(3).replace(/\s+/g, "-").toLowerCase(),
        content: faker.lorem.words(12),
        author: {
            connectOrCreate: {
                where: {
                    email: faker.internet.email(),
                },
                create: {
                    email: faker.internet.email(),
                    hashedPassword: faker.internet.password(),
                    userName: faker.internet.username(),
                },
            },
        },
    },
    {
        title: faker.book.title(),
        slug: faker.lorem.words(3).replace(/\s+/g, "-").toLowerCase(),
        content: faker.lorem.words(12),
        author: {
            connectOrCreate: {
                where: {
                    email: faker.internet.email(),
                },
                create: {
                    email: faker.internet.email(),
                    hashedPassword: faker.internet.password(),
                    userName: faker.internet.username(),
                },
            },
        },
    },
    {
        title: faker.book.title(),
        slug: faker.lorem.words(3).replace(/\s+/g, "-").toLowerCase(),
        content: faker.lorem.words(12),
        author: {
            connectOrCreate: {
                where: {
                    email: faker.internet.email(),
                },
                create: {
                    email: faker.internet.email(),
                    hashedPassword: faker.internet.password(),
                    userName: faker.internet.username(),
                },
            },
        },
    },
];

async function main() {
    console.log("Sart seeding...");

    for (const post of initialPosts) {
        const newPost = await prisma.post.create({
            data: post,
        });
        console.log(`Created post with id: ${newPost.id}`);
    }

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
