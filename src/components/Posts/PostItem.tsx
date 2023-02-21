import { Post } from "@/src/atoms/postAtom";
import {
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Skeleton,
  Spinner,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { Graduate } from "@next/font/google";
import moment from "moment";
import React, { useState } from "react";
import { BsChat } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline
} from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => // event: React.MouseEvent<Element, MouseEvent>,
  // post: Post,
  // vote: number,
  // communityId: string
  {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
  //   homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost
  //   homePage
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed to Delete Post");
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <Flex
      border="1px solid"
      bg={"white"}
      borderColor={"gray.300"}
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
      //   bg={bg}
      //   borderColor={singlePostPage ? singlePageBorderColor : borderColor}
      //   borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      //   _hover={{ borderColor: singlePostPage ? "none" : borderColor }}
      //   cursor={singlePostPage ? "unset" : "pointer"}
      //   onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction={"column"}
        align={"center"}
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={onVote}
          cursor="pointer"
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={onVote}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} p="10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize={"10pt"}>{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                maxHeight="460px"
                alt="Post Image"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
          <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
            >
              <Icon as={BsChat} mr={2} />
              <Text fontSize="9pt">{post.numberOfComments}</Text>
            </Flex>
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
            >
              <Icon as={IoArrowRedoOutline} mr={2} />
              <Text fontSize="9pt">Share</Text>
            </Flex>
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
            >
              <Icon as={IoBookmarkOutline} mr={2} />
              <Text fontSize="9pt">Save</Text>
            </Flex>
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  {" "}
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};
export default PostItem;