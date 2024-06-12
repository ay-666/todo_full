import { useState } from "react";

export function CreateTodo(){
    const [title,setTitle] = useState([]);
    const [description,setDescription] = useState([]);
    return <div>
        <input style={{
            padding:10,margin:10
        }} type = "text" placeholder="title" onChange={function(e){
            const val = e.target.value;
            setTitle(val)
        }}></input><br/>
        <input style={{
            padding:10,margin:10
        }} type="text" placeholder="description" onChange={function(e){
            const val = e.target.value;
            setDescription(val)
        }}></input>
        <br/>

        <button style={{
            padding:10,margin:10
        }}  onClick={function (){
            fetch('http://localhost:3000/todo', {
                method: "POST",
                body: JSON.stringify(
                    {
                        title: title,
                        description: description
                    }
                ),
                headers:{
                    "Content-type":"application/json"
                }
            }).then(async(res)=>{
                const json = await res.json();
                alert("Todo created!")
            })
        }        }>Add Todo</button>

        
    </div>
}