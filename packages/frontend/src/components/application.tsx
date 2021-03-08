import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Routers/main.router";

export default function Application() {
  return (
    <BrowserRouter>
      <MainRouter/>
    </BrowserRouter>
  )
}