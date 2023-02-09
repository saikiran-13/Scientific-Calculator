let inputdata = document.querySelector(".input")
let outputdata = document.querySelector(".output")
const buttons = document.querySelectorAll("button")
let temp_cal = []
let screen_cal = []
let memory = []
let change1 = document.querySelector(".square")
let change2 = document.querySelector(".tenx")
let change3 = document.querySelector(".root")
let change4 = document.querySelector(".xy")
let trignometry = document.querySelector(".Trignometry")
let functions = document.querySelector(".function")
let trig = trignometry.querySelector(".Trig")
let fun = functions.querySelector(".fun")
let flag = true
let radians = true
let color = true


//Converting Degree to Radians
function radToDeg(rad) {
    return rad * (Math.PI / 180)
}

//Factorial
function factorial(temp, screen) {
    let ind = 0
    if (temp.length > 2) {
        for (let i = temp.length - 1; i >= 0; i--) {
            if (temp[i] === "+" || temp[i] === '-' || temp[i] === '*' || temp[i] === '/' || temp[i] === '%') {
                ind = i + 1
                temp_cal
                break;
            }
        }
    }

    let num = temp.slice(ind).join("")
    num = Number(num)

    function answer(num) {
        if (num == 0)
            return 1;
        return num * answer(num - 1)
    }

    temp_cal = temp.slice(0, ind)
    let output = answer(num)
    temp_cal.push(output)
    console.log('after', temp_cal)
    if (screen_cal.length <= 2) {
        screen_cal = []
        screen_cal.push(output)
        return screen_cal
    }
    else {
        return output;
    }

}

//Sign Change
function opreverse(screen, temp) {
    if ((screen.length === 1) && (temp.length === 1)) {
        screen.unshift("-")
        temp.unshift("-")
    }
    else if (screen.length > 1) {

        let lastplus = screen.lastIndexOf("+")
        let lastminus = screen.lastIndexOf("-")
        if (lastplus > lastminus) {
            screen[lastplus] = "-"
            temp[lastplus] = "-"
        } else {
            screen[lastminus] = "+"
            temp[lastminus] = "+"
        }

    }
    return screen, temp

}

//All buttons
for (let button of buttons) {
    //Click on particular button
    button.addEventListener("click", () => {
        let finalvalue = Number(outputdata.textContent);
        let value = button.getAttribute("value")
        let name = button.getAttribute("name")
        let type = button.getAttribute("type")

        //Memory operations
        if (name === "mem") {
            try {
                switch (value) {
                    case "store":
                        memory.push(finalvalue)
                        break;
                    case "read":
                        outputdata.textContent += memory[memory.length - 1]
                        break;
                    case "add":
                        last = +memory.pop()
                        finalvalue = finalvalue + last
                        memory.push(finalvalue)
                        break;
                    case "minus":
                        last = +memory.pop()
                        finalvalue = finalvalue - last
                        memory.push(finalvalue)
                        break;
                    case "clean":
                        memory = []
                        break;
                    default:
                        console.log(memory)
                }

            }
            catch {
                outputdata.textContent = "ERROR"
            }
            console.log("Memory: ", memory)
        }

        //Clear button
        else if (name === "clear") {
            try {
                inputdata.textContent = value
                outputdata.textContent = value
                temp_cal.length = 0
                screen_cal.length = 0
                trig.selected = true
                fun.selected = true
                console.log(temp_cal, screen_cal)
            }
            catch {
                outputdata.textContent = "ERROR"
            }
        }

        //Back button
        else if (name === "cls") {
            try {
                temp_cal.pop()
                screen_cal.pop()
                inputdata.textContent = screen_cal.join("")
                outputdata.textContent = ""
            }
            catch {
                outputdata.textContent = "ERROR"
            }
        }

        //2nd Button
        else if (name === "second") {
            try {
                if (color == true) {
                    button.style.backgroundColor = "rgb(10,160,255)"
                    color = false
                }
                else {
                    button.style.backgroundColor = "rgba(250, 250, 250, 0.9)"
                    color = true
                }

                if (flag) {
                    flag = false;
                    change1.textContent = "x^3"
                    change2.textContent = "2^x"
                    change3.innerHTML = "<span>&#8731;</span>x"
                    change4.innerHTML = "<sup>y</sup><span>&radic;</span>x"
                }
                else {
                    flag = true;
                    change1.textContent = "x^2"
                    change2.textContent = "10^x"
                    change3.innerHTML = "<span>&radic;</span>x"
                    change4.innerHTML = "x<sup>y</sup>"

                }

            }

            catch {
                outputdata.textContent = "ERROR"
            }
        }

        //checking factorial and calling Factorial Function
        else if (name === "!") {
            try {
                screen_cal.push(name)
                inputdata.textContent = screen_cal.join("")
                ans = factorial(temp_cal, screen_cal)
            }
            catch {
                outputdata.textContent = "ERROR"
            }

        }

        //Fixed Exponential
        else if (name === "fixedExpo") {
            console.log(temp_cal)
            let val = temp_cal
            let dot = val.indexOf(".")
            let len = val.slice(0, dot).length

            try {
                //When number is greater than 1
                if (val[0] !== '0' && val[0] !== '-') {

                    //if number is decimal
                    if (val.includes(".")) {
                        val.splice(len, 1)
                        val.splice(1, 0, ".")
                        val.push(`e+${len - 1}`)
                    }

                    //if number is integer
                    else {
                        val.splice(1, 0, ".")
                        val.push(`e+${val.length - 2}`)
                    }
                    outputdata.textContent = val.join("")
                }

                //When number is less than -1
                else if (val[0] == "-" && val[1] != "0") {
                    
                    //if number is decimal
                    if (val.includes(".")) {
                        val.splice(len, 1)
                        val.splice(2, 0, ".")
                        val.push(`e+${len - 2}`)
                        outputdata.textContent = val.join("")
                    }

                    //if number is integer
                    else {
                        val.splice(2, 0, ".")
                        val.push(`e+${val.length - 3}`)
                    }
                    outputdata.textContent = val.join("")

                }

                //when number is 0
                else if (val.length == 1 && val[0] == 0) {
                    outputdata.textContent = "0.e+0"
                }
                
                //when number lies between -1 to 1 and it is decimal
                else {
                    let sub = false

                    //when number is negative
                    if (val[0] == '-') {
                        sub = true
                        val.shift()
                        dot = dot - 1
                    }
                    
                    //when number is positive
                    val.splice(dot, 1)
                    let x = +(val.join("")) + ""
                    let findindex = temp_cal.indexOf(x[0]) + 1
                    val.splice(findindex, 0, ".")
                    val = +(val.join("")) + ""
                    let length = findindex - dot

                    val = val + `e-${length}`
                    // console.log(val,typeof val)
                    if (sub === true) {
                        val = '-' + val
                    }
                    outputdata.textContent = val


                }
            }
            catch {
                outputdata.textContent = "ERROR"
            }
        }

        //Displaying button to degree to radians and viceversa 
        else if (name === "deg_rad") {
            if (radians) {
                radians = false
                button.textContent = "RAD"
            }
            else {
                radians = true
                button.textContent = "DEG"
            }
        }

        //Selecting the buttons down to the 2nd button
        else if (type == "tog") {

            //When 2nd button is not clicked
            if (flag) {
                let name = button.getAttribute("name")
                let value = button.getAttribute("value")
                temp_cal.push(name)
                screen_cal.push(value)
                inputdata.textContent = screen_cal.join("")
            }

            //when 2nd button is clicked and functions gets changed 
            else {
                let change = button.getAttribute("class")
                if (change === "square") {

                    temp_cal.push("**3")
                    screen_cal.push("^3")
                    inputdata.textContent = screen_cal.join("")
                }
                else if (change === "root") {
                    temp_cal.push("Math.cbrt(")
                    screen_cal.push("cbrt(")
                    inputdata.textContent = screen_cal.join("")
                }
                else if (change === "xy") {
                    temp_cal.push("**(1/")
                    screen_cal.push("root(")
                    console.log("s", screen_cal)
                    let x = temp_cal[temp_cal.length - 2]
                    inputdata.textContent = screen_cal.join("")

                }
                else {
                    temp_cal.push("2**(")
                    screen_cal.push("2^(")
                    console.log(temp_cal)
                    inputdata.textContent = screen_cal.join("")
                }

            }

        }

        //clicking on equal button and displaying the output
        else if (name === "eq") {
            try {
                if (screen_cal.length > 1) {
                    console.log(temp_cal)
                    outputdata.textContent = eval(temp_cal.join(""))

                }
                else {
                    outputdata.textContent = screen_cal
                }
            }
            catch {
                outputdata.textContent = "ERROR"
            }

        }
        //plusorminus button calling its function
        else {
            if (name === "plusorminus") {
                screen_cal, temp_cal = opreverse(screen_cal, temp_cal)
                inputdata.textContent = screen_cal.join("")
            }

            else {

                screen_cal.push(value)
                temp_cal.push(name)
                inputdata.textContent = screen_cal.join("")
            }
        }

    })
}

