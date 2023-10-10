'use client'
import { Button, Text, Heading, Container, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useAddPost } from "@/hooks/useAddPost";

export default function Home() {
  const { isLoading, error, data } = usePosts()
  const { mutate } = useAddPost()

  if (isLoading) return <p>Загрузка...</p>;

  if (error) return <p>Ошибка: {query.error.message}</p>;

  return (
    <Stack justifyContent={'center'}>
      {
        data?.length ? (
          data.map(todo => {

            return (
              <Link key={todo.id} href={`/post/${todo.id}`}>
                <Stack spacing={0} border={'1px solid rgba(0,0,0,0.1)'} padding={'6px 12px'} borderRadius={'6px'}>
                  <Text>id: {todo.id}</Text>
                  <Heading size='md'>{todo.title}</Heading>
                </Stack>
              </Link>

            )
          })) : (<Text>Пусто</Text>)
      }
      <Button onClick={() => {
        mutate({ title: 'негры', body: 'gjfkdgjfdkgjdf' })
      }}>
        Добавить
      </Button>
    </Stack>
  );
}
