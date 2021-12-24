import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';
const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  textArea: document.querySelector('.feedback-form textarea'),
};
// добавляем слушателя для формы и поля ввода текста
refs.form.addEventListener('submit', formSubmit);
// refs.textArea.addEventListener('input', throttle(textAreaInput, 1000));
// создали пустой объект formData для того ,что бы туда записывались ключи и значения ( name: email , value : message)
refs.form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  // сделать объекту метод Json ( strigify)
  const formDataStr = JSON.stringify(formData);
  // считываем инпуты с 2х полей ,формируем обьект  записываем в localeStorage
  localStorage.setItem(STORAGE_KEY, formDataStr);
  // при загрузке страницы проверить лежат ли данные в storageKey , парсим их и заполняем эти поля формы (инпуты)
});
function addText() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  // нам надо написать если наша savedMessage приводится к true то мы можем работать и значит там есть какие-то данные(которые введены были до этого)
  if (savedMessage) {
    //   обновляем DOM , берем texArea и записываем ей value
    const saveMassage = JSON.parse(savedMessage);
    // console.log(saveMassage);
    for (const item in saveMassage) {
      if (saveMassage.hasOwnProperty(item)) {
        // formData[e.target.name] = e.target.value;
        refs.form.elements[item].value = saveMassage[item];
      }
    }
    // refs.textArea.value = savedMessage;
    // savedMessage = localStorage.setItem(STORAGE_KEY, textMassage);
  }
}
// console.log(refs.form.elements['email']);
//  парсим объект с данными , 2 запускаем цикл for in , добавить проверку has on property . обратится к полю refs.form.elements[] и задаем value
addText();
// пишем callBack(и) для наший функций
function formSubmit(e) {
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  // запрещаем действия по-умолчанию (то бишь странница при отправке формы не перезагружается)
  e.preventDefault();
  e.currentTarget.reset();
  // если мы отправили форму - то нужно ее ресетнуть(очистить поля) ,что бы она еще раз не появилась после отправки
  localStorage.removeItem(STORAGE_KEY);
  //   console.log('отправляем форму');
}
// в function textAreaInput создаем переменную textMassage и присваиваем ему значение события ,которое происходит в данный момент! то есть event.currentTarget.value
// function textAreaInput(e) {
//   const textMassage = refs.textArea.value; //поменял с e.currentTurget так как потерялся наш target в данным момент
//   // задаем локал стореджу ключ и значение(то что пишется в данный момент)
//   localStorage.setItem(STORAGE_KEY, textMassage);
// }
// получаем значение из localStorage
