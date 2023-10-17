import { useCompleteTask } from "@/hooks/useCompleteTask"
import { useRemoveTask } from "@/hooks/useRemoveTask"
import { useRevertTask } from "@/hooks/useRevertTask"
import { dateToNearFormat } from "@/parsers/dateParser"
import { setTask } from "@/store/taskSlice"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const { CloseIcon, CheckIcon, NotAllowedIcon, DeleteIcon } = require("@chakra-ui/icons")
const { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, ModalFooter, Stack, Button, Divider, Container, IconButton, Heading, Textarea } = require("@chakra-ui/react")

const TaskModal = () => {
	const dispatch = useDispatch()
	const task = useSelector(state => state.task)
	const [isOpen, setOpen] = useState(!!task)

	const onComplete = useCompleteTask(task?.id)
	const onRevert = useRevertTask(task?.id)
	const onRemove = useRemoveTask(task?.id)

	const onClose = () => {
		setOpen(false)
		dispatch(setTask(null))
	}

	const completeHandler = () => {
		onComplete.mutate()
	}

	const revertHandler = () => {
		onRevert.mutate()
	}

	const removeHandler = () => {
		onRemove.mutate()
	}

	useEffect(() => {
		setOpen(false)
	}, [onComplete.isSuccess, onRevert.isSuccess, onRemove.isSuccess])

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
					Задача
				</ModalHeader>
				<ModalBody paddingBottom={'24px'}>
					<Stack>
						<Heading size='lg'>{task.title}</Heading>
						<Divider />
						<Text color={'gray.400'}>
							{dateToNearFormat(new Date().valueOf() - parseInt(task.date))}
						</Text>
						<Text whiteSpace={'pre-wrap'}>
							{task.description}
						</Text>
					</Stack>

				</ModalBody>
				<Divider />
				<ModalFooter padding={'0'}>
					<Stack spacing={0} direction={'row'} width={'100%'} justifyContent={'space-between'} align={'center'}>
						<Stack onClick={removeHandler} userSelect={'none'} direction={'row'} align='center' cursor={'pointer'} borderRadius={5} _hover={{ background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.7)' }} color={'gray.400'} width={'100%'} padding={'16px 24px'}>
							<DeleteIcon boxSize={'12px'} />
							<Text>Удалить</Text>
						</Stack>
						<Divider orientation="vertical" height='24px' />
						{
							task.isCompleted ? (
								<Stack onClick={revertHandler} userSelect={'none'} direction={'row'} justify={'end'} cursor={'pointer'} borderRadius={5} width={'100%'} padding={'16px 24px'} _hover={{ background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.7)' }} color={'gray.400'} align={'center'}>
									<Text>Невыполнено</Text>
									<NotAllowedIcon boxSize={'12px'} />
								</Stack>
							) : (
								<Stack onClick={completeHandler} userSelect={'none'} direction={'row'} justify={'end'} cursor={'pointer'} borderRadius={5} width={'100%'} padding={'16px 24px'} _hover={{ background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.7)' }} color={'gray.400'} align={'center'}>
									<Text>Выполнено</Text>
									<CheckIcon boxSize={'12px'} />
								</Stack>
							)
						}

					</Stack>
				</ModalFooter>
				<ModalCloseButton />
			</ModalContent>
		</Modal >
	)
}

export { TaskModal }