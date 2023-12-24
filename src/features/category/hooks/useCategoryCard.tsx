import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { deleteCategory } from '../api/category/deleteCategory'
import { editCategory } from '../api/category/editCategory'
import { getCategories } from '../api/category/getCategories'
import { Category } from '../api/types'
import { editTodo } from '@/features/todo/api/editTodo'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'
import { ModalTodoAtom } from '@/recoil/atoms/modalTodoAtom'
import { TodoCategoryAtom } from '@/recoil/atoms/todoCategoryAtom'

// todoのカテゴリーを編集するためのカスタムフック
export const useCategoryCard = (category: Category) => {
  const { data: session } = useSession()
  const [editedName, setEditedName] = useState(category.name)
  const [isEditing, setIsEditing] = useState(false)
  const setCategories = useSetRecoilState(CategoryAtom)
  const [modalTodo, setModalTodo] = useRecoilState(ModalTodoAtom)
  const [todoCategory, setTodoCategory] = useRecoilState(TodoCategoryAtom)
  const [checked, setChecked] = useState(false)

  const handleEdit = async () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    const updatedCategory = {
      name: editedName,
    }
    await editCategory({ updatedCategory, id: category.id as number })
    setIsEditing(false)
    const categories = await getCategories({ id: session?.user?.id ?? '' })
    setCategories(categories)
  }

  const handleDelete = async (id: number) => {
    await deleteCategory({ id })
    const categories = await getCategories({ id: session?.user?.id ?? '' })
    setCategories(categories)
  }

  const updateTodoCategory = async () => {
    if (!modalTodo || !category.id) {
      return
    }

    const newCategoryId = category.id

    const updatedTodo = {
      ...modalTodo,
      category_ids: [...modalTodo.category_ids, newCategoryId],
    }

    await editTodo({
      id: updatedTodo.id,
      updatedTodo,
    })

    setModalTodo(updatedTodo)
  }

  const updateTodoCategoryRemove = async () => {
    if (!modalTodo || !category.id) {
      return
    }

    const newCategoryId = category.id

    const updatedTodo = {
      ...modalTodo,
      category_ids: [...modalTodo.category_ids.filter((catId) => catId !== newCategoryId)],
    }

    await editTodo({
      id: updatedTodo.id,
      updatedTodo,
    })

    setModalTodo(updatedTodo)
  }

  useEffect(() => {
    const isCategoryChecked = todoCategory.some((todoCat) => todoCat.id === category.id)
    setChecked(isCategoryChecked)
  }, [todoCategory, category])

  const setCheckedCategory = () => {
    setChecked(!checked)
    if (checked) {
      const filteredTodoCategory = todoCategory.filter((todoCat) => todoCat.id !== category.id)
      setTodoCategory(filteredTodoCategory)
      updateTodoCategoryRemove()
    } else {
      setTodoCategory([...todoCategory, category])
      updateTodoCategory()
    }
  }

  return {
    editedName,
    setEditedName,
    isEditing,
    handleEdit,
    handleSave,
    handleDelete,
    checked,
    setCheckedCategory,
  }
}