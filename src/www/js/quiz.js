const socket = io.connect('http://localhost:8100');

var contentPic;

var isInPause = false;

var answerSumA = 0;
var answerSumB = 0;
var answerSumC = 0;
var answerSumD = 0;

let answersCollectedArrayA = [];
let answersCollectedArrayB = [];
let answersCollectedArrayC = [];
let answersCollectedArrayD = [];

var currentQuestionID;

var correctAnswer;
var elaborationTextGer;
var elaborationTextEng;

socket.emit('connectClient');

socket.on('connectClientResult', function (data) {
    socket.emit('requestData');
});

socket.on('getAnswerResult', function (data) {
    let userAnsA = data.answerA;
    let userAnsB = data.answerB;
    let userAnsC = data.answerC;
    let userAnsD = data.answerD;

    if (userAnsA) {
        answersCollectedArrayA.push({ value: 10, group: "A" });
        answerSumA = answerSumA + 1;
        let group = "A";
        restart(group);
    } else if (userAnsB) {
        answersCollectedArrayB.push({ value: 10, group: "B" });
        answerSumB = answerSumB + 1;
        let group = "B";
        restart(group);
    } else if (userAnsC) {
        answersCollectedArrayC.push({ value: 10, group: "C" });
        answerSumC = answerSumC + 1;
        let group = "C";
        restart(group);
    } else if (userAnsD) {
        answersCollectedArrayD.push({ value: 10, group: "D" });
        answerSumD = answerSumD + 1;
        let group = "D";
        restart(group);
    } else {
        console.log('noAnswerUpdate');
    }
    updateAnswerSums();

    /*if (answersCollectedArray.length !== 0) {
        restart();
    }*/
});

const requestUserButton = $("#requestUser");

function triggerRequestData() {
    socket.emit('requestData');
}

requestUserButton.click(function () {
    triggerRequestData();
});

function triggerKick(id) {
    socket.emit('kickUser', id);
}

function createProgressbar(id, duration, pause, callback) {
    var progressbar = document.getElementById(id);
    var durationTime = duration;
    if (!pause) {
        progressbar.className = 'progressbar';
    } else {
        progressbar.className = 'progressbarhidden';
        durationTime = '25s';
    }

    var progressbarinner = document.createElement('div');
    progressbarinner.id = 'timerbar';
    progressbarinner.className = 'inner';

    progressbarinner.style.animationDuration = durationTime;

    if (typeof (callback) === 'function') {
        progressbarinner.addEventListener('animationend', callback);
    }

    progressbar.appendChild(progressbarinner);

    progressbarinner.style.animationPlayState = 'running';

    // createProgressbar(id, duration, callback);
}

addEventListener('load', function () {
    intializeVis();
    answerSumA = 0;
    answerSumB = 0;
    answerSumC = 0;
    answerSumD = 0;

    let bottomContainer = document.getElementById('bottomicon');
    var bottomImg = document.createElement("IMG");
    bottomImg.src = '../assets/icons/circle-icon-cut.png';
    bottomImg.style.height = '160px';
    bottomContainer.appendChild(bottomImg);

    socket.emit('getNextQuestion');
    updateAnswerSums();
    createProgressbar('progressbar', '25s', isInPause, function () {
        isInPause = !isInPause;
        changeQuestionAndRestartTimer();
    });
});

