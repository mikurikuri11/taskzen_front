import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdSaveAlt, MdDeleteOutline } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { Category } from '../types';
import { useCategoryCard } from '@/features/category/hooks/useCategoryCard';
import { editTodo } from '@/features/todo/api/editTodo';
import { Todo } from '@/features/todo/types';

interface CategoryCardProps {
  todo: Todo | null;
  category: Category;
  onCategoryCheckChange: (categoryId: number, checked: boolean) => void;
}

export const CategoryCard = (props: CategoryCardProps) => {
  const { todo, category, onCategoryCheckChange } = props;
  const [checked, setChecked] = useState(false);

  const updateTodoCategory = async (newCategoryId: number) => {
    if (!todo || !category.id) return;

    let updatedCategoryIds = [];
    if (todo.category_ids) {
      updatedCategoryIds = [...todo.category_ids, newCategoryId];
    } else {
      updatedCategoryIds = [newCategoryId];
    }
    const updatedTodo = {
      ...todo,
      category_ids: updatedCategoryIds,
    };
    await editTodo({
      id: updatedTodo.id,
      updatedTodo,
    });
  };

  const updateTodoCategoryRemove = async (newCategoryId: number) => {
    if (!todo || !category.id) return;

    const updatedTodo = {
      ...todo,
      category_ids: [...todo.category_ids.filter(catId => catId !== newCategoryId)],
    };

    await editTodo({
      id: updatedTodo.id,
      updatedTodo,
    });
  };

  const handleCheckboxChange = () => {
    // const newCategoryId = category.id as number;
    // setChecked(!checked);
    // onCategoryCheckChange(newCategoryId, !checked);
    // if (!checked) {
    //   setTodoCategory([...todoCategory, category]);
    //   updateTodoCategory(newCategoryId);
    // } else {
    //   const filteredTodoCategory = todoCategory.filter(todoCat => todoCat.id !== newCategoryId);
    //   setTodoCategory(filteredTodoCategory);
    //   updateTodoCategoryRemove(newCategoryId);
    // }
  };

  console.log('todo', todo);

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
          checked={checked} // Use checked state here
        />
      </div>
      <div className='ml-3 text-sm leading-6'></div>
      <div className='flex-grow' />
      <div className='text-xl cursor-pointer'></div>
    </div>
  );
};
