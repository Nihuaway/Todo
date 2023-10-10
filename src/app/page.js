'use client'
import { Button, Text, Heading, Container, Stack, Textarea, Divider, ButtonGroup, Grid, Input, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader, ModalFooter } from "@chakra-ui/react";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useAddPost } from "@/hooks/useAddPost";
import { ArrowForwardIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask } from "@/store/taskSlice";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'


const TaskModal = () => {
  const dispatch = useDispatch()
  const task = useSelector(state => state.task)
  const [isOpen, setOpen] = useState(!!task)

  const onClose = () => {
    setOpen(false)
    dispatch(setTask(null))
  }

  useEffect(() => {
    setOpen(!!task)
  }, [task])

  if (!task) {
    return (<Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Загрузка...
        </ModalHeader>
        <ModalCloseButton />
      </ModalContent>
    </Modal>)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {task.title}
        </ModalHeader>
        <ModalBody>
          <Text>
            {new Date().toDateString()}
          </Text>
          <Text>KFKLfkl</Text>
        </ModalBody>
        <ModalFooter>
          <Stack direction={'row'} width={'100%'} justifyContent={'space-between'} align={'center'}>
            <Button variant={'ghost'} padding={'0'}>
              <CloseIcon boxSize='12px' />
            </Button>
            <Button variant={'ghost'} padding={'0'}>
              <CheckIcon boxSize='12px' />
            </Button>

          </Stack>
        </ModalFooter>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  )
}

const TaskItem = ({ id, title, description, date, isCompleted }) => {
  const dispatch = useDispatch()
  const onSelect = () => {
    dispatch(setTask({ id, title, description, date, isCompleted }))
  }

  return (
    <Stack justify={'space-between'} direction={'row'} spacing={0} border={'1px solid rgba(0,0,0,0.1)'} padding={'6px 6px 6px 12px'} borderRadius={'6px'}>
      <Stack>
        <Stack onClick={onSelect} cursor={'pointer'}>
          <Heading size='md'>{title}</Heading>
          <Text userSelect={'none'} fontSize={'sm'} opacity={'0.5'}>{new Date().toDateString()}</Text>
        </Stack>
        <Text noOfLines={1}>{description}</Text>
      </Stack>
      {
        isCompleted || (
          <Button variant={'ghost'} borderRadius={'4'} padding={'0'} height={'100%'}>
            <CheckIcon boxSize='12px' />
          </Button>
        )
      }
    </Stack>
  )

}

export default function Home() {
  const { isLoading, error, data } = usePosts()
  const { mutate } = useAddPost()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  if (isLoading) return <p>Загрузка...</p>;

  if (error) return <p>Ошибка: {query.error.message}</p>;

  const addTask = () => {
    if (!title) return
    mutate({ title, description })
  }

  return (
    <>
      <Grid gap='12' templateColumns={'300px auto auto'}>
        <Stack height={'min-content'} top={'24px'} position={'sticky'} spacing={6}>
          <Heading size={'lg'}>
            Написать задачу
          </Heading>
          <Stack spacing={3}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"Заголовок"} />
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" />
          </Stack>
          <Button isDisabled={!title} rightIcon={<ArrowForwardIcon />} onClick={addTask}>
            Добавить
          </Button>
        </Stack>
        <Stack border='1px solid rgba(0,0,0,0.1)' borderRadius={8} padding={'8px'}>
          <Stack padding={'4px 2px'} spacing='3'>
            <Text opacity={'0.5'} fontSize='sm'>
              В процессе
            </Text>
            <Divider />
          </Stack>
          <Stack>
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

          </Stack>
        </Stack>
        <Stack border='1px solid rgba(0,0,0,0.1)' borderRadius={8} padding={'8px'}>
          <Stack padding={'4px 2px'} spacing='3'>
            <Text opacity={'0.5'} fontSize='sm'>
              Готово
            </Text>
            <Divider />
          </Stack>
          <Stack>
            {
              data?.length ? (
                data.map(todo => {

                  return (
                    <TaskItem key={todo.id} id={todo.id} title={todo.title} date={'2932832'} isCompleted={false} description={todo.description} />

                  )
                })) : (<Text>Пусто</Text>)
            }

          </Stack>
        </Stack>
      </Grid>
      <TaskModal />
    </>
  );
}
