'use client'
import { usePostByID } from "@/hooks/usePostByID"
import { Stack, Text, Heading } from "@chakra-ui/react"

const PostPage = ({ params }) => {
	const { post_id } = params

	const { data, isFetching, error } = usePostByID(post_id)

	if (isFetching) {
		return (
			<Heading>
				Загрузка...
			</Heading>
		)
	}

	if (error) {
		return (
			<Heading>
				Error: {error.message}
			</Heading>
		)
	}

	return (
		<Stack>
			<Text>
				{data.id}
			</Text>
			<Heading>
				{data.title}
			</Heading>
		</Stack>
	)
}

export default PostPage