import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Category } from '../../types'
import { editTodo } from '@/features/todo/api/editTodo'
import { getIncompleteTodos } from '@/features/todo/api/getIncompleteTodos'
import { Todo } from '@/features/todo/types'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'

interface CategoryCardProps {
  todo: Todo | null | undefined
  category: Category
}

export const CategoryCard = (props: CategoryCardProps) => {
  const { todo, category } = props
  const [checked, setChecked] = useState(false)
  const [incompletedTodos, setIncompletedTodos] = useRecoilState(IncompletedTodoAtom)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!todo || !category) return
    if (!todo || !todo.categories || todo.categories.length === 0) {
      setChecked(false)
      return
    }

    const isCategoryIncluded = todo.categories.some((cat) => cat.id === category.id)
    setChecked(isCategoryIncluded)
  }, [todo, category, setChecked])

  const updateTodoCategory = async (categoryId: number) => {
    if (!todo) return

    const updatedTodo = {
      ...todo,
      categories: [...todo.categories, { id: categoryId, name: category.name }],
    }
    if (!session?.user?.id) return
    await editTodo({
      updatedTodo,
      todoId: todo.id,
      id: session?.user?.id,
    })
    if (!session?.user?.id) return
    const updatedTodos = await getIncompleteTodos({ id: session.user.id })
    setIncompletedTodos(updatedTodos)
  }

  const updateTodoCategoryRemove = async (categoryId: number) => {
    if (!todo) return

    const updatedTodo = {
      ...todo,
      categories: todo.categories.filter((cat) => cat.id !== categoryId),
    }
    if (!session?.user?.id) return
    await editTodo({
      updatedTodo,
      todoId: todo.id,
      id: session?.user?.id,
    })
    if (!session?.user?.id) return
    const updatedTodos = await getIncompleteTodos({ id: session.user.id })
    setIncompletedTodos(updatedTodos)
  }

  const handleCheckboxChange = () => {
    const newCategoryId = category.id as number
    setChecked(!checked)
    if (checked) {
      updateTodoCategoryRemove(newCategoryId)
    } else {
      updateTodoCategory(newCategoryId)
    }
  }

  return (
    <div key={category.id} className='relative flex items-start gap-2'>
      <p>{category.name}</p>
      <div className='flex h-6 items-center'>
        <input
          id={category.id?.toString()}
          aria-describedby='offers-description'
          name={category.id?.toString()}
          type='checkbox'
          className='h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
          onChange={handleCheckboxChange}
          checked={checked}
        />
      </div>
      <div className='ml-3 text-sm leading-6'></div>
      <div className='flex-grow' />
      <div className='text-xl cursor-pointer'></div>
    </div>
  )
}
