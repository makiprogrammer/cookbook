import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.create({
    data: {
      title: "First Post",
      content:
        "This is my first post. I hope I love writing blogs as much as I love writing them.",
    },
  });

  console.log({ post });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
