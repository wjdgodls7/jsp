(() => {

    let yoffset;
    let currentScene;
    let prevScrollHeight;
    let enterscence;
    const sceneInfo = [

        //Yoffset 현재 머물러있는 스크롤값을 확인할 수 있음
        // sceneInfo의 전체적인 값은 못바꾸지만
        // 안에있는 오브젝트 값은 바꿀 수 있다.
        // 키값은 변경못하지만 밸류값은 변경 가능.
        {//0번 세션
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0, // 스크롤의 총 높이 - max 높이값을 저장하기위한 변수
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            value: {
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            }
        },
        {
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0, // 스크롤의 총 높이 - max 높이값을 저장하기위한 변수
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .desc-message.a'),
                messageB: document.querySelector('#scroll-section-2 .desc-message.b'),
                messageC: document.querySelector('#scroll-section-2 .desc-message.c'),
                messageD: document.querySelector('#scroll-section-2 .desc-message.d'),
            }

        },

    ];

    function setlayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            }
            else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;

        }

        yoffset = window.pageYOffset;
        let totalscrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalscrollHeight += sceneInfo[i].scrollHeight;//여태까지의 섹션스크롤값을 빼주기 위해 totalscrollHeight에 값을 저장해놓음.
            if (totalscrollHeight >= yoffset) {
                currentScene = i;
                break;
            }
        }

    }


    function scrollAnimation() {
        const currentyOffset = yoffset - prevScrollHeight;
        const currentSceneYOffset = yoffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const offsetRatio = currentSceneYOffset / scrollHeight;
        const value = sceneInfo[currentScene].value;

        switch (currentScene) {
            case 0:
                if (offsetRatio < 0.22) {
                    sceneInfo[0].objs.messageA.style.opacity = calc(value.messageA_opacity_in, scrollHeight, currentyOffset);
                } else {
                    sceneInfo[0].objs.messageA.style.opacity = calc(value.messageA_opacity_out, scrollHeight, currentyOffset);
                }
                if (offsetRatio < 0.42) {
                    sceneInfo[0].objs.messageB.style.opacity = calc(value.messageB_opacity_in, scrollHeight, currentyOffset);
                } else {
                    sceneInfo[0].objs.messageB.style.opacity = calc(value.messageB_opacity_out, scrollHeight, currentyOffset);
                }
                if (offsetRatio < 0.62) {
                    sceneInfo[0].objs.messageC.style.opacity = calc(value.messageC_opacity_in, scrollHeight, currentyOffset);
                } else {
                    sceneInfo[0].objs.messageC.style.opacity = calc(value.messageC_opacity_out, scrollHeight, currentyOffset);
                }
                if (offsetRatio < 0.82) {
                    sceneInfo[0].objs.messageD.style.opacity = calc(value.messageD_opacity_in, scrollHeight, currentyOffset);
                } else {
                    sceneInfo[0].objs.messageD.style.opacity = calc(value.messageD_opacity_out, scrollHeight, currentyOffset);
                }

                break;

            default:
                break;
        }

    }

    function calc(value, scrollHeight, currentyOffset) {
        let start = value[2].start;
        let end = value[2].end;

        let localStart = scrollHeight * start;
        let localEnd = scrollHeight * end;
        let localScroll = currentyOffset - localStart;
        let localpart = localEnd - localStart;
        let result;

        if (currentyOffset >= localStart && currentyOffset <= localEnd && value[0] === 0) {
            result = localScroll / localEnd;
            
        } else if (currentyOffset < localStart) {

            result = value[0];
        } else if (currentyOffset > localEnd) {

            result = value[1];
        } else {
            result = 1 - (localScroll / localpart);
            return result;
        }

        return result;

    }

    function Loop() {
        enterscence = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yoffset > sceneInfo[currentScene].scrollHeight + prevScrollHeight) {
            currentScene++;
            document.body.setAttribute('id', `show-section-${currentScene}`);

        }
        else if (yoffset < prevScrollHeight) {
            if (currentScene === 0) return;
            enterscence = true;
            currentScene--;
            document.body.setAttribute('id', `show-section-${currentScene}`);
        }
        if (enterscence) return;
        scrollAnimation()
    }

    window.addEventListener('scroll', function () {
        yoffset = parseInt(pageYOffset)
        Loop();
    });

    window.addEventListener('load', setlayout)
    window.addEventListener('resize', setlayout)

})();
// var 쓰는순간 계속 덮어씌워짐 같은 변수이름을 사용 할 수 있음
// let 변수를 같은 이름으로 선언할 수 없음 값은 계속 변경 가능
// const 변수를 같은 이름으로 선언할 수 없음 값도 계속 변경 불가능

// html 시작시 즉시 실행하는법. 바로 펑션을 씀
// (function() {

// })();