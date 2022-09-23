import Image from "next/image";
import Link from "next/link";
import styles from "../styles/components/Posts.module.scss";
import PostLargeImage from "./PostLargeImage";
import PostImage from "./PostImage";
import Heading, { HeadingProps } from "./Heading";


export default function Blog({ heading,
    posts,
    id,
    postTitleLevel,
    postMainTitleLevel,
    readMoreText = "Read more",
    intro
}) {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <section className={styles["posts-block"]} {...(id && { id })}>
            <>
                {heading && (
                    <Heading level={headingLevel} className={styles.heading}>
                        {heading}
                    </Heading>
                )}
                {intro && <p className={styles.intro}>{intro}</p>}
                <div>
                    {posts.map((post, key) => (
                        <div className="grid grid-cols-1 gap-4" key={key}>
                            {key === 0 ? (
                                <div id={`post-${post.id}`}>
                                    <div className={styles.prime}>
                                        <PostLargeImage
                                            imageSrcUrl={post?.featuredImage?.node?.sourceUrl}
                                        />
                                        <Heading
                                            level={postMainTitleLevel}
                                            className={styles.title}
                                        >
                                            <Link href={`/blog/${post.slug}`}>
                                                <a>{post.title}</a>
                                            </Link>
                                        </Heading>
                                        {/* <div
    
                          dangerouslySetInnerHTML={{ __html: post.excerpt ?? "" }}
                        /> */}
                                        <Link href={`/blog/${post.slug}`}>
                                            <a
                                                aria-label={`Read more about ${post.title || "the post"
                                                    }`}
                                            >
                                                {readMoreText}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {
                        posts?.map((post) => (
                            <div key={post.id ?? ""} id={`post-${post.id}`}>
                                <div>
                                    <PostImage imageSrcUrl={post?.featuredImage?.node?.sourceUrl} />
                                    <Heading level={postTitleLevel} className={styles.title}>
                                        <Link href={`/blog/${post.slug}`}>
                                            <a>{post.title}</a>
                                        </Link>
                                    </Heading>
                                    <div
                                        className={styles.excerpt}
                                        dangerouslySetInnerHTML={{ __html: post.excerpt ?? "" }}
                                    />
                                    <Link href={`/blog/${post.slug}`}>
                                        <a aria-label={`Read more about ${post.title || "the post"}`}>
                                            {readMoreText}
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        )
                            // )
                        )}
                    {posts && posts?.length < 1 && <p>No posts found.</p>}
                </div>
            </>
        </section>
    );
}