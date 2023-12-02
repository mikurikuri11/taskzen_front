"use client";

import { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdSaveAlt } from "react-icons/md";
import { Category } from '../api/types';

interface CategoryCardProps {
  category: Category
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [editedName, setEditedName] = useState(category.name);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = async () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    setIsEditing(false);
  }

  return (
    <div key={category.id} className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id="offers"
          aria-describedby="offers-description"
          name="offers"
          type="checkbox"
          className="h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        {isEditing ? (
          <input
            type='text'
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className='px-1 rounded border-gray-400 border mr-1'
          />
        ) : (
          <label htmlFor="offers" className="font-medium text-gray-900">
            {category.name}
          </label>
        )}
        {' '}
      </div>
      <div className="flex-grow" />
      <div className='text-xl cursor-pointer'>
        {isEditing ? (
          <MdSaveAlt onClick={handleSave} />
        ) : (
          <CiEdit onClick={handleEdit} />
        )}
      </div>
    </div>
  );
}
