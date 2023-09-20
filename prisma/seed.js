import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const akash = await prisma.post.upsert({
        where: { slug: "akash-first-post"},
        update: {},
        create: {
            title: "Akash first post",
            slug: 'first-post',
            body: 'my first post'
        },
    });

    const bob = await prisma.post.upsert({
        where: {slug: "akash-second-post"},
        update: {},
        create: {
            title: "Akash second post",
            slug: 'akash-second-post',
            body: "my second post",
        },
    });
    console.log({akash, bob});
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })