const calculateBtn = document.querySelector('ion-button');
const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');

const bmiValue = document.getElementById('bmi-value');
const bmiCategory = document.getElementById('bmi-category');

const resetBtn = document.getElementById('resetButton');

const calculateBMI = () => {
    const enteredHeight = +heightInput.value / 100;
    const enteredWeight = +weightInput.value;
    let category = "";
    const bmi = enteredWeight / (enteredHeight * enteredHeight);

    if (bmi < 18.5){
        category = "Kurus";
    }else if (bmi < 24.9){
        category = "Normal";
    }else if (bmi < 29.9){
        category = "Gemuk";
    }else if (bmi >= 30){
        category = "Obesitas";
    }

    bmiValue.innerHTML = bmi.toString();
    bmiCategory.innerHTML = category;
};

const clear = () => {
    heightInput.value = '';
    weightInput.value = '';
    bmiValue.innerHTML = '';
    bmiCategory.innerHTML = '';
}

calculateBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', clear);