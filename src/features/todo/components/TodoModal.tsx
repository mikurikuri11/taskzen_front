'use client'

import { Modal, Button, Box, TextInput, Textarea, Select } from '@mantine/core'

import { useSession } from 'next-auth/react'
import { useEffect, FC, Fragment, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addTodo } from '../api/addTodo'
import { editTodo } from '../api/editTodo'
import { useTodoCategories } from '../hooks/useTodoCategories'
import { CategoryFlyoutMenu } from '@/features/category/components/category/CategoryFlyoutMenu'
import { deleteTodo } from '@/features/todo/api/deleteTodo'
import { getIncompleteTodos } from '@/features/todo/api/getIncompleteTodos'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { Id, Todo, Category } from '@/types'

interface Props {
  todo?: Todo | null
  opened: boolean
  close: () => void
}

export const TodoModal = (props: Props) => {
  const { todo, opened, close } = props

  const defaultValues = {
    title: todo?.title,
    zone: todo?.zone,
    due_date: todo?.due_date,
    description: todo?.description,
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Todo>({
    mode: 'onChange',
    defaultValues,
  })

  const { data: session, status } = useSession()
  const { data, error, isLoading } = useTodoCategories(todo?.id ?? 0)

  const [selectedCategories, setSelectedCategories] = useState<Category[] | null>([])
  const [incompletedTodos, setIncompletedTodos] = useRecoilState(IncompletedTodoAtom)
  const [isCompleted, setIsCompleted] = useState<boolean>(todo?.completed || false)

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    if (!session?.user?.id) return

    console.log(data)

    const newTodo = {
      ...data,
      categories: selectedCategories ?? [],
      completed: isCompleted,
    }

    try {
      if (todo) {
        await editTodo({
          updatedTodo: newTodo,
          todoId: todo.id,
          id: session.user.id,
        })
      } else {
        await addTodo({ todo: newTodo, id: session.user.id })
      }

      const updatedTodos = await getIncompleteTodos({ id: session.user.id })
      setIncompletedTodos(updatedTodos)
      close()
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  // 表示するたびにフォームをリセット
  useEffect(() => {
    reset({
      title: todo?.title,
      zone: todo?.zone,
      due_date: todo?.due_date,
      description: todo?.description,
    })
    setIsCompleted(todo?.completed || false)
    setSelectedCategories((prev) => (prev ? [...prev] : []) as Category[])
  }, [open])

  // 既にカテゴリーがある場合、初期値としてセット
  useEffect(() => {
    setSelectedCategories((data) => {
      if (todo?.categories) {
        return todo.categories
      }
      return data
    })
  }, [data, todo, open])

  async function handleDeleteTodo(id: Id) {
    if (session?.user?.id) {
      try {
        await deleteTodo({ todoId: id, id: session.user.id })
        const updatedTodos = await getIncompleteTodos({ id: session.user.id })
        setIncompletedTodos(updatedTodos)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // TODO: Mantine Formを使えるかも、Zodを使ってバリデーションをかける
  return (
    <Modal opened={opened} onClose={close}>
      <Box maw={340} mx='auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Done */}
          <div className='sm:col-span-6'>
            <TextInput
              {...register('title', { required: true })}
              defaultValue={defaultValues?.title}
              label='タイトル'
              withAsterisk
              placeholder='タイトルを入力してください'
            />
            {errors.title && <span className='text-red-500'>タイトルは必須です</span>}
          </div>

          <div className='sm:col-span-6'>
            <div className='flex'>
              <label htmlFor='zone' className='block text-sm font-medium leading-6 text-gray-900'>
                カテゴリー
              </label>
              <CategoryFlyoutMenu todo={todo} setSelectedCategories={setSelectedCategories} />
              {selectedCategories &&
                selectedCategories.map((category) => (
                  <span
                    key={category.id}
                    className='rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-900'
                  >
                    <span>{category.name}</span>
                  </span>
                ))}
            </div>
          </div>

          <div className='sm:col-span-4'>
            {/* <label htmlFor='zone' className='block text-sm font-medium leading-6 text-gray-900'>
              領域
            </label>
            <div className='mt-2'>
              <select
                defaultValue={defaultValues?.zone}
                {...register('zone', { required: true })}
                id='zone'
                name='zone'
                autoComplete='zone'
                className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value=''>選択してください</option>
                <option value='1'>第1領域</option>
                <option value='2'>第2領域</option>
                <option value='3'>第3領域</option>
                <option value='4'>第4領域</option>
              </select>
            </div> */}
            <Select
              label='領域'
              placeholder='選択してください'
              data={['第1領域', '第2領域', '第3領域', '第4領域']}
            />
            {errors.zone && <span className='text-red-500'>領域は必須です</span>}
          </div>

          <div className='sm:col-span-4'>
            <label htmlFor='due_date' className='block text-sm font-medium leading-6 text-gray-900'>
              日付
            </label>
            <div className='mt-2'>
              <input
                defaultValue={defaultValues?.due_date}
                {...register('due_date')}
                id='due_date'
                name='due_date'
                type='date'
                className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder='日付'
              />
            </div>
          </div>

          {/* Done */}
          <div className='col-span-full'>
            <Textarea
              {...register('description')}
              defaultValue={defaultValues?.description}
              label='詳細'
              placeholder='詳細を入力してください'
            />
          </div>

          {todo ? (
            <div className='sm:col-span-6 mb-7'>
              <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
                完了
              </label>
              <div className='mt-2'>
                <input
                  type='checkbox'
                  id='is_completed'
                  name='is_completed'
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                />
              </div>
            </div>
          ) : null}
          {todo ? (
            <div className='col-span-full flex gap-4'>
              <Button type='submit' color='violet'>
                更新
              </Button>
              <Button type='submit' onClick={() => todo && handleDeleteTodo(todo.id)} color='red'>
                削除
              </Button>
            </div>
          ) : (
            <Button type='submit' color='violet'>
              作成
            </Button>
          )}
        </form>
      </Box>
    </Modal>
  )
}