function changeQuestionAndRestartTimer() {
    //updateQuestions();
    document.getElementById('timerbar').remove();
    createProgressbar('progressbar', '25s', isInPause, function () {
        isInPause = !isInPause;
        if (!isInPause) {
            answersCollectedArrayA = [];
            answersCollectedArrayB = [];
            answersCollectedArrayC = [];
            answersCollectedArrayD = [];
            updateVisData();
            answerSumA = 0;
            answerSumB = 0;
            answerSumC = 0;
            answerSumD = 0;
            updateAnswerSums();
            let percentageBarA = document.getElementById('percentageBarA');
            let percentageBarB = document.getElementById('percentageBarB');
            let percentageBarC = document.getElementById('percentageBarC');
            let percentageBarD = document.getElementById('percentageBarD');
            percentageBarA.remove();
            percentageBarB.remove();
            percentageBarC.remove();
            percentageBarD.remove();
            intializeVis();
            socket.emit('getNextQuestion');
        } else {
            updateEndVis();
            correctAns.className = 'enabled';
            elaboration.className = 'enabled';

            let answerABlock = document.getElementById('ansABlock');
            let answerBBlock = document.getElementById('ansBBlock');
            let answerCBlock = document.getElementById('ansCBlock');
            let answerDBlock = document.getElementById('ansDBlock');

            let barA = document.getElementById('barA');
            let barB = document.getElementById('barB');
            let barC = document.getElementById('barC');
            let barD = document.getElementById('barD');

            if (correctAnswer === 'A') {
                answerBBlock.style.opacity = 0.5;
                answerCBlock.style.opacity = 0.5;
                answerDBlock.style.opacity = 0.5;
                barB.style.opacity = 0.5;
                barC.style.opacity = 0.5;
                barD.style.opacity = 0.5;
            } else if (correctAnswer === 'B') {
                answerABlock.style.opacity = 0.5;
                answerCBlock.style.opacity = 0.5;
                answerDBlock.style.opacity = 0.5;
                barA.style.opacity = 0.5;
                barC.style.opacity = 0.5;
                barD.style.opacity = 0.5;
            } else if (correctAnswer === 'C') {
                answerABlock.style.opacity = 0.5;
                answerBBlock.style.opacity = 0.5;
                answerDBlock.style.opacity = 0.5;
                barA.style.opacity = 0.5;
                barB.style.opacity = 0.5;
                barD.style.opacity = 0.5;
            } else if (correctAnswer === 'D') {
                answerABlock.style.opacity = 0.5;
                answerBBlock.style.opacity = 0.5;
                answerCBlock.style.opacity = 0.5;
                barA.style.opacity = 0.5;
                barB.style.opacity = 0.5;
                barC.style.opacity = 0.5;
            }

            let percentageBoxA = document.getElementById('percentageBoxA');
            let percentageBoxB = document.getElementById('percentageBoxB');
            let percentageBoxC = document.getElementById('percentageBoxC');
            let percentageBoxD = document.getElementById('percentageBoxD');
            percentageBoxA.style.visibility = "visible";
            percentageBoxB.style.visibility = "visible";
            percentageBoxC.style.visibility = "visible";
            percentageBoxD.style.visibility = "visible";

            let answerBoardA = document.getElementById('answerBoardA');
            let answerBoardB = document.getElementById('answerBoardB');
            let answerBoardC = document.getElementById('answerBoardC');
            let answerBoardD = document.getElementById('answerBoardD');
            answerBoardA.style.visibility = "hidden";
            answerBoardB.style.visibility = "hidden";
            answerBoardC.style.visibility = "hidden";
            answerBoardD.style.visibility = "hidden";

            data = { questionId: currentQuestionID, answerCountA: answerSumA, answerCountB: answerSumB, answerCountC: answerSumC, answerCountD: answerSumD };
            socket.emit('updateAnsweredQuestions', data);
            sendUpdateUser();
            changeQuestionAndRestartTimer();
        }
    });
}

function updateAnswerSums() {
    let answerSumAEl = document.getElementById('answerSumA');
    let answerSumBEl = document.getElementById('answerSumB');
    let answerSumCEl = document.getElementById('answerSumC');
    let answerSumDEl = document.getElementById('answerSumD');

    answerSumAEl.innerHTML = '+ ' + answerSumA;
    answerSumBEl.innerHTML = '+ ' + answerSumB;
    answerSumCEl.innerHTML = '+ ' + answerSumC;
    answerSumDEl.innerHTML = '+ ' + answerSumD;
}

