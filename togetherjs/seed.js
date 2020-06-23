// MAJOR TO DO:
/*
*   // MAKE A COOKIE THAT DELETES AFTER BEING USED 
*/

$(function () {

    $("div.container").on("click", "button#button", function (event) {
        seedCookie();
    });
});

// Handles the seed being submitted and checks errors
async function seedCookie(){
    let submit_seed = $("textarea#seed").val();
    try {
        parseInt(submit_seed)
    } catch(err) {
        alert("Please input a number in the range of 0-50");
        $("textarea#seed").val("");
        return;
      }

    if(submit_seed > 50 || submit_seed < 0 || submit_seed == ""){
        alert("Please input a number in the range of 0-50");
        $("textarea#seed").val("");
        return;
    }

    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 1000*36000;
    now.setTime(expireTime);
    document.cookie = "Seed=" + submit_seed + ";expires=" + now.toGMTString() + "path=./Excercise.html";
    window.location.href = "./Excercise.html";
}