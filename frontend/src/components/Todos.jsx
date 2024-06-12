import { useState } from "react";

export function Todos({todos}){
    return <div>
        {todos.map((todo)=>{
            return <div>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button onClick={async()=>{
                    const res = await fetch('http://localhost:3000/completed',{
                        method:"PUT",
                        body:JSON.stringify({
                            id:todo._id
                        }),
                        headers:{
                            "Content-type":"application/json"
                        }
                    });
                    const jsonData = await res.json();

                }}>{todo.completed == true ? "Completed":"Mark as Complete"}</button>

                <button style={{
            margin:10,padding:10
        }} onClick={ async function(){
            const res = await fetch('http://localhost:3000/todo',{
                method:"DELETE",
                body:JSON.stringify({
                    id:todo._id
                }),
                headers:{
                    "Content-type":"application/json"
                }

            });
            const jsonData = await res.json();
        }} >Delete</button>

                
                </div>
        })}
    </div>
}