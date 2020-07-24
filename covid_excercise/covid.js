$(function () {
    let slider1 = document.getElementById("sliderWithValue1");
    slider1.oninput = function () {
        firstSlider();
    }
    let slider2 = document.getElementById("sliderWithValue2");
    slider2.oninput = function () {
        secondSlider();
    }
});


function firstSlider() {
    let slider = document.getElementById("sliderWithValue1");
    let slider2 = document.getElementById("sliderWithValue2");
    let output = document.getElementById("Value1");
    let output2 = document.getElementById("Value2");

    switch (slider.value) {
        case "1":
            $("#sliderWithValue2").attr("max","31");
            output.innerHTML = "January";
            output2.innerHTML = slider2.value;
            break;
        case "2":
            $("#sliderWithValue2").attr("max","29");
            output.innerHTML = "February";
            output2.innerHTML = slider2.value;
            break;
        case "3":
            $("#sliderWithValue2").attr("max","31");
            output.innerHTML = "March";
            output2.innerHTML = slider2.value;
            break;
        case "4":
            $("#sliderWithValue2").attr("max","30");
            output.innerHTML = "April";
            output2.innerHTML = slider2.value;
            break;
        case "5":
            $("#sliderWithValue2").attr("max","31");
            output.innerHTML = "May";
            output2.innerHTML = slider2.value;
            break;
        case "6":
            $("#sliderWithValue2").attr("max","30");
            output.innerHTML = "June";
            output2.innerHTML = slider2.value;
            break;
        case "7":
            $("#sliderWithValue2").attr("max","31");
            output.innerHTML = "July";
            output2.innerHTML = slider2.value;
            break;
        case "8":
            $("#sliderWithValue2").attr("max","31");
            output.innerHTML = "Augaust";
            output2.innerHTML = slider2.value;
            break;
        case "9":
            $("#sliderWithValue2").attr("max","30");
            output.innerHTML = "September";
            output2.innerHTML = slider2.value;
            break;
        case "10":
            $("#sliderWithValue2").attr("max","31");
            output.innerHTML = "October";
            output2.innerHTML = slider2.value;
            break;
        case "11":
            $("#sliderWithValue2").attr("max","30");
            output.innerHTML = "November";
            output2.innerHTML = slider2.value;
            break;
        case "12":
            $("#sliderWithValue2").attr("max","31");
            output.innerHTML = "December";
            output2.innerHTML = slider2.value;
            break;
    }
}


function secondSlider() {
    let slider = document.getElementById("sliderWithValue2");
    let output = document.getElementById("Value2");
    output.innerHTML = slider.value;
}