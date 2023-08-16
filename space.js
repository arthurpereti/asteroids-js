let des = document.getElementById('des').getContext('2d')

let bg1 = new BG(0,0,500,700,'assets/bg1.jpg')
let bg2 = new BG(0,-700,500,700,'assets/bg2.jpg')
let bg3 = new BG(0,-1400,500,700,'assets/bg1.jpg')
let bg4 = new BG(0,-2100,500,700,'assets/bg2.jpg')
let nav1 = new Nave(200,520,50,70,'assets/nave.png')
let disco1 = new Disco(100,-200,50,50,'assets/disco.png')
let disco2 = new Disco(400,-400,50,50,'assets/disco2.png')
let disco3 = new Disco(350,-600,50,50,'assets/disco3.png')
let txt_pts = new Texto()
let pts = new Texto()
let txt_vidas = new Texto()
let n_vidas = new Texto()
const som1 = new Audio('assets/nave_som.mp3')
const som2 = new Audio('assets/batida.mp3')
som1.volume = 1.0
som1.loop = true
som2.volume = 0.7

const discos = [disco1, disco2, disco3] // acrescentado, verificar
const grupoTiros = []

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

function pontos(){
    if(nav1.point(disco1)){
        nav1.pts +=1
    }else if(nav1.point(disco2)){
        nav1.pts +=1
    }else if(nav1.point(disco3)){
        nav1.pts +=1
    }
}

function colisao(){
    if(nav1.colid(disco1)){
        disco1.recomeca()
        nav1.vida -=1
        som1.pause()
        som2.play()
    }else if(nav1.colid(disco2)){
        disco2.recomeca()
        nav1.vida -=1
        som1.pause()
        som2.play()
    }else if(nav1.colid(disco3)){
        disco3.recomeca()
        nav1.vida -=1
        som1.pause()
        som2.play()
    }
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
        }
    }
}

function desenha(){    
    bg1.des_obj()
    bg2.des_obj()
    bg3.des_obj()
    bg4.des_obj()
    disco1.des_obj()
    disco2.des_obj()
    disco3.des_obj()
    nav1.des_obj()
    grupoTiros.forEach((tiro)=>{
        tiro.des_tiro()
    })
    txt_pts.des_text('Pontos:',20,40,'white','30px Times')
    pts.des_text(nav1.pts,120,40,'white','30px Times')
    txt_vidas.des_text('Vidas:',380,40,'white','30px Times')
    n_vidas.des_text(nav1.vida,460,40,'white','30px Times')
}

function atualiza(){
    bg1.mov(0,2100)
    bg2.mov(-700,1400)
    bg3.mov(-1400,700)
    bg4.mov(-2100,0)
    disco1.mov()
    disco2.mov()
    disco3.mov()
    nav1.mov()
    grupoTiros.forEach((tiro)=>{
        tiro.mov()
        if(tiro.y <= -50){
            grupoTiros.splice(tiro[0],1)
        }
    })
    tiros_nave() // acrescentado - verificar
    colisao()
    pontos()
    
}


function main(){
    des.clearRect(0,0,500,700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()