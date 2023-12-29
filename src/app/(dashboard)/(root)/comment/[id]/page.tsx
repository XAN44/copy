import { fetchUser } from "@/lib/actions/user.action";
import {
  fetchCommentById,
  fetchPostByID,
  replyComments,
} from "@/lib/actions/user.comment";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import ReplyCard from "@/components/post/replyCard";
import ReplyForm from "@/components/post/replyForm";
import Reply from "@/components/post/replyForm";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await getCurrentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo) redirect("/profile");

  const commentBy = await fetchCommentById(params.id);

  console.log("###################################");
  console.log("commen11t", commentBy);
  console.log("###################################");

  return (
    <div className="">
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
      <div className="">
        <Reply
          commentId={params.id}
          currentUserImage={user.image}
          currentUserId={JSON.stringify(user.id)}
        />
      </div>
    </div>
  );
};

export default Page;
