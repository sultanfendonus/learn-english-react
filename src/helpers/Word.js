export const wordPracticeIndicator = (hit)=>{
    console.log(hit)
    if(hit <= 3){
        return "Learn it"
    }else if(hit > 3 && hit <= 7){
        return "You are Pro"
    }else {
        return "You are Master"
    }
}