socket.on('getNextQuestionResult', function (data) {
    currentQuestionID = data.id;
    let percentageBoxA = document.getElementById('percentageBoxA');
    let percentageBoxB = document.getElementById('percentageBoxB');
    let percentageBoxC = document.getElementById('percentageBoxC');
    let percentageBoxD = document.getElementById('percentageBoxD');
    let answerBoardA = document.getElementById('answerBoardA');
    let answerBoardB = document.getElementById('answerBoardB');
    let answerBoardC = document.getElementById('answerBoardC');
    let answerBoardD = document.getElementById('answerBoardD');
    let question = document.getElementById('question');
    let elaboration = document.getElementById('elaboration');
    let correctAns = document.getElementById('correctAns');
    let answerA = document.getElementById('answerA');
    let answerB = document.getElementById('answerB');
    let answerC = document.getElementById('answerC');
    let answerD = document.getElementById('answerD');
    let barA = document.getElementById('barA');
    let barB = document.getElementById('barB');
    let barC = document.getElementById('barC');
    let barD = document.getElementById('barD');

    question.innerHTML = data.textGer;
    elaboration.innerHTML = data.elaborationGer;
    elaborationTextGer = data.elaborationGer;
    elaborationTextEng = data.elaborationEng;
    var contentContainer = document.getElementById('contentImage');
    const contentUrl = data.content;
    contentContainer.style.backgroundImage = "url(" + contentUrl + ")";
    contentContainer.style.backgroundSize = "contain";

    answerBoardA.style.visibility = "visible";
    answerBoardB.style.visibility = "visible";
    answerBoardC.style.visibility = "visible";
    answerBoardD.style.visibility = "visible";
    percentageBoxA.style.visibility = "hidden";
    percentageBoxB.style.visibility = "hidden";
    percentageBoxC.style.visibility = "hidden";
    percentageBoxD.style.visibility = "hidden";

    answerA.innerHTML = data.answers[0].textGer;
    answerB.innerHTML = data.answers[1].textGer;
    answerC.innerHTML = data.answers[2].textGer;
    answerD.innerHTML = data.answers[3].textGer;

    let answerABlock = document.getElementById('ansABlock');
    let answerBBlock = document.getElementById('ansBBlock');
    let answerCBlock = document.getElementById('ansCBlock');
    let answerDBlock = document.getElementById('ansDBlock');

    answerABlock.style.opacity = 1;
    answerBBlock.style.opacity = 1;
    answerCBlock.style.opacity = 1;
    answerDBlock.style.opacity = 1;
    barA.style.opacity = 1;
    barB.style.opacity = 1;
    barC.style.opacity = 1;
    barD.style.opacity = 1;


    if (data.answers[0].isCorrectAnswer) {
        correctAnswer = 'A';
        correctAns.innerHTML = 'Richtige Antwort: A';
    } else if (data.answers[1].isCorrectAnswer) {
        correctAnswer = 'B';
        correctAns.innerHTML = 'Richtige Antwort: B';
    } else if (data.answers[2].isCorrectAnswer) {
        correctAnswer = 'C';
        correctAns.innerHTML = 'Richtige Antwort: C';
    } else if (data.answers[3].isCorrectAnswer) {
        correctAnswer = 'D';
        correctAns.innerHTML = 'Richtige Antwort: D';
    }

    correctAns.className = 'disabled';
    elaboration.className = 'disabled';
    const message = {
        questionId: data.id, questionGer: data.textGer, answerAGer: data.answers[0].textGer, answerBGer: data.answers[1].textGer, answerCGer: data.answers[2].textGer, answerDGer: data.answers[3].textGer,
        questionEng: data.textEng, answerAEng: data.answers[0].textEng, answerBEng: data.answers[1].textEng, answerCEng: data.answers[2].textEng, answerDEng: data.answers[3].textEng, correctAnswer: correctAnswer
    };
    socket.emit('getQuestion', message);
    changeQuestionAndRestartTimer();
});

