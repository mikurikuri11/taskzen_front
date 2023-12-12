import Link from "next/link"

export const Step4 = () => {
  return (
    <div className="bg-gray-50 sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-xl font-semibold leading-6 text-gray-900">実際にTaskzenを使ってみよう</h3>
        <div className="mt-5 text-md text-gray-600">
          <p>
            それでは実際にアプリを使ってみましょう。<br />
            アプリを使う前に、ログインする必要があります。<br />
            右上のログインをクリックして、ログインしてください。<br />
            ログインが完了したら、タスクを追加してみましょう。<br />
            タスクを追加する際には、領域を選択しましょう。普段のタスク管理アプリでは、あまり意識しないことだと思います。<br />
            しかし、領域を選択することで、自分の人生の中で最も重要なことを意識することができます。<br />
            また、Taskzenではタスクの1週間ごとの達成率を可視化する機能や通知する機能もあります。<br />
          </p>
        </div>
        <div className="mt-5 text-sm text-gray-400">
          <h4>7つの習慣をもっと学びたい方へ...</h4>
          <p>
            7つの習慣についてもっと学びたい方は、以下の書籍やWebサイトを参考にしてください。<br />
            <ul>
              <li>
                ・<Link href="https://www.amazon.co.jp/%E5%AE%8C%E8%A8%B3-7%E3%81%A4%E3%81%AE%E7%BF%92%E6%85%A3-%E4%BA%BA%E6%A0%BC%E4%B8%BB%E7%BE%A9%E3%81%AE%E5%9B%9E%E5%BE%A9-%E3%82%B9%E3%83%86%E3%82%A3%E3%83%BC%E3%83%96%E3%83%B3%E3%83%BBR%E3%83%BB%E3%82%B3%E3%83%B4%E3%82%A3%E3%83%BC/dp/4863940246" target="_blank" className="text-blue-400">完訳 7つの習慣 人格主義の回復</Link>
              </li>
              <li>
                ・<Link href="https://type.jp/tensyoku-knowhow/skill-up/book-summary/vol1" target="_blank" className="text-blue-400">10分で読める要約『完訳 7つの習慣~人格主義の回復~』</Link>
              </li>
              <li>
                ・<Link href="https://www.hr-doctor.com/news/management/engagement/management_time_effective_2steps-2" target="_blank" className="text-blue-400">第３の習慣「最優先事項を優先する」を身に付け - HRドクター</Link>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  )
}
