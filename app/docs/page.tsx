import { cookies } from "next/headers";
import QuickstartPage from "./quickstart";

export default function Docs() {
  const isLoggedIn: boolean = cookies().has("access_token");
  return (
    <QuickstartPage isLoggedIn={isLoggedIn} />
  )}