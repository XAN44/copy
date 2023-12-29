import CommentCard from "@/components/post/commentCard";
import Comment from "@/components/post/commentForm";
import PostCard from "@/components/post/postCard";
import { fetchUser } from "@/lib/actions/user.action";
import {
  CommentInPost,
  fetchCommentById,
  fetchPostByID,
} from "@/lib/actions/user.comment";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import ReplyCard from "@/components/post/replyCard";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await getCurrentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo) redirect("/profile");

  const postBy = await fetchPostByID(params.id);
  const commentBy = await fetchCommentById(params.id);

  return (
    <section className="relative ">
      <div className="">
        <PostCard
          key={postBy.id}
          id={postBy.id}
          content={postBy.content}
          ImagePost={postBy.ImagePost}
          authorId={postBy.authorId}
          createAt={new Date(postBy.createdAt).toLocaleString()}
          author={postBy.author}
          comments={postBy.comments}
        />
      </div>
      <div className="mt-7 left-3 ">
        <Comment
          postId={params.id}
          currentUserImage={user.image}
          currentUserId={JSON.stringify(user.id)}
        />
      </div>
      <div className="mt-10">
        {postBy.comments.map((comment: any) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            content={comment.text}
            ImagePost={comment.ImagePost}
            authorId={comment.authorId}
            createAt={new Date(comment.createdAt).toLocaleString()}
            author={comment.author || { id: "", name: "", image: "" }}
            comments={comment}
            isComment
          />
        ))}
        {commentBy?.id && (
          <ReplyCard
            id={commentBy.id}
            text={commentBy.text}
            authorid={commentBy.authorid}
            createAt={new Date(commentBy.createdAt).toLocaleString()}
            author={commentBy.author || { id: "", name: "", image: "" }}
            replyComment={commentBy.repliedComment?.text || ""}
            commentedCommenteds={commentBy.commentedComments}
          />
        )}
      </div>
    </section>
  );
};

export default Page;
