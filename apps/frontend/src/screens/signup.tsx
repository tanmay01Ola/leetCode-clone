import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
import axios from "axios"
import {  useRef } from "react";
export function Signup(){
    const navigate = useNavigate();
   const emailRef = useRef<HTMLInputElement>(null);
const passRef = useRef<HTMLInputElement>(null);
const nameRef = useRef<HTMLInputElement>(null);
const roleRef = useRef<HTMLSelectElement>(null);

      async function handleSignup(){
               const email = emailRef.current?.value;
   const password = passRef.current?.value;
   const username = nameRef.current?.value;
   const role = roleRef.current?.value;
   console.log("HERERERERR")
      await axios.post(`http://localhost:4000/user/signup` , {
           email,
           password,
           username,
           role
        }).then(response =>{
            console.log("herere" , response.data)
           navigate("/signin")
        })
    }

    return(
        <div className=" grid place-items-center" style={{paddingTop : 400}}>
            <div style={{display : "flex" , flexDirection : "column"}}>
                <Input className="input" placeholder="email" ref={emailRef}></Input>
             <Input className="input" placeholder="password" ref = {passRef}></Input>
             <Input className="input" placeholder="username" ref={nameRef}></Input>
                 <NativeSelect className="input" ref={roleRef}>
  <NativeSelectOption value="">SELECT ROLE</NativeSelectOption>
  <NativeSelectOption value="user">user</NativeSelectOption>
  <NativeSelectOption value="admin">admin</NativeSelectOption>
</NativeSelect>
            </div>
            <div>
                  <Button className="button" onClick={handleSignup}> SIGNUP</Button>
            </div>

        </div>
    )
}