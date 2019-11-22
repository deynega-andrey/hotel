import './dropdown.scss'
import './execute-panel/execute-panel'

window.onload = function () { 
    
            function guests (result, input, made ='') {
            if (made){
                function a (name, num) {
                    let word
                    if (num > 20) {num %= 10}
                        if (num === 0 || num > 4 && num<= 20) {word = (name === 'guests') ? ' гостей' : ' младенцев'}
                        else if (num === 1) {word = (name === 'guests') ?  ' гость' : ' младенец'}
                        else {word = (name === 'guests') ?  ' гостя' : ' младенца'}
                    return word    
                }
                    let one = +result[0].innerHTML
                    let two = +result[1].innerHTML
                    let three = +result[2].innerHTML
                    let guests = one + two + a('guests', one + two)
                    let baby = three + a("baby", three)
                if (three > 0) { input.value = guests + ', ' + baby}
                else { input.value = guests}
            }}
            function beds (result, input) {
                let array = []
                let rooms = ['Спальни', 'Кровати']
                    function a (name, num) {
                        let bed
                        if (num > 20) {num %= 10}
                            if (num === 0 || num > 4 && num<= 20) {bed = (name === 'спальни') ? ' спален' : ' кроватей'}
                            else if (num === 1) {bed = (name === 'спальни') ?  ' спальня' : ' кровать'}
                            else {bed = (name === 'спальни') ?  ' спальни' : ' кровати'}
                        return bed    
                    }
                    let goods = [a('спальни', +result[0].innerHTML), a('кровати', +result[1].innerHTML)]  
                rooms.forEach((el, index) => {
                    array.push(result[index].innerHTML + ' ' + goods[index])
                })
                input.value = array.join(', ') + '...'
            }  

            let long = document.querySelectorAll('.long-dropdowns')
            let short = document.querySelectorAll('.short-dropdowns')

            function  func (long, place) {

            long.forEach(el => {
                let input = el.querySelector('input')
                let shortDropdown = el.querySelector('.short-dropdown')
                let increment = el.querySelectorAll('.execute-panel__circle-increment')
                let decrement = el.querySelectorAll('.execute-panel__circle-decrement')
                let result = el.querySelectorAll('.execute-panel__result')
                let clear = el.querySelector('.short-dropdown__clear')
                
                input.addEventListener("click", function() {
                    shortDropdown.classList.toggle("will-hide")
                })
                function check (made) {
                    result.forEach((el, index) => {
                    if (el.innerHTML === '0') {increment[index].style.opacity = 0}
                    else {increment[index].style.opacity = 1}
                    })
                    place(result, input, made)  
                }
                check ()
                increment.forEach(el => {
                    el.addEventListener('click', function () {
                        let result = this.nextElementSibling;
                        if (result.innerHTML>0) result.innerHTML = result.innerHTML - 1
                        check (true)
                    })
                })
                decrement.forEach(el => {
                    el.addEventListener('click', function() {
                        let result = this.previousElementSibling
                        result.innerHTML = +result.innerHTML + 1
                        check (true)
                    })
                })
                if (clear) {clear.addEventListener('click', function() {
                    result.forEach(el => el.innerHTML = '0')
                    input.placeholder = 'Сколько гостей'
                    check (true) 
                })} 
            })

            }
        
            func (long, guests)
            func (short, beds)
            

            let exp = document.querySelectorAll('.expandable-checkbox')
          
            exp.forEach(el => {
                let img = el.querySelector('.expandable-checkbox__image')
                let list = el.querySelector('.expandable-checkbox__list')
               
                img.addEventListener("click", function() {
                    this.classList.toggle('image-exp')
                    list.classList.toggle('hide')
                })
            
            })



            function initSlider() {
                
                let wrapper = document.querySelectorAll('.slider-wrapper')

                wrapper.forEach(el => {
                
                    let a = Math.floor(Math.random()*100000)
                    el.classList.add(`${a}`)
                    let wrapper = document.getElementsByClassName(`slider-wrapper ${a}`)[0]
                    
                    let slider = wrapper.querySelector('.slider')
                
                    slider.innerHTML = 
                    `<div class="between"></div>
                    <div class="btn1" style='margin-left: 75px'></div>
                    <div class="btn2" style='margin-left: 160px'></div>
                </div>`
    
                    let between = wrapper.querySelector('.between')
                    let button1 = wrapper.querySelector('.btn1')
                    let button2 = wrapper.querySelector('.btn2')
                    let size = wrapper.querySelector('.range__size')
                    
                    
                    size.innerHTML = 5000 + ' &#8381 - ' + 10000 + ' &#8381'
    
                  
                
                    function controller (el1, el2) {
                
                        el1.addEventListener('mousedown', function() {
                            let coorBtn2 = coor(el2)
                            let coorSlider = coor(slider)
                        
                            function moveBtn(e) {
                                let btnWidth = button1.offsetWidth
                                let bL = e.pageX  - coorSlider
                                if (bL > slider.offsetWidth - btnWidth/2) {bL = slider.offsetWidth - btnWidth/2}
                                else if (bL < 0 - btnWidth/2 ) {bL = 0 - btnWidth/2 }
                                el1.style.marginLeft = bL + 'px'
                               
                                let bR = coorBtn2 - coorSlider
                        
                                if (bR > bL) {between.style.marginLeft = bL + btnWidth/2 + 'px'}
                                else {between.style.marginLeft = el2.style.marginLeft + btnWidth/2 + 2}
                                between.style.width = Math.abs(bR - bL) + 'px'
                
                
                                bL = (bL + btnWidth/2) *56.392 
                                bR = (bR + btnWidth/2) *56.392
                                let n;
                                if (el1 === button1){if (bL > bR) {n = bL; bL = bR; bR = n}}
                                else {if (bL < bR) {n = bL; bL = bR; bR = n}}
                                if (el1 === button1) {size.innerHTML = parseInt(bL) + ' &#8381 - ' + parseInt(bR) + ' &#8381'}
                                else {size.innerHTML = parseInt(bR) + ' &#8381 - ' + parseInt(bL) + ' &#8381'}
                            }
                              
                            document.addEventListener('mousemove', moveBtn)
                            document.addEventListener('mouseup', function () {
                                document.removeEventListener('mousemove', moveBtn)  
                            })
                        })
                    }
                    
                    controller (button1, button2)
                    controller (button2, button1)
                    function coor (element) {
                        let block =  element.getBoundingClientRect()
                        return block.left
                    } 
                })




               
            }
            
            initSlider()
            
        }