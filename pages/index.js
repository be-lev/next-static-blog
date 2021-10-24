import matter from "gray-matter";
import Head from "next/head"; //allow us to access meta data
import fs from "fs";
import path from "path";
import Post from "../components/Post";
import {sortByDate} from '../utils'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  //get files from posts dir
  const files = fs.readdirSync(path.join("posts"));
  //get slug and front matter from post
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    // get front matter

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