//Trignometry functions
function calTrig(angle, radian, funcname) {
    try {
        if (funcname === "Math.sin(") {
            inputdata.textContent = "sin(" + angle + ")"
            outputdata.textContent = Number(eval("Math.sin(" + radian + ")"))
        } else if (funcname === "Math.cos(") {
            inputdata.textContent = "cos(" + angle + ")"
            outputdata.textContent = eval("Math.cos(" + radian + ")")
        } else if (funcname === "Math.tan(") {
            inputdata.textContent = "tan(" + angle + ")"
            outputdata.textContent = eval("Math.tan(" + radian + ")")
        } else if (funcname === "Math.sec(") {
            inputdata.textContent = "sec(" + angle + ")"
            outputdata.textContent = eval("1/(Math.cos(" + radian + "))")
        } else if (funcname === "Math.cosec(") {
            inputdata.textContent = "cosec(" + angle + ")"
            outputdata.textContent = eval("1/(Math.sin(" + radian + "))")
        } else {
            inputdata.textContent = "cot(" + angle + ")"
            outputdata.textContent = eval("1/(Math.tan(" + radian + "))")
        }
    }
    catch {
        outputdata.textContent = "ERROR"
    }
}
trignometry.onchange = (event) => {
    let radian = inputdata.textContent
    let dup = radian
    let funcname = event.target.value
    if (radians === true) {
        calTrig(dup, radian, funcname)
    }
    else {
        radian = radToDeg(radian)
        calTrig(dup, radian, funcname)
    }
}

//random,floor and ceil functions
functions.onchange = (event) => {
    let radian = inputdata.textContent
    let funfunc = event.target.value
    try {
        if (funfunc == "Math.random(") {
            inputdata.textContent = ""
            outputdata.textContent = eval("Math.random()*1")
        }
        else if (funfunc == "Math.ceil(") {
            inputdata.textContent = "ceil(" + radian + ")"
            outputdata.textContent = eval("Math.ceil(" + radian + ")")
        } else {
            inputdata.textContent = "floor(" + radian + ")"
            outputdata.textContent = eval("Math.floor(" + radian + ")")
        }
    }
    catch {
        outputdata.textContent = "ERROR"
    }
}





