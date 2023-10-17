'use client'
import { Button, Text, Heading, Container, Stack, Textarea, Divider, ButtonGroup, Grid, Input, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader, ModalFooter } from "@chakra-ui/react";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useAddTask } from "@/hooks/useAddTask";
import { ArrowForwardIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { TaskModal } from "./taskModal";
import { TaskItem } from "./taskItem";




export default function Home() {
  const { isLoading, error, data } = useGetTasks()
  const onAddTask = useAddTask()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  if (isLoading) return <p>Загрузка...</p>;

  if (error) return <p>Ошибка: {query.error.message}</p>;

  const addTaskHandler = () => {
    if (!title) return
    onAddTask.mutate({ title, description })
  }

  return (
    <>
      <Grid gap='12' templateColumns={'300px 1fr 1fr'}>
        <Stack height={'auto'} top={'24px'} position={'sticky'} spacing={6}>
          <Heading size={'lg'}>
            Написать задачу
          </Heading>
          <Stack spacing={3}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"Заголовок"} />
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" />
          </Stack>
          <Button isLoading={onAddTask.isLoading} isDisabled={!title} rightIcon={<ArrowForwardIcon />} onClick={addTaskHandler}>
            Добавить
          </Button>
        </Stack>
        <Stack height={'min-content'} border='1px solid rgba(0,0,0,0.1)' borderRadius={8} padding={'8px'}>
          <Stack padding={'4px 2px'} spacing='3'>
            <Text opacity={'0.5'} fontSize='sm'>
              В процессе
            </Text>
            <Divider />
          </Stack>
          <Stack>
            {
              data?.filter(it => !it.isCompleted).length ? (
                data.map(task => {
                  if (task.isCompleted) return
                  return (
                    <TaskItem key={task.id} id={task.id} title={task.title} date={task.date} isCompleted={task.isCompleted} description={task.description} />
                  )
                })) : (
                <Stack justify={'center'} align={'center'} height={'100px'} direction={'column'} spacing={0} padding={'6px'}>
                  <Text opacity={'0.5'} fontSize='lg'>
                    Пусто
                  </Text>
                  <Text opacity={'0.5'} fontSize='sm' noOfLines={2} maxWidth={'175px'} align={'center'}>
                    Здесь будут все задачи, кроме выполненных
                  </Text>
                </Stack>
              )
            }

          </Stack>
        </Stack>
        <Stack height={'min-content'} border='1px solid rgba(0,0,0,0.1)' borderRadius={8} padding={'8px'}>
          <Stack padding={'4px 2px'} spacing='3'>
            <Text opacity={'0.5'} fontSize='sm'>
              Готово
            </Text>
            <Divider />
          </Stack>
          <Stack>
            {
              data?.filter(it => it.isCompleted).length ? (
                data.map(task => {
                  if (!task.isCompleted) return
                  return (
                    <TaskItem key={task.id} id={task.id} title={task.title} date={task.date} isCompleted={task.isCompleted} description={task.description} />
                  )
                })) : (
                <Stack justify={'center'} align={'center'} height={'100px'} direction={'column'} spacing={0} padding={'6px'}>
                  <Text opacity={'0.5'} fontSize='lg'>
                    Пусто
                  </Text>
                  <Text opacity={'0.5'} fontSize='sm' noOfLines={2} maxWidth={'175px'} align={'center'}>
                    Здесь будут выполненные задачи
                  </Text>
                </Stack>
              )
            }

          </Stack>
        </Stack>
      </Grid>
      <TaskModal />
    </>
  );
}
