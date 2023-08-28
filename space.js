let des = document.getElementById('des').getContext('2d')

const fim = new Over(110, 175, 300, 323, 'assets/kabum.png')
let bg1 = new BG(0,0,500,700,'assets/bg1.jpg')
let bg2 = new BG(0,-700,500,700,'assets/bg2.jpg')
let bg3 = new BG(0,-1400,500,700,'assets/bg1.jpg')
let bg4 = new BG(0,-2100,500,700,'assets/bg2.jpg')
let nav1 = new Nave(200,520,75,84.75,'assets/nave.png')
let txt_pts = new Texto()
let pts = new Texto()
let txt_vidas = new Texto()
let n_vidas = new Texto()
const texto_game_over = new Texto()
let jogar = true
const som1 = new Audio('assets/nave_som.mp3')
const som2 = new Audio('assets/batida.mp3')
const som3 = new Audio('assets/som_tiro.wav')
som1.volume = 1.0
som1.loop = true
som2.volume = 0.7
som3.volume = 1.0




let grupoTiros = [] 
let tiros = {
    des(){
        grupoTiros.forEach((tiro)=>{
            tiro.des_tiro()
            som3.play()
        })
    },
    atual(){
        grupoTiros.forEach((tiro)=>{
            tiro.mov()
            if(tiro.y <= -10){
                grupoTiros.splice(tiro[0],1)
            }
        })
    }
}

let grupoDiscos = []
let discos = {
    time1: 0, 
    time2: 0,
    time3: 0,

    criaDisco(){
        this.time1 += 1
        this.time2 += 1
        this.time3 += 1
        let pos_x = (Math.random() * (438 - 2 +1)+2)
        let pos_x2 = (Math.random() * (438 - 2 +1)+2)
        let pos_x3 = (Math.random() * (438 - 2 +1)+2)
        if(this.time1 >=95){
            this.time1 = 0
            grupoDiscos.push(new Disco(pos_x,-200,50,50,'assets/asteroide.png'))
            console.log(grupoDiscos)
        }
        if(this.time2 >=95){
            this.time2 = 0
            grupoDiscos.push(new Disco(pos_x2,-300,50,50,'assets/lua.png'))
            console.log(grupoDiscos)
        }
        if(this.time3 >=95){
            this.time3 = 0
            grupoDiscos.push(new Disco(pos_x3,-400,50,50,'assets/asteroide.png'))
            console.log(grupoDiscos)
        }
    },
    des(){
        grupoDiscos.forEach((disc)=>{
            disc.des_obj()
        })
    },
    destroiDisco(){
        grupoTiros.forEach((tiro)=>{
            grupoDiscos.forEach((disc)=>{
                if(tiro.colid(disc)){
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                    grupoDiscos.splice(grupoDiscos.indexOf(disc), 1)
                    nav1.pts +=1
                }
            })
        })
    },
    atual(){
        this.criaDisco()
        this.destroiDisco()
        grupoDiscos.forEach((disc)=>{
            disc.mov()
            if(disc.y >= 710){
                grupoDiscos.splice(grupoDiscos.indexOf(disc),1)
            }
        })
    }
}

document.addEventListener('keydown', (ev)=>{
    if(ev.key === 'a'){
        nav1.dir -=5
    }
    if(ev.key === 'd'){
        nav1.dir +=5
    }
    
    
})
document.addEventListener('keyup', (ev)=>{
    if(ev.key === 'a'){
        nav1.dir = 0
    }
    if(ev.key === 'd'){
        nav1.dir = 0
    }
})

document.addEventListener('keypress', (ev)=>{
    if (ev.key === 'l') {
        let tiro = new Tiro(nav1.x - 4 + nav1.w / 2, nav1.y, 8, 16, 'red')
        grupoTiros.push(tiro)
    }
    som1.play()
})

function gameover(){
    if(nav1.vida <= 0){
        jogar = false
    }
}

function pontos(){
    if(nav1.point(disco1)){
        nav1.pts +=1
    }else if(nav1.point(disco2)){
        nav1.pts +=1
    }else if(nav1.point(disco3)){
        nav1.pts +=1
    }
}

// function colisao(){
//     if(nav1.colid(disco1)){
//         disco1.recomeca()
//         nav1.vida -=1
//         som1.pause()
//         som2.play()
//     }else if(nav1.colid(disco2)){
//         disco2.recomeca()
//         nav1.vida -=1
//         som1.pause()
//         som2.play()
//     }else if(nav1.colid(disco3)){
//         disco3.recomeca()
//         nav1.vida -=1
//         som1.pause()
//         som2.play()
//     }
// }

function colisao(){
    grupoDiscos.forEach((disc)=>{
        if(nav1.colid(disc)){
            grupoDiscos.splice(grupoDiscos.indexOf(disc), 1)
            nav1.vida -=1
            som1.pause()
            som2.play()
        }
    })
}

// acrescentado - verificar
function tiros_nave() {
    for (let i = 0; i < grupoTiros.length; i++) {
        for (let j = 0; j < discos.length; j++) {
            if (grupoTiros[i].colid(discos[j])) {
                // Se houver colisão, remove o tiro e o disco do jogo
                grupoTiros.splice(i, 1)
                discos.splice(j, 1)

                // Incrementa os pontos do jogador
                nav1.pts += 1
            }
            som3.play()
        }
    }
}

function desenha(){
        bg1.des_obj()
        bg2.des_obj()
        bg3.des_obj()
        bg4.des_obj()
    if(jogar){
        tiros.des()
        discos.des()
        nav1.des_obj()
        grupoTiros.forEach((tiro)=>{
            tiro.des_tiro()
        })
        txt_pts.des_text('Pontos:',10,65,'white','orange','30px Times')
        pts.des_text(nav1.pts,120,65,'white','orange','30px Times')
        txt_vidas.des_text('Vidas:',380,65,'white','orange','30px Times')
        n_vidas.des_text(nav1.vida,460,65,'white','orange','30px Times')
    }else{
        fim.des_obj()
        texto_game_over.des_text('Game Over',150,350, 'red','black','50px Impact')
    }    

}

function atualiza(){
    bg1.mov(0,2100)
    bg2.mov(-700,1400)
    bg3.mov(-1400,700)
    bg4.mov(-2100,0)
    if(jogar){
        nav1.mov()
        grupoTiros.forEach((tiro)=>{
            tiro.mov()
            if(tiro.y <= -50){
                grupoTiros.splice(tiro[0],1)
            }
        })
        tiros_nave() // acrescentado - verificar
        colisao()
        // pontos()
        gameover()
        tiros.atual()
        discos.atual()
    }
}


function main(){
    des.clearRect(0,0,500,700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()