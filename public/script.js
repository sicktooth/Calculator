document.addEventListener('DOMContentLoaded', (event) => {
    const weightInput = document.querySelector('.weight');
    const heightInput = document.querySelector('.height');
    const buttonElement = document.getElementById('checkButton');

    buttonElement.addEventListener('click', () => {
        var weight = weightInput.value;
        var height = heightInput.value;

        function checkInvalidValue() {
            if (weight == 0 && height == 0) {
                console.log(weight);
            } else {
                console.log("success");
            }
        }

        checkInvalidValue();
    });
});