socket.on('updateAnsweredQuestionsResult', function (data) {
    var answerSumComplete = data.answers[0].numberOfAnsweredTimes + data.answers[1].numberOfAnsweredTimes + data.answers[2].numberOfAnsweredTimes + data.answers[3].numberOfAnsweredTimes;
    if (data.answers[0].numberOfAnsweredTimes === 0) {
        var percentageA = 0;
    } else {
        var percentageA = data.answers[0].numberOfAnsweredTimes / answerSumComplete * 100;
    }
    if (data.answers[1].numberOfAnsweredTimes === 0) {
        var percentageB = 0;
    } else {
        var percentageB = data.answers[1].numberOfAnsweredTimes / answerSumComplete * 100;
    }
    if (data.answers[2].numberOfAnsweredTimes === 0) {
        var percentageC = 0;
    } else {
        var percentageC = data.answers[2].numberOfAnsweredTimes / answerSumComplete * 100;
    }
    if (data.answers[3].numberOfAnsweredTimes === 0) {
        var percentageD = 0;
    } else {
        var percentageD = data.answers[3].numberOfAnsweredTimes / answerSumComplete * 100;
    }

    let percentageAText = document.getElementById('percentageA');
    let percentageBText = document.getElementById('percentageB');
    let percentageCText = document.getElementById('percentageC');
    let percentageDText = document.getElementById('percentageD');
    percentageAText.innerHTML = Math.floor(Math.round(percentageA)) + ' %';
    percentageBText.innerHTML = Math.floor(Math.round(percentageB)) + ' %';
    percentageCText.innerHTML = Math.floor(Math.round(percentageC)) + ' %';
    percentageDText.innerHTML = Math.floor(Math.round(percentageD)) + ' %';

    let percentageBarWrapperA = document.getElementById('percentageBarWrapperA');
    var percentageBar = document.createElement('div');
    percentageBar.id = 'percentageBarA';
    percentageBar.className = 'percentageBar';
    percentageBar.style.height = 210 * (percentageA / 100) + "px";
    percentageBarWrapperA.appendChild(percentageBar);

    let percentageBarWrapperB = document.getElementById('percentageBarWrapperB');
    var percentageBar = document.createElement('div');
    percentageBar.id = 'percentageBarB';
    percentageBar.className = 'percentageBar';
    percentageBar.style.height = 210 * (percentageB / 100) + "px";
    percentageBarWrapperB.appendChild(percentageBar);

    let percentageBarWrapperC = document.getElementById('percentageBarWrapperC');
    var percentageBar = document.createElement('div');
    percentageBar.id = 'percentageBarC';
    percentageBar.className = 'percentageBar';
    percentageBar.style.height = 210 * (percentageC / 100) + "px";
    percentageBarWrapperC.appendChild(percentageBar);

    let percentageBarWrapperD = document.getElementById('percentageBarWrapperD');
    var percentageBar = document.createElement('div');
    percentageBar.id = 'percentageBarD';
    percentageBar.className = 'percentageBar';
    percentageBar.style.height = 210 * (percentageD / 100) + "px";
    percentageBarWrapperD.appendChild(percentageBar);


});

