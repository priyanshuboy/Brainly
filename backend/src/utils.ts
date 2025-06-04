
export function RandomLinks(len : number){
   
    const option = "priyamnhsu04304-30jkjdkejejfkjffe303"
    let length =option.length;
    let result = '';
    for(let i =0 ;i<len; i++){
   
        result += option[Math.floor(Math.random()*length)]           
    }
     return result
}