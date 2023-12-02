"use client";

import { Category } from '../api/types';
import { CategoryCard } from './CategoryCard';

interface CategoryListProps {
  categories: Category[];
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, isEditing, onEdit, onSave }) => {
  return (
    <div className="space-y-5">
      {categories.length === 0 && (
        <div>
          カテゴリーがありません
        </div>
      )}
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          isEditing={isEditing}
          onEdit={onEdit}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
