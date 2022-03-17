let questionsAsked = [];


//Perguntas do jogo
const questions = [
    //Pergunta 0 
    {
        pergunta: "Quem é o autor da série literária Sítio do Picapau Amarelo?",
        answers: ["José de Alencar", "Machado de Assis", "Neymar", "Monteiro Lobato"],
        correct: "resp3"
    },
    //Pergunta 1 
    {
        pergunta: "Quanto é 5 x 8?",
        answers: ["30", "40", "45", "37"],
        correct: "resp1"
    },
    //Pergunta 2 
    {
        pergunta: "Quem pintou o quadro da Mona Lisa?",
        answers: ["Leonardo da Vinci", "Donato di Niccoló", "Rafael Sanzio", "Michelangelo Buonarroti"],
        correct: "resp0"
    },
    //Pergunta 3
    {
        pergunta: "Qual artista é conhecido como Rei do pop?",
        answers: ["Frank Sinatra", "Silvio Santos", "Michael Jackson", "Bon Jovi"],
        correct: "resp2"
    },
    //Pergunta 4
    {
        pergunta: "Nos contos de fadas, qual animal que, quando é beijado, vira um príncipe?",
        answers: ["Avestruz", "Sapo", "Rato", "Calango"],
        correct: "resp1"
    },
    {
        pergunta: "Quantos são os grupos na tabela periódica?",
        answers: ["10", "14", "17", "18"],
        correct: "resp3"
    }
]

let qtdPerguntas = questions.length - 1

function gerarPergunta(maxQuestions) {
    //GERAR NUMERO ALEATORIO
    let aleatorio = Number(Math.random() * maxQuestions).toFixed()
    console.log(aleatorio)

    //VERIFICAR SE A PERGUNTA JA FOI FEITA
    if (!questionsAsked.includes(aleatorio)) {
        //COLOCAR COMO PERGUNTA FEITA
        questionsAsked.push(aleatorio)

        //PREENCHER HTML COM OS DADOS DA QUESTÃO SORTEADA
        let p_selected = questions[aleatorio].pergunta

        console.log(p_selected)

        //ALIMENTAR PERGUNTA
        $('#pergunta').html(p_selected)
        $('#pergunta').attr('data-indice', aleatorio)

        //COLOCAR RESPOSTAS
        for (let i = 0; i < 4; i++) {
            $(`#resp${i}`).html(questions[aleatorio].answers[i])
        }

        //EMBARALHAR RESPOSTAS
        let container = $('#answers')
        let buttons = container.children()

        for (let i = 1; i < buttons.length; i++) {
            container.append(buttons.eq(Math.floor(Math.random() * buttons.length)))
        }
    } else {
        //SE A PERGUNTA JÁ FOI FEITA
        console.log('Pergunta já realizada, Sorteando novamente...')
        if (questionsAsked.length < qtdPerguntas + 1) {
            return gerarPergunta(maxQuestions)
        }
        else {
            $('.quiz').addClass('oculto')
            $('#msg').html('Parabéns, você venceu!')
            $('#status').removeClass('oculto')
        }
    }
}

$('.resposta').click(function () {
    if ($('.quiz').attr('data-status') !== 'travado') {
        //Percorrer todas as respostas e desmarcar classe
        resetButtons()
        $(this).addClass('selecionada')
    }

})
gerarPergunta(qtdPerguntas)

$('.confirm').click(function () {
    let indice = $("#pergunta").attr("data-indice");

    //Qual a resposta certa
    let respCorreta = questions[indice].correct

    //Qual respota que o usuario selecionou
    $('.resposta').each(function () {
        if ($(this).hasClass('selecionada')) {
            let respsotaEscolhida = $(this).attr('id')
            if (respCorreta == respsotaEscolhida) {
                console.log('Acertou')
                proxPergunta();
            }
            else {
                $('.quiz').attr('data-status', 'travado')
                $('#confirm').addClass('oculto')
                $(`#${respCorreta}`).addClass('correta')
                $(`#${respsotaEscolhida}`).removeClass('selecionada')
                $(`#${respsotaEscolhida}`).addClass('errado')
                setTimeout(function () {
                    gameOver()
                }, 3000)
            }
        }

    })
})


function resetGame() {
    $('#confirm').removeClass('oculto')

    $('.quiz').attr('data-status', 'ok')
    questionsAsked = []
    resetButtons()
    gerarPergunta(qtdPerguntas)

    $('.quiz').removeClass('oculto')
    $('#status').addClass('oculto')
}

function proxPergunta() {
    resetButtons()
    gerarPergunta(qtdPerguntas)
}


function resetButtons() {
    $('.resposta').each(
        function () {
            if ($(this).hasClass('selecionada')) {
                $(this).removeClass('selecionada')
            }
            if ($(this).hasClass('correta')) {
                $(this).removeClass('correta')
            }
            if ($(this).hasClass('errado')) {
                $(this).removeClass('errado')
            }
        }
    )
}

function gameOver() {
    $('.quiz').addClass('oculto')
    $('#msg').html('Game Over!')

    $('#status').removeClass('oculto')
}

$('#novoJogo').click(function () {
    resetGame()
})