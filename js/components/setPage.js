import { initialPage } from "./initial.js"

export function setPage() {
    let content = $(`
        <div class="quiz">
            <div class="head">
                <span class="number"></span>
                <span class="score">0</span>
            </div>
            <div class="question">
                <h3>Question:</h3>
                <h4 class="quest"></h4>
            </div>
            <div class="answers">
                
            </div>
            <div class="finished">
                <input type="text" class="username" placeholder="Enter your username">
                <button type="button" class="btn btn-secondary save">Save</button>
            </div>
        </div>
    `)
    $("main").empty().append(content)
    $(".finished").hide()
    $.get("/js/questions.json", null, null,
        "JSON"
    ).done((res) => {
        let count = res.sort(() => Math.random() - 0.5).slice(0, 5)
        // console.log(res);
        let index = 0
        quizSet(count[index]);
        function quizSet(quest) {
            let ans = quest.answer
            $(".quest").empty().append(quest.question)
            let answers = $(`
            <button class="answer"><span class="no">1</span><span class="content">${quest.options[0]}</span></button>
            <button class="answer"><span class="no">2</span><span class="content">${quest.options[1]}</span></button>
            <button class="answer"><span class="no">3</span><span class="content">${quest.options[2]}</span></button>
            <button class="answer"><span class="no">4</span><span class="content">${quest.options[3]}</span></button>
            `)
            $(".number").empty().append(index + 1 + "/" + count.length)
            $(".answers").empty().append(answers)
            function handleClick() {
                $(this).siblings().prop({ disabled: true })
                setTimeout(() => {
                    index++
                    if (index > count.length - 1) {
                        finished()
                        return
                    }
                    quizSet(count[index]);
                }, 1500)
                if ($(this).children(".content").text() == quest.options[ans]) {
                    $(this).toggleClass("correct")
                    let score = Number($(".score").text())
                    $(".score").empty().append(score + 10)
                } else {
                    $(this).toggleClass("wrong")
                    $(".answer").each(function (i, el) {
                        if ($(el).children(".content").text() == quest.options[ans]) {
                            $(this).toggleClass("correct")
                        }
                    })
                }
            }
            $(".answer").click(handleClick)
        }
        function finished() {
            $(".question").empty()
            $(".answers").addClass("done")
            $(".finished").fadeIn(1000)
        }
        function save() {
            localStorage.setItem(`${$(".username").val()}`, $(".score").text())
            initialPage()
        }
        $(".save").click(save)
    })
}
