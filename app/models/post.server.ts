import { db } from "~/utils/db.server"

export async function getPost(slug: string) {
    return db.post.findUnique({ where: { slug }});
}

export async function getDelete(slug: string) {
    return db.post.delete({ where: { slug }})
}

export async function findMany() {
    return db.post.findMany();
}