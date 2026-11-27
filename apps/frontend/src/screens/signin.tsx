import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router";

export function Signin(){
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    async function handleSignin(){
        const email = emailRef.current?.value ;
        const password = passRef.current?.value;
        await axios.post("http://localhost:4000/user/signin" , {
                email ,
                password
        }).then(response =>{
            console.log("RESPONSE -" , response.data.token);
            const token  = response.data.token ; 
            localStorage.setItem("token" , token)
            navigate("/landingPage")
        }) 
    }
    return(
        <div  className=" grid place-items-center" style={{paddingTop : 400}}>
            <div style={{display : "flex" , flexDirection : "column"}}>
                            <Input className="input" placeholder="email" ref={emailRef} ></Input>
             <Input className="input" placeholder="password" ref={passRef} ></Input>
            </div>
             <div>
                  <Button className="button" onClick={handleSignin}> SIGNIN</Button>
            </div>
        </div>
    )
}