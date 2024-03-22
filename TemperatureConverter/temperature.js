const celToFeh = (cel) => {
    return Math.round((cel * 9 / 5) + 32);
}
const fehToCel = (fah) => {
    return Math.round((fah - 32) * 5 / 9);
}

const tempCalc = () => {
    let tNum = document.getElementById("temp-num").value;
    let tForm = document.getElementById("temp-form").value;

    if (tForm === "celcius") {
        result = celToFeh(tNum);
        document.getElementById("output").innerHTML = ` =  ${result} Fahrenheit`;
    }
    else {
        result = fehToCel(tNum);
        document.getElementById("output").innerHTML = ` =  ${result} Celcius`;
    }
    return false;
}