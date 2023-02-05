import { setPage } from "./setPage.js"

export function initialPage() {
    let btns = $(`
        <div class="cont">
            <button type="button" class="btn btn-primary" id="start">Start Quiz</button>
            <button type="button" class="btn btn-secondary high" data-bs-toggle="modal" data-bs-target="#highScore">High Scores</button>
        </div>
    `)
    $("main").empty().append(btns)
    $("#start").click(() => {
        setPage()
    })
    $("main").append(`
        <div class="modal fade" id="highScore" tabindex="-1" aria-labelledby="highScoreLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="highScoreLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `)
    //let
}