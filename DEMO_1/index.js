const name = document.getElementById("name");
const city = document.getElementById("city");
const age = document.getElementById("age");
const save = document.getElementById("saveBtn");

const UserRecords = [];

save.addEventListener("click", saveBtn);

function saveBtn() {
    let userName = name.value;
    let cityName = city.value
    let userAge = parseInt(age.value);

    if (!userName.trim() || !cityName.trim() || !userAge) {
        alert("Please Fill out all details");
        return;
    }
    const userRecord = {
        id: +new Date(),
        name: userName,
        city: cityName,
        age: userAge

    }
    UserRecords.push(userRecord);
    console.log("userRecords ", UserRecords);
    name.value = "";
    city.value = "";
    age.value = "";

}

