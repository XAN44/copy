"use client";
import { userPost } from "@/lib/actions/user.post";
import { getCurrentUser } from "@/lib/session";
import { commentPost, replyComment } from "@/lib/validations/Userpost";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/router";
import { CiImageOn } from "react-icons/ci";
import { Value } from "@prisma/client/runtime/library";
import Image from "next/image";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Container, Flex, Grid, Text } from "@radix-ui/themes";
import { CommentInPost, replyComments } from "@/lib/actions/user.comment";

interface Props {
  commentId: string;
  currentUserImage: string;
  currentUserId: string;
}

export default function Reply({
  commentId,
  currentUserImage,
  currentUserId,
}: Props) {
  const path = usePathname() ?? "";

  const replyForm = useForm<z.infer<typeof replyComment>>({
    resolver: zodResolver(replyComment),
    defaultValues: {
      reply: "",
    },
  });

  const onSubmitReply = async (values: z.infer<typeof replyComment>) => {
    await replyComments(
      commentId,
      values.reply,
      JSON.parse(currentUserId),
      path
    );
  };

  return (
    <div className="">
      <Form {...replyForm}>
        <form
          onSubmit={replyForm.handleSubmit(onSubmitReply)}
          className="
            flex  
            justify-center 
            text-center "
        >
          <FormField
            control={replyForm.control}
            name="reply"
            render={({ field }) => (
              <FormItem
                className="
                flex w-full 
                items-center 
                gap-3 "
              >
                <FormLabel>
                  <Image
                    src={currentUserImage}
                    alt="profile"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>

                <FormControl className="border-none">
                  <input
                    placeholder="reply.."
                    className=" 
                    bg-base-300
                     rounded-lg w-full p-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-32 ml-3 mt-1 flex">
            reply
          </Button>
        </form>
      </Form>
    </div>
  );
}
