const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const data = xObject || [
        'https://baidu.com',
        'https://www.acfun.cn',
        'https://www.bilibili.com',
        'https://developer.mozilla.org',
        'https://www.runoob.com',
        'https://www.w3school.com.cn/',
        'https://www.caniuse.com/',
        'https://jquery.com/',
        'https://cn.vuejs.org/',
        'https://reactjs.org/'
    ]

const render = () => {
    $('.siteList').find('li:not(.last)').remove()
    data.forEach((node, index) => {
        const $li = $(`<li>
            <a href="${node}">
                <div class="site">
                    <div class="logo">
                        <img src=${node+'/favicon.ico'} onerror="this.onerror=null;this.src='http://thumbs.dreamstime.com/t/%E4%BA%92%E8%81%94%E7%BD%91%E3%80%81%E5%9C%B0%E7%90%83%E5%92%8C%E6%B8%B8%E6%A0%87%E7%9A%84%E6%A0%87%E5%BF%97-114656224.jpg'">
                    </div>
                    <div class="link">${node.replace('https://', '').replace(/\/.*/, '').replace('www.', '')}</div>
                </div>
            </a>
            <div class="delete">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-delete"></use>
                </svg>
            </div>
        </li>`).insertBefore($('.last'))
        let isTouchDevice = 'ontouchstart' in document.documentElement;
        if(isTouchDevice){
            //移动端长按删除
            let timeOutEvent = 0
            $li.on({
                touchstart: (e)=>{
                    timeOutEvent = setTimeout(()=>{
                        timeOutEvent = 0
                        let key = window.confirm('确认删除')
                        if(key){
                            data.splice(index, 1)
                            render()
                        }
                    }, 500)
                    e.preventDefault()
                },
                touchmove: ()=>{
                    clearTimeout(timeOutEvent)
                    timeOutEvent = 0
                },
                touchend: ()=>{
                    clearTimeout(timeOutEvent)
                    $(`li:nth-child(${index+1}) a`)[0].click()
                    return false
                }
            })
        }else{
            $li.on({
                mouseover: ()=>{
                    $(`li:nth-child(${index+1}) .delete`).css('display', 'block')
                                .off('click')
                                .on('click', (e)=>{
                                    data.splice(index, 1)
                                    render()
                                })
                },
                mouseout: ()=>{
                    $(`li:nth-child(${index+1}) .delete`).css('display', 'none')
                }
            })
        }
    })
}

render()

$('.addButton').on('click', ()=>{
    let url = window.prompt('请输入要添加的网址')
    if(url){
        if(url.indexOf('https') !== 0) {
            url = 'https://' + url
        }
        data.push(url)
        render()    
    }
})

window.onbeforeunload = () => {
    const string = JSON.stringify(data)
    localStorage.setItem('x', string)
}
