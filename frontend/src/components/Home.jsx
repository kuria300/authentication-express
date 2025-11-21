import { Head } from "./Head"

export const Home = () => {
  return (
    <>
      <Head />

      <div className="flex items-center justify-center bg-slate-200 h-[calc(100vh-60px)]">
        <h1 className="text-4xl font-bold animate-fade-in-up">Welcome Guest!</h1>
      </div>
    </>
  )
}
