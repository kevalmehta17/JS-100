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
selectField.addEventListener('change', resetUniqueValue);

selectFields.forEach((ele) => {
  const option = document.createElement('option');
  option.value = ele.toLowerCase();
  option.innerText = ele;
  selectField.appendChild(option);
});

function OptionGenerator() {
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
  let userName = name.value.trim();
  let cityName = city.value.trim();
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
    name: name.value.trim(),
    city: city.value.trim(),
    age: parseInt(age.value),
  };

  UserRecords = UserRecords.map((user) => {
    if (user.id === selectedUserId) {
      //   console.log('returned ', { id: user.id, ...updatedObj });
      return { id: user.id, ...updatedObj };
    }
    return user;
  });
  ValueExist();
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
  ValueExist();
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
  let selectedField = selectField.value;
  let selectUnique = selectValue.value;

  selectValue.innerHTML = `<option value="">Select Value</option>`;
  console.log('stored value', selectUnique);
  if (selectUnique) {
    console.log('1st ', typeof selectUnique);
    selectValue.innerHTML = `<option value=${selectUnique}>${selectUnique}</option>`;
  }

  if (selectedField == '') {
    console.log('selectUnique ', selectUnique);
    selectValue.innerHTML = `<option value="">Select Value</option>`;
    return;
  }
  const unique = new Set();
  UserRecords.map((user) => {
    const val = user[selectedField];
    if (
      typeof val === 'string' &&
      val.toLowerCase() !== selectUnique.toLowerCase()
    ) {
      unique.add(val.toLowerCase());
    } else if (typeof val === 'number' && val !== parseInt(selectUnique)) {
      // console.log("inNumber ", typeof val, selectUnique   );
      unique.add(val);
    }
  });

  unique.forEach((ele) => {
    const option = document.createElement('option');
    option.value = ele;
    option.innerText = ele;
    selectValue.append(option);
  });
}

function resetUniqueValue() {
  selectValue.innerHTML = `<option value="">Select Value</option>`;
  SelectUniqueValue();
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

function ValueExist() {
  const selectedField = selectField.value;
  const selectUnique = selectValue.value;
  const isValueExist =
    selectedField && selectUnique
      ? UserRecords.some((user) => {
          if (
            typeof selectUnique == 'string' &&
            user[selectedField].toLowerCase() === selectUnique.toLowerCase()
          ) {
            return true;
          } else if (
            typeof selectUnique === 'number' &&
            user[selectedField] === selectUnique
          ) {
            return true;
          }
          return false;
        })
      : false;

    if (!isValueExist) {
        selectValue.innerHTML = `<option value="">Select Value</option>`;
    }
}
