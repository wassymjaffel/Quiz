;(function () {
  var timer
  var clock = document.getElementById('clockdiv')
  var minutesSpan = clock.querySelector('.minutes')
  var secondsSpan = clock.querySelector('.seconds')
  function startTimer(duration) {
    timer = duration
    var minutes, seconds
    setInterval(function () {
      minutes = parseInt(timer % 60, 0)
      seconds = parseInt(timer % 60, 10)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      minutesSpan.innerHTML = minutes
      secondsSpan.innerHTML = seconds

      if (--timer < 0) {
        timer = duration
      }
    }, 1000)
  }

  function resetTimer() {
    timer = 60 * 60
  }

  window.onload = function () {
    timecountdown = 1 * 60
    startTimer(timecountdown)
  }

  var questions = [
    {
      question: 'tata awatef gedesh oomorha?',
      choices: [2, 5, 31, 15, 20],
      correctAnswer: 31,
    },
    {
      question: 'taraji gedesh aandha men coupe?',
      choices: [3, 6, 9, 12, 15],
      correctAnswer: 15,
    },
    {
      question: 'taraji gedesh aandha men super coupe?',
      choices: [2, 99, 108, 134, 156],
      correctAnswer: 2,
    },
    {
      question: 'taraji gedesh aandha men caf?',
      choices: [2, 5, 6, 7, 8],
      correctAnswer: 2,
    },
    {
      question: 'taraji gedesh aandha men cl?',
      choices: [20, 30, 4, 50, 64],
      correctAnswer: 4,
    },
    {
      question: 'taraji gedesh aandha men coupe darabe?',
      choices: [25, 35, 4, 40, 63],
      correctAnswer: 4,
    },
    {
      question: 'khlyl shamam gedesh numerouh ?',
      choices: [12, 81, 92, 27, 56],
      correctAnswer: 12,
    },
    {
      question: 'lekhnisi gedesh marki?',
      choices: [73, 14, 32, 21, 50],
      correctAnswer: 14,
    },
    {
      question: 'hamdou lhouni gedesh numerouh?',
      choices: [90, 72, 64, 10, 63],
      correctAnswer: 10,
    },
    {
      question: 'taraji gedesh rabha ca?',
      choices: [24, 30, 54, 18, 42],
      correctAnswer: 42,
    },
  ]
  var questionCounter = 0 
  var selections = [] 
  var quiz = $('#quiz') 

 
  displayNext()

 
  $('#next').on('click', function (e) {
    e.preventDefault()

 
    if (quiz.is(':animated')) {
      return false
    }
    choose()

   
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!')
    } else {
      questionCounter++
      displayNext()
    }
  })

 
  $('#prev').on('click', function (e) {
    e.preventDefault()

    if (quiz.is(':animated')) {
      return false
    }
    choose()
    questionCounter--
    displayNext()
  })

  
  $('#start').on('click', function (e) {
    e.preventDefault()

    if (quiz.is(':animated')) {
      return false
    }
    questionCounter = 0
    selections = []
    displayNext()
    $('#start').hide()
  })


  $('.button').on('mouseenter', function () {
    $(this).addClass('active')
  })
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active')
  })

  
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question',
    })

    var header = $('<h2>Question ' + (index + 1) + ':</h2>')
    qElement.append(header)

    var question = $('<p>').append(questions[index].question)
    qElement.append(question)

    var radioButtons = createRadios(index)
    qElement.append(radioButtons)

    return qElement
  }

 
  function createRadios(index) {
    var radioList = $('<ul>')
    var item
    var input = ''
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>')
      input =
        '<label><input type="radio" name="answer" value=' +
        questions[index].choices[i] +
        ' />'
      input += '<span>' + questions[index].choices[i] + '</span></label>'
      item.append(input)
      radioList.append(item)
    }
    return radioList
  }

 
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val()
  }

 
  function displayNext() {
    $('#clockdiv').show()
    $('#titlecount').show()
    quiz.fadeOut(function () {
      $('#question').remove()
      resetTimer()
      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter)
        quiz.append(nextQuestion).fadeIn()

        if (!isNaN(selections[questionCounter])) {
          $('input[value=' + selections[questionCounter] + ']').prop(
            'checked',
            true
          )
        }

        
        if (questionCounter === 1) {
          $('#prev').show()
        } else if (questionCounter === 0) {
          $('#prev').hide()
          $('#next').show()
        }
      } else {
        var scoreElem = displayScore()
        quiz.append(scoreElem).fadeIn()
        $('#next').hide()
        $('#prev').hide()
        $('#start').show()
        $('#clockdiv').hide()
        $('#titlecount').hide()
      }
    })
  }

  
  function displayScore() {
    var score = $('<p>', { id: 'question' })

    var numCorrect = 0
    console.log(selections)
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++
      }
    }

    score.append(
      'You got ' +
        numCorrect +
        ' questions out of ' +
        questions.length +
        ' right!!!'
    )
    return score
  }
})()
