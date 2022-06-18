var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var wind=document.getElementById("window");

$('body').append('<div class="upbtn"></div>');            
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.upbtn').css({
            bottom: '15px'
        });
        } else {
        $('.upbtn').css({
            bottom: '-80px'
        });
    }
});
$('.upbtn').on('click',function() {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
    return false;
});

var span = document.getElementsByClassName("close")[0];
function func() {
  modal.style.display = "block";
}

btn.onclick = func;


span.onclick = function() {
  modal.style.display = "none";
}


wind.onclick = function(event) {
  modal.style.display = "none";
}





$(function() {
    $('.forma').each(function() {    
        var $frm = $(this);
        var input = $(this).find('.validate-input-at .input-at');
        var butsend = $(this).find('.form-at-btn');
        butsend.on('click',function(){
            var check = true;
            for(var i=0; i<input.length; i++) {
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check=false;
                }
            }
            // Отправка формы        
            if (check == true) {
                $.post("/send.php", $frm.find(".form-at select, .form-at input, .form-at textarea").serialize(),
                    function(data){
                        if(data.frm_check == 'error'){ 
                            $frm.find(".result-at").html("<div class='error-at'>Ошибка: " + data.msg + "</div>");                    
                            } else {
                            $frm.find(".result-at").html("<div class='success-at'>Ваше сообщение отправлено!</div>"); 
                            $frm.find(".form-at").fadeOut(500);
                            $frm.find(".input-at").val("");            
                        }
                    }, "json");
                    return false;
            }
        });
        $('.form-at .input-at').each(function(){
            $(this).focus(function(){
                hideValidate(this);
            });
        });
        
    });    
    function validate(input) {
        /* Если нужно проверять валидность почты, раскомментируйте строчки ниже */
        /*
            if($(input).attr('type') == 'email' || $(input).attr('name') == 'email-at') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
            }
            }
        */
        if($(input).val().trim() == ''){
            return false;
        }
    }
    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }
    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
});


let img;
const detail = 4;
let particles = [];
let grid = [];
let letters = [];
let ctx;
function preload() {
    img = loadImage('/demo/i/photo.jpg'); // Ссылка на фото
}
class Particle {
    constructor (x, y) {
        this.x = x || random(width);
        this.y = y || random(height);
        this.prevY = this.y;
        this.speed = 0;
        this.v = random(0, 0.7);
        this.image = random(letters);
    } 
    update (speed) {
        if (grid.length) {
            this.speed = grid[floor(this.y / detail)][floor(this.x / detail)] * 0.97;
        }
        this.y += (1 - this.speed) * 2 + this.v;
        
        if (this.y > height) {
            this.y = 0;
        }
    }
    draw () {
        image(this.image, this.x, this.y);
    }
}
function setup () {
    const canwidth = document.getElementById('matrix').offsetWidth;     
    const canheight = ( canwidth * img.height ) / img.width;
    const canvas = createCanvas(canwidth, canheight);
    canvas.parent("matrix");  
    const imgRatio = canwidth/canheight;
    if (canwidth/canheight > imgRatio) {
        resizeCanvas(floor(canheight * imgRatio), floor(canheight));
        } else {
        resizeCanvas(floor(canwidth), floor(canwidth / imgRatio));
    }
    ctx = canvas.drawingContext; 
    pixelDensity(1);
    const alphabet = 'あいうえおかきくけこがぎぐげごさしすせそざじずぜぞぢづでどなにぬねの'.split('');
    alphabet.forEach(letter => {
        const letterImage = createGraphics(10, 10);
        letterImage.textAlign(CENTER, CENTER);
        letterImage.fill(0, 255, 0);
        letterImage.text(letter, 6, 6);
        letters.push(letterImage);
    });
    clear();
    ctx.globalAlpha = 1;
    loop();
    image(img, 0, 0, width, height);
    loadPixels();
    clear();
    noStroke();  
    grid = [];
    for (let y = 0; y < height; y+=detail) {
        let row = [];
        for (let x = 0; x < width; x+=detail) {
            const r = pixels[(y * width + x) * 4];
            const g = pixels[(y * width + x) * 4 + 1];
            const b = pixels[(y * width + x) * 4 + 2];
            const _color = color(r, g, b);
            const _brightness = brightness(_color) / 100;
            row.push(_brightness);
        }
        grid.push(row);
    }
    particles = [];
    for (let i = 0; i < 4000; i++) {
        particles.push(new Particle(null, (i/4000) * height));
    }
}
function draw () {
    ctx.globalAlpha = 0.2;
    fill(0);
    rect(0,0,width,height);
    particles.forEach(p => {
        p.update();
        ctx.globalAlpha = (p.speed + 0.15) * 0.3;
        p.draw();
    });
}