class Obj {
    constructor(x,y,w,h,at){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.at = at
    }

    des_obj(){
        let img = new Image()
        img.src = this.at
        des.drawImage(img,this.x,this.y,this.w,this.h)
    }
}

class Nave extends Obj{
    dir = 0
    pts = 0
    vida = 1

    mov(){
        this.x += this.dir
        if(this.x <= 0){
            this.x =0
        }else if(this.x >=450){
            this.x = 450
        }
    }

    point(objeto){
        if(this.y+this.h < objeto.y){
            return true
        }else{
            return false
        }
    }

    colid(objeto){
        if((this.x < objeto.x+objeto.w)&&
        (this.x+this.w > objeto.x)&&
        (this.y < objeto.y + objeto.h)&&
        (this.y + this.h > objeto.y)){
            return true
        }else{
            return false
        }
    }
}

class Disco extends Obj{

    mov(){
        this.y += 7
        if(this.y >= 700){
            this.y = -200
            this.x = (Math.random() * (448 - 2 +1)+2) // o disco tem 50 px de largura
        }
    }

    recomeca(){
        this.y = -200
        this.x = (Math.random() * (448 - 2 +1)+2) // o disco tem 50 px de largura 
    }

    // acrescentado, verificar
    colid(objeto) {
        // Verifica colisão entre duas caixas delimitadoras retangulares
        return (
            this.x < objeto.x + objeto.w &&
            this.x + this.w > objeto.x &&
            this.y < objeto.y + objeto.h &&
            this.y + this.h > objeto.y
        )
    }
}

class Tiro extends Obj{
    des_tiro(){
        des.fillStyle = this.at
        des.fillRect(this.x, this.y, this.w, this.h)
    }

    mov(){
        this.y -= 10
    }
    // acrescentado, verificar
    colid(objeto) {
        // Verifica colisão entre duas caixas delimitadoras retangulares
        return (
            this.x < objeto.x + objeto.w &&
            this.x + this.w > objeto.x &&
            this.y < objeto.y + objeto.h &&
            this.y + this.h > objeto.y
        )
    }
}

class Over extends Obj{

}

class BG extends Obj{

    mov(ini,lim){
        this.y +=2
        if(this.y > lim){
            this.y = ini
        }
    }
}

class Texto{
    des_text(texto,x,y,cor,bord,font){
        des.font = font
        des.fillStyle = cor
        des.strokeStyle = bord
        des.fillText(texto,x,y)
        des.strokeText(texto,x,y)
    }
}