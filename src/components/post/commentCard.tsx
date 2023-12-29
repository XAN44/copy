import Image from "next/image";
import Link from "next/link";
import { AvatarImage, Avatar } from "../ui/avatar";
import { classNames } from "uploadthing/client";
import { Code, Container, Flex, Grid, Text } from "@radix-ui/themes";
import { FaCommentDots } from "react-icons/fa";

interface Props {
  id: string;
  content: string | null;
  ImagePost: string | null;
  authorId: string | null;
  createAt: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
  comments: {
    id: string;
    text: string;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    } | null;
  }[];
  isComment?: boolean;
}

const CommentCard = ({
  id,
  content,
  ImagePost,
  author,
  createAt,
  authorId,
  comments,
  isComment,
}: Props) => {
  return (
    <Container size="4" p="6" className="flex w-full flex-col rounded-xl">
      {isComment ? (
        <>
          <Flex gap="3">
            {/* Profile in Comment */}

            <Link href={`/profile/${author?.id}`}>
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
            </Link>
            {/* Comment By name */}
            <Text mt="2" size="5">
              {author?.name}
            </Text>
          </Flex>
          {/* Comment In Post */}
          <Grid mt="6" ml="8" width="3">
            <Text>{content}</Text>
          </Grid>
          <Link href={`/comment/${id}`}>
            <Text>Reply</Text>
          </Link>
        </>
      ) : null}
    </Container>
  );
};

export default CommentCard;
