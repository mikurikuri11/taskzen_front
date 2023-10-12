"use client";

import { getHello, Hello } from "@/helloAPI"

export default function Home() {
  const toggleButton = async () => {
    const hello: Hello = await getHello();
    console.log(hello);
  }
  return (
    <>
      <h1>Home</h1>
      <button
        onClick={() => toggleButton()}
        className="bg-green-400 font-medium p-2"
      >
          Hello
      </button>
    </>
  )
}
