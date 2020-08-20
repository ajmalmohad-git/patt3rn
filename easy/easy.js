let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let b4 = document.getElementById("b4");

let btnArray = [b1, b2, b3, b4];

btnArray.forEach((item,index)=>{
    item.addEventListener('click',()=>{ controller.userPlay(index)
    })
})
    

let startBtn = document.querySelector(".start");

let a1 = document.getElementById("a1");
let a2 = document.getElementById("a2");
let a3 = document.getElementById("a3");
let a4 = document.getElementById("a4");

let levelid = document.querySelector('.level')
let turns = document.querySelector('.turn')

let i = 0;

let audioArray = [a1, a2, a3, a4];

const model = {
    sequence:[],
    playerTurn:null,
    gameLevel:1,
    speed:1000,
    playerInput:[],
}

const view = {
    firstStart(){
        startBtn.style.display = "none";
        this.levelUpdate()
    },
    playSequence(item){
        setTimeout(()=>{
            btnArray[item-1].classList.add('btnclick')
            audioArray[item-1].play();
            audioArray[item-1].currentTime=0;
            setTimeout(() => {btnArray[item-1].classList.remove('btnclick');}, 400);
        },model.speed*(i++))
        
    },
    userClick(btn)
    {
       model.speed=0;
       this.playSequence(btn+1);
       model.speed=1000;
       model.playerInput.push(btn+1);
       if(model.playerInput.length == model.sequence.length)
       {
           controller.check();
       }
    },
    levelUpdate(){
        levelid.textContent = `Level ${model.gameLevel}`
    },
    loseDisplay(){
        document.documentElement.innerHTML='';
            var p = document.createElement("p");
            p.style.textAlign = "center";
            var text =  document.createTextNode(`You Got ${model.gameLevel-1} Points`);
            p.appendChild(text);
            p.style.fontFamily="sans-serif";
            p.style.fontSize="30px";
            p.style.color="lightblue";
            p.style.position = "absolute";
            p.style.top = "40%";
            p.style.left = "50%";
            p.style.transform = "translate(-50%,-60%)";
            var btn = document.createElement('button');
            btn.innerHTML="HOME"
            var a = document.createElement('a');
            a.href = "../index.html";
            a.style.textDecoration="none";
            btn.style.position = "absolute";
            btn.style.top = "60%";
            btn.style.left = "50%";
            btn.style.transform = "translate(-50%,-40%)";
            btn.style.padding="6px";
            btn.style.background="lightblue";
            btn.style.color="black";
            btn.style.border="none";
            document.body.style.background =" #11111a";
            a.appendChild(btn)
            document.getElementsByTagName('body')[0].appendChild(p);
            document.getElementsByTagName('body')[0].appendChild(a);
    },
}

const controller = {
    start(){
        startBtn.addEventListener('click',()=>{
            view.firstStart()
            this.randomAssign();
            setTimeout(()=>{this.computerPlay();},500)
            levelid.style.display = "block";
        });
        
    },
    randomAssign(){
        let randomNum = Math.ceil(Math.random() * 4);
        model.sequence.push(randomNum);
    },
    computerPlay(){
        model.sequence.forEach(view.playSequence);
    },
    userPlay(index){
        view.userClick(index);
        i=0;
    },
    check()
    {
        if(JSON.stringify(model.playerInput) == JSON.stringify(model.sequence))
        {
            model.playerInput=[];
            model.gameLevel++;
            if(model.gameLevel>=5)
            {
                model.speed=800;
                if(model.gameLevel>=9)
                {
                    model.speed=650;
                    if(model.gameLevel>=13)
                {
                    model.speed=500;
                }
                }
            }
            this.randomAssign();
            this.computerPlay();
            view.levelUpdate();
        }
        else
        {
            view.loseDisplay();
            console.log(model.playerInput,model.sequence);
        }
    }
}


//Initialize Game
controller.start();