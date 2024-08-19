const timeElement = document.querySelector(".time")
const countElement = document.querySelector(".count")
const timerElement = document.querySelector(".timer")
const againBtn = document.querySelector(".again")
const result = document.querySelector(".result")
const questionElement = document.querySelector(".question")
const optionsElement = document.querySelectorAll(".option");
const resultCorrect = document.querySelector(".result-correct")
const resultWrong = document.querySelector(".result-wrong")
const resultEmpty = document.querySelector(".result-empty")
let correctAnswerTotal = 0
let wrongAnswerTotal = 0
let emptyAnswerTotal = 0
let canSelectOption = true
let questionNumber = 0
let interval, sayac, time = 30


const questions = [
    {
        question: "Hangi klasik eserin yazarı Yakup Kadri Karaosmanoğlu'dur?",
        options: ["Dokuzuncu Hariciye Koğuşu", "Vatan yahut Silistre", "Sodom ve Gomore"],
        answer: "Sodom ve Gomore",
    },

    {
        question: "Ryan Gosling ve Michelle Williams'ın başrolde yer aldığı, 2010'da vizyona giren romantik filmin adı hangisidir?",
        options: ["Blue Valentine", "Shutter Island", "La La Land"],
        answer: "Blue Valentine",
    },

    {
        question: "Yağı alınmış süt veya yoğurdun kaynatılmasıyla elde edilen, 'çökelek' adıyla da bilinen peynirin diğer adı nedir?",
        options: ["Tatlımık", "Ekşimik", "Tuzlumuk"],
        answer: "Ekşimik",
    },

    {
        question: "Hangisi periyodik tabloda yer alan bir elementin kısaltması değildir?",
        options: ["A", "I", "O"],
        answer: "A",
    },

    {
        question: "Genellikle hangisinden bahsedilirken 'çivi gibi' benzetmesi yapılır?",
        options: ["Havanın çok sıcak olmasından", "Denizin çok soğuk olmasından", "Toprağın çok kaygan olmasından"],
        answer: "Denizin çok soğuk olmasından",
    },

    {
        question: "Altay Dağları'na tırmanan bir dağcı hangisinde olabilir?",
        options: ["İzmir", "Bombay", "Moğolistan"],
        answer: "Moğolistan",
    },

    {
        question: "Guinness Dünya Rekorlarına göre, 2012'de düzenlenen bir tenis turnuvasında kayıtlara geçen en hızlı servis saatte kaç kilometredir?",
        options: ["263", "363", "463"],
        answer: "263",
    },

    {
        question: "Hangisi bir 'lasa sayı' değildir?",
        options: ["17", "19", "37"],
        answer: "19",
    },

    {
        question: "Kabe tam olarak güneyinizde kalıyorsa hangi il sınırları içerisinde olabilirsiniz?",
        options: ["Erzurum", "Mardin", "Erzincan"],
        answer: "Erzincan",
    },

    {
        question: "Ümit Burnu'na ulaşan ilk Avrupalı denizci olan Portekizli kaşif kimdir?",
        options: ["Bartolomeu Dias", "Kristof Kolomb", "Marco Polo"],
        answer: "Bartolomeu Dias",
    },
];

start()

result.style.display = "none"
optionsElement.forEach((option) => {
    option.addEventListener("click", () => {
    if(!canSelectOption)
        {
            return //Eğer seçeneği seçme izni yoksa işlemi durdur.
        }
    
        const selectedOption = option.textContent
        const correctAnswer = questions[questionNumber].answer
    
        optionsElement.forEach((el) => {
            if(el.textContent == selectedOption)
            {
                if(selectedOption == correctAnswer)
                {
                    el.style.backgroundColor = "#739072"
                    correctAnswerTotal++
                }
                else
                {
                    el.style.backgroundColor = "#AF2655"
                    wrongAnswerTotal++  
                }
            }
            else
            {
                el.style.backgroundColor = "transparent"
            }
        });

        canSelectOption = false
        setTimeout(() => {
            canSelectOption = true
            nextQuestion()
        }, 1500)
   });
});

function start() {
    startTimerLine()
    clearInterval(sayac)
    document.querySelector('.container').style.opacity = 1
    document.querySelector('.container').style.pointerEvents = "all"
    result.style.display = "none"
    time = 30
    timeElement.textContent = time + "sn."
    timeControl()
    countElement.textContent = `${questionNumber + 1} / ${questions.length}`

    optionsElement.forEach((option, index) => {
        option.style.backgroundColor = "transparent"
        option.textContent = questions[questionNumber].options[index]
    });

    questionElement.textContent = questions[questionNumber].question
}

function end() {
    clearInterval(sayac);
    clearInterval(interval)
    document.querySelector(".container").style.opacity = 0.5
    document.querySelector(".container").style.pointerEvents = "none"
    result.style.display = "block"
    resultCorrect.textContent = `Doğru: ${correctAnswerTotal}`
    resultWrong.textContent = `Yanlış: ${wrongAnswerTotal}`
    resultEmpty.textContent = `Boş: ${emptyAnswerTotal}`
}

function nextQuestion() {
    if(questionNumber < questions.length -1)
    {
        questionNumber++    
    }
    else
    {
        end()
        return
    }

    start()
}

startTimerLine
function startTimerLine() {
    timerElement.style.width = "0px"
    clearInterval(interval)

    const targetWidth = 560
    const totalTime = 30000 //30saniye
    let currentTime = totalTime

    interval = setInterval(() => {
        currentTime -= 10

        if (currentTime >= 0) 
        {
            const progress = (totalTime -  currentTime) / totalTime
            const currentWidth = progress * targetWidth
            timerElement.style.width = `${currentWidth}px`
        }
        else
        {
            clearInterval(interval)
        }
    }, 10)
}

function timeControl() {
    sayac = setInterval(() => {
        if(time > 0)
        {
            time -= 1
            timeElement.textContent = time + "sn."
        }
        else
        {
            emptyAnswerTotal++
            nextQuestion()
        }
    }, 1000)
}

againBtn.addEventListener('click', () => {
    window.location.reload();
});