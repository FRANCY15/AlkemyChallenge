let arrP = [1,5,6,8,4,2,6]; 

// 1,2,4,5,6,8


const mediana = (arr) => {
    //organizar el array.
    arr.sort((a,b) => a-b);


    // calcular la mitad del array, redondear hacia el menor valor
    let mitad = Math.floor(arr.length/2);

    // operador ternario para condicionar si es par o impar,
    return arr.length % 2 === 1 ? arr[mitad] : (arr[mitad]+arr[mitad-1])/2

}

console.log(mediana(arrP)) 

