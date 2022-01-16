var imagesSlider =
[
    "images/slide-1.jpg",
    "images/slide-2.jpg",
    "images/slide-3.jpg"
];

var emailRegex = /^[A-Za-z]{5,}(.+){0,}@(gmail|hotmail|outlook|yahoo).com$/;

var appartmentNameIndex = 0;

var rentedAppartment;
var thisAppartmentIsRented = Array.from(document.querySelectorAll(".thisAppartmentIsRented h4"));

if(localStorage.getItem("appartment") == null)
{
    rentedAppartment = [];
}
else
{
    rentedAppartment = JSON.parse(localStorage.getItem("appartment"));
}

var sliderContent = Array.from(document.querySelectorAll(".sliderContent"));

var globalSliderIndex = 0;

var section1 = document.querySelector(".section1");

section1.style.backgroundImage = `url(${imagesSlider[0]})`;

sliderContent[0].style.display = "block";

var nextPhoto = document.querySelector(".nextPhoto");

var previousPhoto = document.querySelector(".previousPhoto");

nextPhoto.addEventListener("click" , getNextAppartment);
previousPhoto.addEventListener("click" , gerPreviousApartment);

function getNextAppartment()
{
    $(".section1").fadeOut(0);

    globalSliderIndex++;
    if(globalSliderIndex >= sliderContent.length)
    {
        globalSliderIndex = 0;
    }

    for(var i = 0; i < sliderContent.length; i++)
    {
        if(sliderContent[i].style.display != "none")
        {
            sliderContent[i].style.display = "none";
        }
    }
    section1.style.backgroundImage = `url(${imagesSlider[globalSliderIndex]})`;
    $(".section1").fadeIn(300);
    $(sliderContent[globalSliderIndex]).fadeIn(0);
}

function gerPreviousApartment()
{
    $(".section1").fadeOut(0);

    globalSliderIndex--;
    if(globalSliderIndex < 0)
    {
        globalSliderIndex = sliderContent.length - 1;
    }

    for(var i = 0; i < sliderContent.length; i++)
    {
        if(sliderContent[i].style.display != "none")
        {
            sliderContent[i].style.display = "none";
        }
    }
    section1.style.backgroundImage = `url(${imagesSlider[globalSliderIndex]})`;
    $(".section1").fadeIn(300);
    $(sliderContent[globalSliderIndex]).fadeIn(0);
}

var appartmentName = Array.from(document.querySelectorAll(".appartmentName"));
var rentButton = Array.from(document.querySelectorAll(".rentButton"));

var yourName = document.getElementById("yourName");
var yourEmail = document.getElementById("yourEmail");
var theRentedAppartmentName = document.getElementById("theRentedAppartmentName");

for(var i = 0; i < rentButton.length; i++)
{
    rentButton[i].addEventListener("click" , rentAppartment);
}

function rentAppartment()
{
    var index = rentButton.indexOf(this);
    $(".submitRentLayer").fadeIn(300);
    $(".submitRentLayer").css("display" , "flex");
    appartmentNameIndex = index;
    $(theRentedAppartmentName).attr("placeholder" , `appartment name: ${appartmentName[index].innerHTML}`);
    $("html , body").css("overflow" , "hidden");
}

$(".closeFormIcon").click(function()
{
    $(".submitRentLayer").fadeOut(300);
    clearInputs();
    $(".bothFieldsAreRequired").slideUp(300);
    $(".invalidEmail").slideUp(300);
    $("html , body").css("overflow" , "auto");
})

$(".submitRentButton").click(function()
{
    if(yourName.value == "" || yourEmail.value == "")
    {
        $(".bothFieldsAreRequired").slideDown(300);
        $(".invalidEmail").slideUp(300);
    }
    else if(emailRegex.test(yourEmail.value) == false)
    {
        $(".bothFieldsAreRequired").slideUp(300);
        $(".invalidEmail").slideDown(300);
    }

    else
    {
        var object =
        {
            name: yourName.value,
            email: yourEmail.value,
            rentedAppartmentName: appartmentName[appartmentNameIndex].innerHTML
        }
        rentedAppartment.push(object);
        localStorage.setItem("appartment" , JSON.stringify(rentedAppartment));
        $(".submitRentLayer").fadeOut(300);
        checkRentedAppartments();
        clearInputs();
        $(".bothFieldsAreRequired").slideUp(300);
        $(".invalidEmail").slideUp(300);
        $("html , body").css("overflow" , "auto");
    }
})

function clearInputs()
{
    yourName.value = "";
    yourEmail.value = "";
}

function checkRentedAppartments()
{
    for(var i = 0; i < rentedAppartment.length; i++)
    {
        for(var x = 0; x < appartmentName.length; x++)
        {
            if(String(rentedAppartment[i].rentedAppartmentName) == String(appartmentName[x].innerHTML))
            {
                console.log(`${rentedAppartment[i].rentedAppartmentName} is rented by ${rentedAppartment[i].name}`);
                rentButton[x].style.display = "none";
                thisAppartmentIsRented[x].innerHTML = `rented by ${rentedAppartment[i].name}`;
            }
        }   
    }
}

checkRentedAppartments();

var ourSectionsNavLinks = Array.from(document.querySelectorAll(".nav-link"));

for(var i = 0; i < ourSectionsNavLinks.length; i++)
{
    ourSectionsNavLinks[i].addEventListener("click" , scrollToSection);
}

function scrollToSection()
{
    var index = ourSectionsNavLinks.indexOf(this);

    var href = $(ourSectionsNavLinks[index]).attr("href");

    var ourHeight = $(href).offset().top;

    $("html , body").animate({scrollTop: ourHeight} , 1000);

}