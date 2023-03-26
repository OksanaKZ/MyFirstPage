const getRandomNumInRange = (min, max) => {
  const randomNum = (Math.random() * (max - min) + min).toFixed(0)
  return randomNum
}

const getTask = () => {
  const symbol = (Math.random() > 0.5) ? '+' : '-'
  const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
  gameState.rightAnswer = eval(task)
  return task
}

const toggleGameState = () => {
  gameState.taskInProcess = !gameState.taskInProcess
}

const gameElements = document.getElementById("my_game").children
const title = gameElements[0]
const userTask = gameElements[1]
const userAnswer = gameElements[2]
const btnGame = gameElements[3]

const gameState = {
  taskInProcess: false,
  rightAnswer: null,
}

const startGameFunc = () => {
  if (!gameState.taskInProcess) {
    title.innerText = 'Игра началась!'
    userAnswer.value = null
    userTask.innerText = getTask()
    userAnswer.hidden = false
    btnGame.innerText = 'Проверить!'
    toggleGameState()
  } else {
    const isRight = gameState.rightAnswer == userAnswer.value
    userTask.innerText = userTask.innerText + ' = ' + gameState.rightAnswer
    title.innerText = (isRight) ? 'Вы победили!' : "Вы проиграли!"
    btnGame.innerText = 'Начать заново!'
    toggleGameState()
  }
}

btnGame.addEventListener('click', startGameFunc)
userAnswer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    startGameFunc()
  }
  else if (e.key === 'Escape') {
    userAnswer.getBoundingClientRect()
  }
})

const choosenEl = document.querySelectorAll('.choosen_block-container > div')
const counterEl = document.querySelector('.choosen_block span')

const choosenState = {
  countElements: 0,
  setCountValue(value) {
    this.countElements += value
    counterEl.innerText = this.countElements
  }
}

const eventFunc = (e) => {
  if (e.target.className === '') {
    e.target.className = 'choosen_element'
    choosenState.setCountValue(1)
  } else {
    e.target.className = ''
    choosenState.setCountValue(-1)
  }
}

for (let i = 0; i < choosenEl.length; i++) {
  choosenEl[i].addEventListener('click', eventFunc)
}

const postsBlock = document.querySelector('.posts_block-container')
const showPostsBTN = document.querySelector('.posts_block button')


const func = () => 5

function addPost(title, body) {
  const postsTitle = document.createElement('h3')
  const postsBody = document.createElement('span')
  const postItem = document.createElement('p')

  postsTitle.innerText = title
  postsBody.innerText = body

  postItem.append(postsTitle, postsBody)
  postsBlock.append(postItem)
}

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => {
    for (el of data) {
      addPost(el.title, el.body)
    }

  })
  .catch(err => console.log(err.message))
}

showPostsBTN.onclick = () => {getPosts()}


var title1 = ["\ud83d\ude22 Почему вы ушли\u2753", "\ud83d\udcdd Оставьте комментарий!", "\ud83d\ude0d Поделитесь с друзьями!"];
i = 0;
function new_title() {
  i = (i + 1) % title1.length;
  jQuery(document).prop("title", title1[i])
}

window.onload = function() {
  var a = document.title;
  jQuery(document).bind("visibilitychange", function() {
    document.hidden ? secinterval = setInterval(new_title, 2000) : clearInterval(secinterval);
    jQuery(document).prop("title", document.hidden ? title[0] : a)
  })
 
}