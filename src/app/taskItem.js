import { useCompleteTask } from "@/hooks/useCompleteTask"
import { useRevertTask } from "@/hooks/useRevertTask"
import { setTask } from "@/store/taskSlice"
import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons"
import { Button, Collapse, Divider, Grid, Heading, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const TaskItem = ({ id, title, description, date, isCompleted }) => {
	const dispatch = useDispatch()
	const onComplete = useCompleteTask(id)
	const onRevert = useRevertTask(id)
	const onSelect = () => {
		dispatch(setTask({ id, title, description, date, isCompleted }))
	}

	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(true)
	}, [])

	const completeHandler = () => {
		onComplete.mutate(id)

	}

	const revertHandler = () => {
		onRevert.mutate(id)
	}

	return (
		<Collapse in={show} animateOpacity>
			<Grid templateColumns={'auto min-content'} justify={'space-between'} spacing={0} border={'1px solid rgba(0,0,0,0.1)'} padding={'6px 6px 6px 12px'} borderRadius={'6px'}>
				<Stack width={'min-content'}>
					<Stack width={'min-content'} onClick={onSelect} cursor={'pointer'}>
						<Heading size='md'>{title}</Heading>
						<Text width={'max-content'} userSelect={'none'} fontSize={'sm'} opacity={'0.5'}>{new Date(parseInt(date)).toDateString()}</Text>
					</Stack>
					<Text opacity={'0.5'} noOfLines={2} width={'max-content'} maxWidth={'300px'}>{description}</Text>
				</Stack>
				{
					isCompleted ? (
						<Button isLoading={onRevert.isLoading} onClick={revertHandler} variant={'ghost'} borderRadius={'4'} padding={'0'} height='100%'>
							< NotAllowedIcon boxSize='14px' />
						</Button>
					) : (
						<Button isLoading={onComplete.isLoading} onClick={completeHandler} variant={'ghost'} borderRadius={'4'} padding={'0'} height='100%'>
							< CheckIcon boxSize='12px' />
						</Button>
					)
				}
			</Grid >
		</Collapse>
	)

}

export { TaskItem }