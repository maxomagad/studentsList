const studentsList = [
  {
    name: "Максим",
    surname: "Цыганов",
    lastname: "Витальевич",
    faculty: "Веб разработка",
    date: "2001-12-12",
    study: "2022"
  }
]

// Создание элементов
const $app = document.getElementById('app'),
  $nameInp = document.getElementById('inputName'),
  $surnameInp = document.getElementById('inputSurname'),
  $lastnameInp = document.getElementById('inputLastname'),
  $facultyInp = document.getElementById('inputFaculty'),
  $dateInp = document.getElementById('inputDate'),
  $studyInp = document.getElementById('inputStudy'),
  $formAdd = document.getElementById('formAdd'),
  $FormFiltr = document.getElementById('formFiltr'),
  $table = document.createElement('table'),
  $tableHead = document.createElement('thead'),
  $tableBody = document.createElement('tbody'),

  $tableHeadTr = document.createElement('tr'),
  $tableHeadThFIO = document.createElement('th'),
  $tableHeadThFaculty = document.createElement('th'),
  $tableHeadThDate = document.createElement('th'),
  $tableHeadThStudy = document.createElement('th');

$table.classList.add('table', 'table-bordered')

$tableHeadThFIO.textContent = 'ФИО'
$tableHeadThFaculty.textContent = 'Факультет'
$tableHeadThDate.textContent = 'Дата рождения'
$tableHeadThStudy.textContent = 'Обучение'

$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThFaculty)
$tableHeadTr.append($tableHeadThDate)
$tableHeadTr.append($tableHeadThStudy)

$tableHead.append($tableHeadTr)
$table.append($tableHead)
$table.append($tableBody)
$app.append($table)

// Создание Tr ондого пользователя
function createUserTr(oneUser) {
  const $userTr = document.createElement('tr'),
    $userTdFIO = document.createElement('td'),
    $userTdFaculty = document.createElement('td'),
    $userTdDate = document.createElement('td'),
    $userTdStudy = document.createElement('td');

  $userTdFIO.textContent = oneUser.fio
  $userTdFaculty.textContent = oneUser.faculty
  $userTdDate.textContent = oneUser.dateout
  $userTdStudy.textContent = oneUser.studyOut

  $userTr.append($userTdFIO)
  $userTr.append($userTdFaculty)
  $userTr.append($userTdDate)
  $userTr.append($userTdStudy)

  return $userTr
}

// Рендер
function render(arrData) {
  $tableBody.innerHTML = '';

  //  Подготовка
  let copyStudentsList = [...arrData]
  for (const oneUser of copyStudentsList) {

    // Создание ФИО
    oneUser.fio = oneUser.surname + ' ' + oneUser.name + ' ' + oneUser.lastname

    //  Высчитывание возраста
    let age = Math.floor((new Date() - new Date(oneUser.date)) / 31557600000);
    let yo = (y) => /\d*1\d$/.test(y) || /[05-9]$/.test(y) ? 'лет' : (/1$/.test(y) ? 'год' : 'года');
    oneUser.dateout = oneUser.date.split('-').reverse().join('.') + ` (${age} ${yo(age)})`

    //  Высчитывание курса / конца обучения
    let studyStart = Number(oneUser.study);
    let studyFinish = studyStart + 4;

    let nowYear = Number((new Date).getFullYear(Date.now));

    if (studyFinish - nowYear <= 0) {
      oneUser.studyOut = studyStart + 'г - ' + studyFinish + 'г закончил(а)'
    } else if (studyFinish - nowYear == 1) {
      oneUser.studyOut = studyStart + 'г - ' + studyFinish + 'г (4 курс)'
    } else if (studyFinish - nowYear == 2) {
      oneUser.studyOut = studyStart + 'г - ' + studyFinish + 'г (3 курс)'
    } else if (studyFinish - nowYear == 3) {
      oneUser.studyOut = studyStart + 'г - ' + studyFinish + 'г (2 курс)'
    } else if (studyFinish - nowYear == 4) {
      oneUser.studyOut = studyStart + 'г - ' + studyFinish + 'г (1 курс)'
    }
  }

  // Сортировка
  copyStudentsList = copyStudentsList.sort(function (a, b) {
    if (a.fio < b.fio) {
      return -1
    }
  })

  //  Отрисовка
  for (const oneUser of copyStudentsList) {
    const $newTr = createUserTr(oneUser)
    $tableBody.append($newTr)
  }
}

render(studentsList)

// Добавление
$formAdd.addEventListener('submit', function (event) {
  event.preventDefault()

  studentsList.push({
    name: $nameInp.value,
    surname: $surnameInp.value,
    lastname: $lastnameInp.value,
    date: $dateInp.value,
    study: $studyInp.value,
    faculty: $facultyInp.value
  })

  render(studentsList)
  event.target.reset()
})
