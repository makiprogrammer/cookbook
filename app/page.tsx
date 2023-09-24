// import styles from "./page.module.css";
import { prisma } from "./utils/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany();
  return (
    <main>
      <h1>Hello</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
