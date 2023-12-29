'use server'

import { revalidatePath } from "next/cache"
import { db } from "../db"


export async function CommentInPost(
    postId: string,
    comment: string,
    authorId: string,
    path: string
) {
    try {
        const Inpost = await db.post.findUnique({
            where: {
                id: postId
            }
        })
        if (!Inpost) {
            throw new Error("Dont have post")
        }

        const newComment = await db.comment.create({
            data: {
                text: comment,
                postId: postId,
                authorid: authorId
            }
        })
        revalidatePath(path)

    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);

    }

}



export async function fetchPostByID(id: string) {
    try {
        const post = await db.post.findUnique({
            where: {
                id: id,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                },
                comments: {
                    select: {
                        id: true,
                        text: true,
                        authorid: true,
                        createdAt: true,
                        author: {
                            select: {
                                id: true,
                                name: true,
                                image: true
                            }
                        },
                        postId: true,
                        Post: {
                            select: {
                                id: true,
                                content: true,
                                ImagePost: true
                            }
                        }
                    }
                },
            },
        });

        if (!post) {
            throw new Error('Post not found');
        }

        return post
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}



export async function replyComments(
    commentId: string,
    reply: string,
    authorId: string,
    path: string
) {
    try {
        const existingComment = await db.comment.findUnique({
            where: {
                id: commentId
            },
        })
        if (!existingComment) {
            throw new Error("Dont have post")
        }

        const newReplyComment = await db.comment.create({
            data: {
                postId: existingComment.postId,
                text: reply,
                authorid: authorId,
                repliedCommentId: existingComment.id,
            },
            include: {
                commentedComments: {
                    select: {
                        id: true
                    }
                }
            }


        })
        return newReplyComment

        revalidatePath(path)

    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);

    }

}





export async function fetchCommentById(id: string) {
    try {
        const comment = await db.comment.findUnique({
            where: {
                id: id,

            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                },
                repliedComment: {
                    select: {
                        id: true,
                        text: true,
                        author: {
                            select: {
                                id: true,
                                name: true,
                                image: true
                            }
                        }
                    }
                },
                commentedComments: {
                    select: {
                        id: true,
                        text: true,
                        repliedComment: true,
                        author: {
                            select: {
                                id: true,
                                name: true,
                                image: true
                            }
                        }
                    }
                },
            }
        })

        return comment

    } catch (error) {

    }

}