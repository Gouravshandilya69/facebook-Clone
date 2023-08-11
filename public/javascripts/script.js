var search = document.querySelector("#hide")
var btn = document.querySelector(".ri-search-line")



btn.addEventListener("click", function () {
    if (search.style.display === "none") {

    search.style.display = "initial" 
}

else{
    search.style.display = "none"
}

})
