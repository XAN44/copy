import { Container, Flex, Grid, containerPropDefs } from "@radix-ui/themes";
import Image from "next/image";
import { AvatarImage, Avatar } from "../ui/avatar";
import Link from "next/link";

interface Props {
  id: string;
  text: string;
  createAt: string;
  authorid: string | null;
  author: {
    id: string | null;
    name: string | null;
    image: string | null;
  };
  replyComment: string;
  commentedCommenteds: {
    id: string;
    text: string;
    author: {
      id: string | null;
      name: string | null;
      image: string | null;
    } | null;
  }[];
}

const replyCard = ({
  id,
  text,
  createAt,
  author,
  authorid,
  replyComment,
  commentedCommenteds,
}: Props) => {
  return (
    <Container>
      <Flex gap="2">
        <h1>{text}</h1>
        <Avatar>
          {author?.image && (
            <AvatarImage
              src={author?.image}
              width={100}
              height={100}
              alt="profileImage"
            />
          )}
        </Avatar>
      </Flex>
      <h1>REPLY</h1>
      {commentedCommenteds.map((reply) => (
        <div key={reply.id}>
          <Flex gap="2">
            <h1>{reply.text}</h1>
            <Link href={`/profile/${reply.author?.id}`}>
              <Avatar>
                {reply?.author?.image && (
                  <AvatarImage
                    src={reply?.author?.image}
                    width={100}
                    height={100}
                    alt="profileImage"
                  />
                )}
              </Avatar>
            </Link>
          </Flex>
        </div>
      ))}
    </Container>
  );
};

export default replyCard;
