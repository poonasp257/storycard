//처음 이미지가 생성될곳을 지정해 줍니다
var img_L = 10;
var img_T = 20;
var targetObj = null;
var isIn = false;

function getLeft(o) {
    var temp = window.getComputedStyle(o, null);
    return parseInt(temp.left.replace('px', ''));
}
function getTop(o) {
    var temp = window.getComputedStyle(o, null);
    return parseInt(temp.top.replace('px', ''));
}

// 이미지를 움직이는 함수입니다 움직였던 위치만큼 처음 이미지가 있던 좌표를 더해줍니다 최종 위치입니다
function moveDrag(e) {
    var e_obj = window.event ? window.event : e;
    var dmvx = parseInt(e_obj.clientX + img_L);
    var dmvy = parseInt(e_obj.clientY + img_T);
    targetObj.style.left = dmvx + 'px';
    targetObj.style.top = dmvy + 'px';

    var rect = document.getElementById('board').getBoundingClientRect();
    if(e_obj.pageX >= rect.left && e_obj.pageX <= rect.right &&
        e_obj.pageY >= rect.top && e_obj.pageY <= rect.bottom){
            isIn = true;
    }
    else {
        isIn = false;
    }
    console.log(isIn);
}

// 드래그를 시작하는 함수 입니다. 움직였던 좌표에서 처음 드래그를 시작했던 좌표를 빼줍니다. 움직인 좌표를 나타내줍니다
function startDrag(e, obj) {
    targetObj = obj.cloneNode(true);    
    document.body.appendChild(targetObj);

    var e_obj = window.event ? window.event : e;
    img_L = getLeft(obj) - e_obj.clientX;
    img_T = getTop(obj) - e_obj.clientY;

    document.onmousemove = moveDrag;
    document.onmouseup = stopDrag;
    if (e_obj.preventDefault) e_obj.preventDefault();
}

// 드래그를 멈추는 함수 입니다
function stopDrag(ev) { 
    document.body.removeChild(targetObj);
    if(isIn) document.getElementById('board').appendChild(targetObj); 
    
    document.onmousemove = null;
    document.onmouseup = null;
    isIn = false;
}

function AddTextBox() {
    var textBox = document.getElementById('inputBox');
    var prop = window.getComputedStyle(textBox, null);
    if(textBox.value === '') return;

    var randX = Math.floor(Math.random() * (1500 - parseInt(prop.width)));
    var randY = Math.floor(Math.random() * (1000 - parseInt(prop.height)));

    document.getElementById('board').innerHTML +=
    `<div class="post" style="position:absolute; left:${randX}px; top:${randY}px;"> ${textBox.value} </div>`;
    textBox.value = '';
}