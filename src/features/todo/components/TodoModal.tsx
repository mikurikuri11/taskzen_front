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
import { useRecoilState } from 'recoil'
import { addTodo } from '../api/addTodo'
import { editTodo } from '../api/editTodo'
import { useCategory } from '@/features/category/hooks/useCategory'
import { deleteTodo } from '@/features/todo/api/deleteTodo'
import { getIncompleteTodos } from '@/features/todo/api/getIncompleteTodos'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { Id, Todo, Category } from '@/types'

interface Props {
  selectedTodo: Todo | null
  opened: boolean
  close: () => void
}

export const TodoModal = (props: Props) => {
  const { selectedTodo, opened, close } = props

  // フォーム用
  const [isCompleted, setIsCompleted] = useState<boolean>(selectedTodo?.completed || false)
  const [zone, setZone] = useState<ComboboxItem | null>(null)

  const { data: session, status } = useSession()
  const { data: categoryData } = useCategory(session ? session.user.id : null)
  const categories = categoryData?.map((category: Category) => ({
    value: String(category.id),
    label: category.name,
  }))
  const [categoryValues, setCategoryValues] = useState<ComboboxItem[] | null>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[] | null>([])

  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [checked, setChecked] = useState(false)

  const defaultValues = {
    title: selectedTodo?.title,
    categories: selectedTodo?.categories,
    zone: selectedTodo?.zone,
    due_date: selectedTodo?.due_date,
    description: selectedTodo?.description,
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

  const [incompletedTodos, setIncompletedTodos] = useRecoilState(IncompletedTodoAtom)

  // カテゴリーのデータをフォームにセット
  useEffect(() => {
    setCategoryValues(categories)
  }, [categoryData])

  // 領域のデータをフォームにセット
  useEffect(() => {
    setZone(selectedTodo?.zone.toString() as unknown as ComboboxItem)
  }, [selectedTodo])

  // ToDoが変更されたらフォームをリセット
  useEffect(() => {
    reset(defaultValues)
  }, [selectedTodo])

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    if (!session?.user?.id) return

    setSelectedCategories((prev) => (prev ? [...prev] : []) as Category[])

    const newTodo = {
      ...data,
      categories: selectedCategories ?? selectedCategories ?? selectedTodo?.categories,
      zone: zone?.value ? zone.value : selectedTodo?.zone,
      due_date: dueDate ?? dueDate ?? selectedTodo?.due_date,
      completed: isCompleted,
    } as Todo

    try {
      if (selectedTodo) {
        await editTodo({
          updatedTodo: newTodo,
          todoId: selectedTodo.id,
          id: session.user.id,
        })
      } else {
        await addTodo({
          todo: newTodo,
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
              <MultiSelect
                checkIconPosition='left'
                defaultValue={
                  defaultValues?.categories?.map((category: Category) => String(category.id)) ?? []
                }
                label='カテゴリー'
                placeholder='カテゴリーを選択してください'
                data={categoryValues ?? []}
                onChange={(values) => {
                  setSelectedCategories(
                    values.map((value) => {
                      const category = categoryData?.find(
                        (category: Category) => category.id === Number(value),
                      )
                      return category as Category
                    }),
                  )
                }}
              />
            </div>

            <div className='sm:col-span-4'>
              <Select
                defaultValue={defaultValues?.zone ? String(defaultValues.zone) : null}
                label='領域'
                withAsterisk
                placeholder='選択してください'
                data={[
                  { value: '1', label: '第1領域' },
                  { value: '2', label: '第2領域' },
                  { value: '3', label: '第3領域' },
                  { value: '4', label: '第4領域' },
                ]}
                onChange={(_value, option) => setZone(option)}
              />
              {errors.zone && <span className='text-red-500'>領域は必須です</span>}
            </div>

            <div className='sm:col-span-4'>
              <DatePickerInput
                defaultValue={
                  dueDate || (defaultValues?.due_date ? new Date(defaultValues?.due_date) : null)
                }
                valueFormat='YYYY/MM/DD'
                label='日付'
                placeholder='日付を選択してください'
                onChange={setDueDate}
              />
            </div>

            <div className='col-span-full'>
              <Textarea
                {...register('description')}
                defaultValue={defaultValues?.description}
                label='詳細'
                placeholder='詳細を入力してください'
              />
            </div>

            {selectedTodo ? (
              <div className='sm:col-span-6'>
                <Checkbox
                  label='完了'
                  checked={checked}
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                />
              </div>
            ) : null}
            {selectedTodo ? (
              <div className='col-span-full flex gap-4'>
                <Button type='submit' color='violet'>
                  更新
                </Button>
                <Button
                  type='submit'
                  onClick={() => selectedTodo && handleDeleteTodo(selectedTodo.id)}
                  color='red'
                >
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