function sendUpdateUser() {
    Data = { correctAnswer: correctAnswer, elaborationGer: elaborationTextGer, elaborationEng: elaborationTextEng };
    socket.emit('sendUpdateODData', Data);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let testArray = [
    { value: 30, group: 'a' },
    { value: 30, group: 'b' },
    { value: 30, group: 'c' },
    { value: 30, group: 'd' },
    { value: 30, group: 'a' },
    { value: 30, group: 'a' },
    { value: 30, group: 'b' },
    { value: 30, group: 'c' },
];

// Balls
let width = 110, height = 360
let xCenter = width;
let yCenter = height;

let simulationA, simulationB, simulationC, simulationD;
let uA, uB, uC, uD;  

function intializeVis(){
    simulationA = d3.forceSimulation(answersCollectedArrayA)
        .force('charge', d3.forceManyBody().strength(5))
        .force('x', d3.forceX().x(function(d) {
            return (xCenter*Math.random());
            }))
        .force('y', d3.forceY().y(function(d) {
            return yCenter-280;
        }))
        .force('collision', d3.forceCollide().radius(function(d) {
            return d.value;
        }))
        .on('tick', tickedA);

    simulationB = d3.forceSimulation(answersCollectedArrayB)
        .force('charge', d3.forceManyBody().strength(5))
        .force('x', d3.forceX().x(function(d) {
            return (xCenter*Math.random());
            }))
        .force('y', d3.forceY().y(function(d) {
            return yCenter-280;
        }))
        .force('collision', d3.forceCollide().radius(function(d) {
            return d.value;
        }))
        .on('tick', tickedB);

    simulationC = d3.forceSimulation(answersCollectedArrayC)
        .force('charge', d3.forceManyBody().strength(5))
        .force('x', d3.forceX().x(function(d) {
            return (xCenter*Math.random());
            }))
        .force('y', d3.forceY().y(function(d) {
            return yCenter-280;
        }))
        .force('collision', d3.forceCollide().radius(function(d) {
            return d.value;
        }))
        .on('tick', tickedC);

    simulationD = d3.forceSimulation(answersCollectedArrayD)
        .force('charge', d3.forceManyBody().strength(5))
        .force('x', d3.forceX().x(function(d) {
            return (xCenter*Math.random());
            }))
        .force('y', d3.forceY().y(function(d) {
            return yCenter-280;
        }))
        .force('collision', d3.forceCollide().radius(function(d) {
            return d.value;
        }))
        .on('tick', tickedD);

    uA = d3.select('#svgA')
        .selectAll('circle');

    uB = d3.select('#svgB')
        .selectAll('circle');

    uC = d3.select('#svgC')
        .selectAll('circle');

    uD = d3.select('#svgD')
        .selectAll('circle');
}
// restart();

function restart(group){
    if(group==="A"){
        uA = uA.data(answersCollectedArrayA);
        uA.exit().remove();
        uA = uA.enter()
            .append('circle')
            .attr('r', function (d) {
                return d.value
            })
            .merge(uA);    
            simulationA.nodes(answersCollectedArrayA);
            simulationA.alpha(1).restart();
    }else if(group==="B"){
        uB = uB.data(answersCollectedArrayB);
        uB.exit().remove();
        uB = uB.enter()
            .append('circle')
            .attr('r', function (d) {
                return d.value
            })
            .merge(uB);    
            simulationB.nodes(answersCollectedArrayB);
            simulationB.alpha(1).restart();
    }else if(group==="C"){
        uC = uC.data(answersCollectedArrayC);
        uC.exit().remove();
        uC = uC.enter()
            .append('circle')
            .attr('r', function (d) {
                return d.value
            })
            .merge(uC);    
            simulationC.nodes(answersCollectedArrayC);
            simulationC.alpha(1).restart();
    }else if(group==="D"){
        uD = uD.data(answersCollectedArrayD);
        uD.exit().remove();
        uD = uD.enter()
            .append('circle')
            .attr('r', function (d) {
                return d.value
            })
            .merge(uD);    
            simulationD.nodes(answersCollectedArrayD);
            simulationD.alpha(1).restart();
    }
}
    
function tickedA() {
    uA.attr('cx', function (d) {
        return d.x = Math.max(d.value, Math.min(width - d.value, d.x));
    })
    .attr('cy', function (d) {
        return d.y = Math.max(d.value, Math.min(height - d.value, d.y));
    });
}

function tickedB() {
    uB.attr('cx', function (d) {
        return d.x = Math.max(d.value, Math.min(width - d.value, d.x));
    })
    .attr('cy', function (d) {
        return d.y = Math.max(d.value, Math.min(height - d.value, d.y));
    });
}

function tickedC() {
    uC.attr('cx', function (d) {
        return d.x = Math.max(d.value, Math.min(width - d.value, d.x));
    })
    .attr('cy', function (d) {
        return d.y = Math.max(d.value, Math.min(height - d.value, d.y));
    });
}

function tickedD() {
    uD.attr('cx', function (d) {
        return d.x = Math.max(d.value, Math.min(width - d.value, d.x));
    })
    .attr('cy', function (d) {
        return d.y = Math.max(d.value, Math.min(height - d.value, d.y));
    });
}

function updateEndVis(){
    simulationA.force('y', d3.forceY().y(function(d) {
        return yCenter;
    }));
    simulationA.nodes(answersCollectedArrayA);
    simulationA.alpha(0.5).restart();

    simulationB.force('y', d3.forceY().y(function(d) {
        return yCenter;
    }));
    simulationB.nodes(answersCollectedArrayB);
    simulationB.alpha(0.5).restart();

    simulationC.force('y', d3.forceY().y(function(d) {
        return yCenter;
    }));
    simulationC.nodes(answersCollectedArrayC);
    simulationC.alpha(0.5).restart();

    simulationD.force('y', d3.forceY().y(function(d) {
        return yCenter;
    }));
    simulationD.nodes(answersCollectedArrayD);
    simulationD.alpha(0.5).restart();
}

function updateVisData(){
    uA = uA.data(answersCollectedArrayA);
    uA.exit().remove();
    uB = uB.data(answersCollectedArrayB);
    uB.exit().remove();
    uC = uC.data(answersCollectedArrayC);
    uC.exit().remove();
    uD = uD.data(answersCollectedArrayD);
    uD.exit().remove();
}