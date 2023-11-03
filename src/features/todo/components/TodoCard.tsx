import { Fragment, useState, FC } from 'react'

import { TodoCardProps } from "./types";

export const TodoCard: FC<TodoCardProps> = (props) => {

  // TODO: 日付のフォーマットを整えたいが、うまくいかない
  // const getFormattedDate = (dateStr: Date) => {
  //   // 日付文字列が無効な場合は "無効な日付です" を返す
  //   if (!dateStr) {
  //     return "無効な日付です";
  //   }

  //   const date = new Date(dateStr);

  //   // 日付が有効な場合のみフォーマットして返す
  //   if (!isNaN(date.getTime())) {
  //     // 日付を指定のフォーマットに変換する例
  //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //     return date.toLocaleDateString('ja-JP');
  //   } else {
  //     return "無効な日付です";
  //   }
  // }

  const { todo, id, openModal } = props;

  return (
    <li>
      <div className="group relative flex items-center px-5 py-6">
        <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
        <div className="relative flex min-w-0 flex-1 items-center">
          <span className="relative inline-block flex-shrink-0">
            <input
              type="checkbox"
              id="area"
              name="area"
              autoComplete="area"
              className="mt-2 h-5 w-5 rounded border-0 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
            />
          </span>
          <div className="ml-4 truncate">
            <p
              className="cursor-pointer truncate text-sm font-medium text-gray-900"
              onClick={() => openModal(id)}
            >
              {todo.title}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
