import { Button } from "@/components/ui/button"; 
import axios from "axios";
import { useEffect } from "react";
const token = localStorage.getItem("token");
export function LandingPage(){

    useEffect( ()=>{
       axios.get("http://localhost:4000/problem" , {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
       })
      .then(response=>{
         console.log("REPSONSE =" ,response)
      })
    },[])
  return(
    <div  className="w-full">
        <div className="flex gap-10 pt-3">
             <Button className="rounded-full" variant="outline" size="lg">Problems</Button>
    <Button className="rounded-full" variant="outline" size="lg"> CONTEST</Button>
    <Button className="rounded-full" variant='outline' size="lg">INTERVIEW</Button>
        </div>
      <hr className="w-full mt-4 border-gray-300" />
    </div>
  )
}