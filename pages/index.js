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
      <link id="TW_LINK" href="https://css.twik.io/619257fed3b57.css" onload="window.TWIK_SB && window.TWIK_SB()" rel="stylesheet"/>
<script>!function(){window.TWIK_ID="619257fed3b57",localStorage.tw_init=1;var t=document.documentElement;if(window.TWIK_SB=function(){t.style.visibility="",t.style.opacity=""},window.TWIK_RS=function(){var t=document.getElementById("TW_LINK");t&&t.parentElement&&t.parentElement.removeChild(t)},setTimeout(TWIK_RS,localStorage.tw_init?2e3:6e3),setTimeout(TWIK_SB,localStorage.tw_init?250:1e3),document.body)return TWIK_RS();t.style.visibility="hidden",t.style.opacity=0}();</script>
<script id="TW_SCRIPT" onload="window.TWIK_SB && window.TWIK_SB()" src="https://cdn.twik.io/tcs.js"></script>
        <title>Dev blog</title>
      </Head>
      <div className="posts">
          <h1>chicky chick my love, i miss you so much.... very soon i will be back home to you :)</h1>
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
