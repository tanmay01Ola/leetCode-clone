interface languageType {
        file : string ,
        compiledCmd : string
    }

export const language : Record <string , languageType>={
    c : {
        file : "solution.ts" , 
        compiledCmd : "gcc main.c -O2 -std=c11 -o main"
    }
}