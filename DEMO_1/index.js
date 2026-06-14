const name = document.getElementById('name');
const city = document.getElementById('city');
const age = document.getElementById('age');
const save = document.getElementById('saveBtn');
const update = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('delBtn');
const selectId = document.getElementById('selectId');
const selectField = document.getElementById('selectField');
const selectValue = document.getElementById('selectUnique');

let UserRecords = [];
let selectFields = ['Name', 'City', 'Age'];

save.addEventListener('click', SaveBtn);
selectId.addEventListener('change', UserSelectedId);
update.addEventListener('click', UpdateBtn);
deleteBtn.addEventListener('click', DeleteUser);
selectField.addEventListener('change', SelectUniqueValue);

selectFields.forEach((ele) => {
  const option = document.createElement('option');
  option.value = ele.toLowerCase();
  option.innerText = ele;
  selectField.appendChild(option);
});

function OptionGenerator() {
  console.log('again call');
  const userIds = UserRecords.map((ele) => ele.id);

  selectId.innerHTML = '<option>Select Id</option>';

  userIds.forEach((ids) => {
    const option = document.createElement('option');
    option.value = ids;
    option.innerText = ids;
    // console.log("options ", option);
    // console.log("val", option.value);
    selectId.append(option);
  });
}

function UserSelectedId() {
  const selectedUserId = parseInt(selectId.value);
  const currentUser = UserRecords.find((user) => user.id === selectedUserId);
  if (!currentUser) {
    alert('User not found');
    resetFields();
    return;
  }
  name.value = currentUser.name;
  city.value = currentUser.city;
  age.value = currentUser.age;
  // save.style.visibility = "hidden";
  save.setAttribute('hidden', true);
  console.log('upd ', update);
  update.removeAttribute('hidden');
  deleteBtn.removeAttribute('hidden');

  return currentUser;
}

function SaveBtn() {
  let userName = name.value;
  let cityName = city.value;
  let userAge = parseInt(age.value);

  if (!userName.trim() || !cityName.trim() || userAge <= 0) {
    alert('Please Fill out all details');
    return;
  }
  const userRecord = {
    id: +new Date(),
    name: userName,
    city: cityName,
    age: userAge,
  };
  UserRecords.push(userRecord);
  console.log('userRecords ', UserRecords);
  resetFields();
  // To generate new options
}

function UpdateBtn() {
  const selectedUserId = parseInt(selectId.value);
  const updatedObj = {
    name: name.value,
    city: city.value,
    age: age.value,
  };

  UserRecords = UserRecords.map((user) => {
    if (user.id === selectedUserId) {
      console.log('returned ', { id: user.id, ...updatedObj });
      return { id: user.id, ...updatedObj };
    }
    return user;
  });
  resetFields();
}

function DeleteUser() {
  const selectedUserId = parseInt(selectId.value);

  UserRecords = UserRecords.filter((user) => {
    if (user.id === selectedUserId) {
      return;
    }
    return user;
  });
  console.log('after Delete ', UserRecords);
  resetFields();
}

// function SelectedField() {
//     if (!selectField) {
//         alert("No Field Selected");
//         return;
//     }
//     selectField = selectField.value;
// }

function SelectUniqueValue() {
  selectValue.innerHTML = `<option value="">Select Value</option>`;
  let selectedField = selectField.value;

  if (selectedField == '') {
    selectValue.innerHTML = `<option value="">Select Value</option>`;
    return;
  }

  const unique = new Set();
  UserRecords.map((user) => {
    const val = user[selectedField];
    if (typeof val === 'string') {
      unique.add(val.toLowerCase());
    } else {
      unique.add(val);
    }
  });
  unique.forEach((ele) => {
    const option = document.createElement('option');
    console.log('ele is ', ele);
    option.value = ele;
    option.innerText = ele;
    selectValue.append(option);
  });
}

function resetFields() {
  name.value = '';
  city.value = '';
  age.value = '';
  save.removeAttribute('hidden');
  update.setAttribute('hidden', true);
  deleteBtn.setAttribute('hidden', true);
  OptionGenerator();
  SelectUniqueValue();
}
