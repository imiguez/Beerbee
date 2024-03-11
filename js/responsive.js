document.getElementById("button-nav").addEventListener("click", desplegarMenu);

function desplegarMenu() {
    if (document.querySelector("header > nav").className == "no-show-nav") {
        document.querySelector("header > nav").className = "show-nav"; 
    }else {
        document.querySelector("header > nav").className = "no-show-nav";
    }
}