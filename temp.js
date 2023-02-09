if (button.getAttribute("value") == "store") {
    memory.push(ans)
}
if (item == "read") {
    inputdata.textContent += memory[memory.length - 1]
}
if (item == "add") {
    let last = +memory[memory.length - 1]
    let ans = +ans
    ans = ans + last
    ans = "" + ans
}
if (item == "minus") {
    let last = +memory[memory.length - 1]
    let ans = +ans
    ans = ans - last
    ans = "" + ans
}
if (item == "clean") {
    memory = []
}

if (item=="eq"){
    outputdata.textContent = ans
}


clear.addEventListener("click",()=>{
    inputdata.textContent=clear.getAttribute("value")
    outputdata.textContent=clear.getAttribute("value")
    temp_mem=""
})

clearone.addEventListener("click",()=>{
    let str = inputdata.textContent
    let new_str = str.slice(0,-1)
    inputdata.textContent=new_str
})
for(let button of buttons){
    button.addEventListener("click",()=>{
       let item = button.getAttribute("value");
       if(button.getAttribute("name")=="sqroot")
       
       console.log(item)
       if(item!="eq" && item!="cls") {
        inputdata.textContent+=item   
        temp_mem+=item}
        else{
        console.log("expression: ",temp_mem)
        let ans= eval(temp_mem)
        outputdata.textContent =ans
        memory.push(ans)
        console.log("Memory: ",memory)
       }
        
    })
}