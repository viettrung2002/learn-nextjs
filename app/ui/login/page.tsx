"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const route = useRouter()
    const API_URL = "http://127.0.0.1:5000";
    const onClickLogin = () => {
        fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })
            .then((res) => {
                console.log(res.status)
                if (res.status == 200) {
                    route.push("/ui/manage")
                }
                return res.json()
            })
            .then((data) => {
                console.log(JSON.stringify(data))
            })
            .catch((error) => console.error("Lỗi khi gọi API:", error));
        
    }

    return(
        <>
            <div className="flex bg-teal-500 w-full h-screen items-center justify-center ">
                <div className="bg-slate-200 w-96 h-96 rounded-md shadow-lg flex flex-col  items-center relative">
                    <div className=" top-0 w-full h-20 bg-teal-600 rounded-t-md flex items-center justify-center">
                        <h2 className="font-semibold font-mts text-4xl text-white ">Login Form</h2>
                    </div> 
                    <div className="w-72  h-20 flex flex-col mt-5 ">
                        <label className="block text-lg font-semibold font-mts text-stone-700">Username</label>
                        <input
                            className="w-full h-3/5 rounded-md font-mts p-3 bg-slate-200 border border-gray-400"
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}
                            placeholder="Enter your username"
                            />
                    </div>
                    <div className="w-72 h-20 flex flex-col mt-2">
                        <label className="block text-lg font-semibold font-mts text-stone-700">Password</label>
                        <input
                            className="w-full h-3/5 rounded-md font-mts p-3 bg-slate-200 border border-gray-400"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder="Enter your password"
                            />
                            
                    </div>
                    <div className="w-72 rounded-md bg-teal-600 mt-5 h-16 flex items-center justify-center">
                        <button onClick={onClickLogin} className=" font-semibold font-mts text-2xl text-white ">Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}