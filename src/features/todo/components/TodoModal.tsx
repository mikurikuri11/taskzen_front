'use client'

import {
  Modal,
  Button,
  Box,
  TextInput,
  Textarea,
  Select,
  ComboboxItem,
  MultiSelect,
  Checkbox,
} from '@mantine/core'
import { DatePickerInput, DatesProvider } from '@mantine/dates'
import 'dayjs/locale/ja'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addTodo } from '../api/addTodo'
import { editTodo } from '../api/editTodo'
import { useTodoCategories } from '../hooks/useTodoCategories'
import { useCategory } from '@/features/category/hooks/useCategory'
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

  const [incompletedTodos, setIncompletedTodos] = useRecoilState(IncompletedTodoAtom)

  // フォーム用
  const [isCompleted, setIsCompleted] = useState<boolean>(todo?.completed || false)
  const [zone, setZone] = useState<ComboboxItem | null>(null)

  const { data: categoryData } = useCategory(session ? session.user.id : null)
  const categories = categoryData?.map((category: Category) => ({
    value: String(category.id),
    label: category.name,
  }))
  const [categoryValues, setCategoryValues] = useState<ComboboxItem[] | null>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[] | null>([])

  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setCategoryValues(categories)
  }, [categoryData])

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    if (!session?.user?.id) return

    setSelectedCategories((prev) => (prev ? [...prev] : []) as Category[])

    const newTodo = {
      ...data,
      categories: selectedCategories ?? [],
      zone: zone?.value ?? 0,
      due_date: dueDate,
      completed: isCompleted,
    }
    console.log(newTodo)

    try {
      if (todo) {
        await editTodo({
          updatedTodo: {
            ...newTodo,
            zone: Number(newTodo.zone),
            due_date: newTodo.due_date?.toISOString() ?? '',
          },
          todoId: todo.id,
          id: session.user.id,
        })
      } else {
        await addTodo({
          todo: {
            ...newTodo,
            zone: Number(newTodo.zone),
            due_date: newTodo.due_date?.toISOString() ?? '',
          },
          id: session.user.id,
        })
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
  }, [todo, opened, reset])

  // 既にカテゴリーがある場合、初期値としてセット
  useEffect(() => {
    setSelectedCategories((data) => {
      if (todo?.categories) {
        return todo.categories
      }
      return data
    })
  }, [data, opened])

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
    <DatesProvider settings={{ locale: 'ja' }}>
      <Modal opened={opened} onClose={close}>
        <Box maw={340} mx='auto'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
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

            {/* Done */}
            <div className='sm:col-span-6'>
              <MultiSelect
                label='カテゴリー'
                placeholder='カテゴリーを選択してください'
                data={categoryValues || undefined}
                value={selectedCategories?.map((category) => String(category.id)) || []}
                onChange={(value) => {
                  const selected = categoryData?.filter((category: Category) =>
                    value.includes(String(category.id)),
                  )
                  setSelectedCategories(selected as Category[])
                }}
              />
            </div>

            {/* Done */}
            <div className='sm:col-span-4'>
              <Select
                label='領域'
                withAsterisk
                placeholder='選択してください'
                data={[
                  { value: '1', label: '第1領域' },
                  { value: '2', label: '第2領域' },
                  { value: '3', label: '第3領域' },
                  { value: '4', label: '第4領域' },
                ]}
                value={zone ? zone.value : null}
                onChange={(_value, option) => setZone(option)}
              />
              {errors.zone && <span className='text-red-500'>領域は必須です</span>}
            </div>

            {/* Done */}
            <div className='sm:col-span-4'>
              <DatePickerInput
                valueFormat='YYYY/MM/DD'
                label='日付'
                placeholder='日付を選択してください'
                value={dueDate}
                onChange={setDueDate}
              />
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
              <div className='sm:col-span-6'>
                {/* <label
                  htmlFor='title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
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
                </div> */}
                <Checkbox
                  label='完了'
                  checked={checked}
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                />
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
    </DatesProvider>
  )
}
