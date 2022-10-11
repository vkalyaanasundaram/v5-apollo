import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/components/Posts.module.scss";
import PostLargeImage from "./PostLargeImage";
import PostImage from "./PostImage";
import Heading, { HeadingProps } from "./Heading";
import { useRouter } from 'next/router'

export default function Blog({ heading,
    posts,
    id,
    postTitleLevel,
    postMainTitleLevel,
    readMoreText = "Read more",
    intro
}) {
    const router = useRouter()
    const searchPost = (event) => {
        router.push(`/blog/SearchResult?keyword=${event}`)
    }

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
                <>
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
                </>
                <div className="grid grid-cols-1 gap-4 my-10 mx-2" >
                    <input
                        type="text"
                        name="searchIco"
                        id="searchIco"
                        placeholder="Search"
                        className="border-2 border-gray-300 p-2 w-full"
                        onBlur={(e) => searchPost(e.target.value)}
                    />
                    {/* <input type="text" name="SearchBlog" className="p-2" placeholder="Search Blogs" /> */}
                </div>

                <div className="grid grid-cols-3 gap-4">

                    {
                        posts?.map((post, key) => (
                            <div key={key ?? ""} id={`post-${post.id}`}>
                                <>
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
                                </>
                            </div>
                        )
                            // )
                        )}
                    {/* {posts && posts?.length < 1 && <p>No posts found.</p>} */}
                </div>
            </>
        </section>
    );
}