import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const users = await prisma.user.findMany({
        include: {
            articles: true,
        },
    })

    users.forEach((user) => {
        console.log(`User: ${user.name}, Email: ${user.email}`);
        console.log('Articles:');
        user.articles.forEach((article) => {
            console.log(`- Title: ${article.title}, Body: ${article.body}`);
        });
        console.log('\n');
    });

};




main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });