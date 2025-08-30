import type { ReactNode } from "react"
import { Footer } from "./footer"
import Navbar from "./navbar"

interface IProps{
    children:ReactNode
}

const CommonLayout = ({children}:IProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div>{children}</div>
      <Footer/>
    </div>
  )
}

export default CommonLayout
