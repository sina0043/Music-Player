(function () {
  "use strict";
  let head = document.querySelector(".head"), 
    body = document.body,
    box = document.querySelector('.box'),
    output = document.querySelector('.output'),
    i,
    Index,
    currentMusic,
    album;

  const music = [
    {
      id: 0,
      name: 'music 1',
      song: new Audio('./song/1.mp3'),
      image: './img/images.jpg'
    },
    {
      id: 1,
      name: 'music 2',
      song: new Audio('./song/2.mp3'),
      image: './img/images2.jpg'
    },
    {
      id: 2,
      name: 'music 3',
      song: new Audio('./song/3.mp3'),
      image: './img/images3.jpg'
    },
    {
      id: 3,
      name: 'music 4',
      song: new Audio('./song/4.mp3'),
      image: './img/music-illustration-golden-vinyl-record-abstract-sound-graph-black-background-retro-style_484720-2281.jpg'
    },
    {
      id: 4,
      name: 'music 5',
      song: new Audio('./song/5.mp3'),
      image: './img/music-festival-logo-with-guitar-design-concept-gradient-modern-color_10375-471.jpg'
    },
    {
      id: 5,
      name: 'music 6',
      song: new Audio('./song/6.mp3'),
      image: './img/f089734bf401b9a7d59f48a5077b2907--music-covers-heart-art.jpg'
    },
    {
      id: 6,
      name: 'music 7',
      song: new Audio('./song/7.mp3'),
      image: './img/artworks-000063875278-t7j0l2-t500x500.jpg'
    },
    {
      id: 7,
      name: 'music 8',
      song: new Audio('./song/8.mp3'),
      image: './img/EVOL_by_Future_cover.jpg'
    },
  ]

  body.addEventListener('load' , outputSet());

  head.querySelectorAll("i").forEach((e1) => {
    e1.addEventListener("click", () => {
      head.querySelectorAll("i").forEach((e2) => {
        e2.classList.remove("active");
      });
      e1.classList.add("active");
    });
  });

  head.querySelectorAll('i')[0].addEventListener('click' , ()=>{
    box.style.backgroundImage = 'url(./img/concept-eternal-theme-about-eternity-music-musical-instruments-good-mood-ascended-aspiration-action-treble-clef-sheet-music_771426-4115.avif)';
    output.innerHTML=`
      <ul class="album mt-4 ml-n5"></ul>
    `
    album = document.querySelector(".album");

    for(i of music.keys()) {
      document.querySelector('.album').innerHTML += `
        <li class="list-unstyled d-flex justify-content-between p-2 px-3" index="${i}">
          <img src="${music[i].image}" alt="">
          <span class="align-self-center">${music[i].name}</span>
          <i class="play fa fa-play align-self-center"></i>
        </li>
      `
    }

    album.querySelectorAll('li').forEach((e1) => {
      e1.addEventListener("click", (e2) => {
        setTimeout(() => {
          for(i of music.keys()) {
            music[i].song.volume  = localStorage.getItem('volume') / 100;
            if(localStorage.getItem('volume') == null) {
              music[i].song.volume = 1;
            }
          }  
        }, 10);
        
        Index = e2.currentTarget.attributes.getNamedItem('index').value,
        currentMusic = music[Index].song;

        if(e1.classList.contains("active")) {
          currentMusic.pause();
          Pause(e1);
        }else {
          album.querySelectorAll('li').forEach((e3) => {
            Pause(e3);
          });
          currentMusic.play();
          Play(e1);
        }

        for(i of music.keys()) {
          if(music[i].song != currentMusic) {
            music[i].song.pause();
            music[i].song.currentTime = 0;
          }
        }
      });
      
      for(i of music.keys()) {
        if(music[i].song.paused == false) {
          if (i == e1.attributes.getNamedItem('index').value) {
            Play(e1);
          }
        }
      }
    });

    function Play(element) {
      element.classList.add("active");
      element.querySelector('.play').classList.replace('fa-play' , 'fa-pause');
    }
  
    function Pause(element) {
      element.classList.remove("active");
      element.querySelector('.play').classList.replace('fa-pause' , 'fa-play')
    }
  
    $(".album").mCustomScrollbar({
      theme: "minimal",
      scrollInertia: 200,
    });
  })

  head.querySelectorAll('i')[1].addEventListener('click' , ()=>{
    box.style.backgroundImage = 'none';
    box.style.backgroundColor = 'black';
    output.innerHTML=`
      <div class="animate d-flex align-items-center justify-content-center my-5">
        <img src="./img/images.jpg" alt="" class="rounded-circle">
      </div>
      <h5 class="title text-center">music 1</h5>
      <div class="d-flex justify-content-around align-items-center mt-3">
        <span class="current-timer align-self-center">0:00</span>
        <input class="music-range align-self-center" type="range" value="0">
        <span class="total-timer align-self-center">${formatTime(music[0].song.duration)}</span>
      </div>
      <div class="option d-flex justify-content-around align-items-center mt-3">
        <i class="auto-play active align-self-center fa-brands fa-autoprefixer" data-toggle="tooltip" title="Turn on auto-play next track"></i>
        <i class="random align-self-center fa-solid fa-shuffle" data-toggle="tooltip" title="Play music in order"></i>
        <i class="backward align-self-center fa-solid fa-backward-fast"></i>
        <i class="play-music align-self-center fa-solid fa-circle-play"></i>
        <i class="forward align-self-center fa-solid fa-forward-fast"></i>
        <i class="repeat align-self-center fa-solid fa-repeat" data-toggle="tooltip" title="Loop the current song off"></i>
        <div class="volume align-self-center position-relative">
          <input type="range" class="position-absolute d-none" value="100">
          <i class="align-self-center fa-solid fa-volume-off d-none"></i>
          <i class="align-self-center fa-solid fa-volume-low d-none"></i>
          <i class="align-self-center fa-solid fa-volume-high"></i>
        </div>
      </div>
    `

    for(i of music.keys()) {
      if(music[i].song.paused == false) {
        output.innerHTML=`
          <div class="animate d-flex align-items-center justify-content-center my-5">
            <img src="${music[i].image}" alt="" class="rounded-circle">
          </div>
          <h5 class="title text-center">${music[i].name}</h5>
          <div class="d-flex justify-content-around align-items-center mt-3">
            <span class="current-timer align-self-center">0:00</span>
            <input class="music-range align-self-center" type="range" value="0">
            <span class="total-timer align-self-center">${formatTime(music[i].song.duration)}</span>
          </div>
          <div class="option d-flex justify-content-around align-items-center mt-3">
            <i class="auto-play active align-self-center fa-brands fa-autoprefixer" data-toggle="tooltip" title="Turn on auto-play next track"></i>
            <i class="random align-self-center fa-solid fa-shuffle" data-toggle="tooltip" title="Play music in order"></i>
            <i class="backward align-self-center fa-solid fa-backward-fast"></i>
            <i class="play-music align-self-center fa-solid fa-circle-pause"></i>
            <i class="forward align-self-center fa-solid fa-forward-fast"></i>
            <i class="repeat align-self-center fa-solid fa-repeat" data-toggle="tooltip" title="Loop the current song off"></i>
            <div class="volume align-self-center position-relative">
              <input type="range" class="position-absolute d-none" value="100">
              <i class="align-self-center fa-solid fa-volume-off d-none"></i>
              <i class="align-self-center fa-solid fa-volume-low d-none"></i>
              <i class="align-self-center fa-solid fa-volume-high"></i>
            </div>
          </div>
        `
      }
    }

    let title = document.querySelector(".title"),
      image = document.querySelector('.rounded-circle'),
      currentTimer = document.querySelector(".current-timer"),
      totalTimer = document.querySelector(".total-timer"),
      musicRange = document.querySelector(".music-range"), 
      autoPlay = document.querySelector(".auto-play"),
      random = document.querySelector(".random"),
      backward = document.querySelector(".backward"),
      play = document.querySelector(".play-music"),
      forward = document.querySelector(".forward"),
      repeat = document.querySelector(".repeat"),
      volumeRange = document.querySelector(".volume").querySelector('input'),
      volume = document.querySelector(".volume"),
      currentMusic = 0;

    for(i of music.keys()) {
      if(music[i].song.paused == false) {
        play.classList.add('active');
        image.style.animationPlayState = 'running';
        musicRange.max = music[i].song.duration;
        music[i].song.addEventListener('timeupdate',(e)=>{  
          currentTimer.textContent = formatTime(e.currentTarget.currentTime);
          musicRange.value = e.currentTarget.currentTime;
        })

        volumeRange.value = localStorage.getItem('volume');
        music[i].song.volume  = localStorage.getItem('volume') / 100;

        if(localStorage.getItem('volume') == null) {
          volumeRange.value = 100;
          music[i].song.volume = 1;
        }
      }

      changeValueIcon();

      music[i].song.addEventListener('ended',()=>{
        if(autoPlay.classList.contains('active')) {
          forward.click();
        }else if(repeat.classList.contains('active')){
          play.click();
        }else {
          end();
        }
      })
    }  

    volumeRange.addEventListener('input' , ()=>{
      for(i of music.keys()) {
        if(music[i].song.paused == false) {
          music[i].song.volume  = volumeRange.value / 100;
          localStorage.setItem('volume',volumeRange.value)
        }
      }

      changeValueIcon();
    })

    forward.addEventListener('click' , ()=>{
      if(random.classList.contains('active')){
        end();
        currentMusic = Math.floor((Math.random() * music.length - 1) + 1);
        title.innerText = music[currentMusic].name;
        image.src = music[currentMusic].image;
        play.click();
      }else {
        if(music[currentMusic].id < music.length -1) {
          end();
          ++currentMusic;
          title.innerText = music[currentMusic].name;
          image.src = music[currentMusic].image;
          play.click();
        } else if(music[currentMusic].id == music.length -1) {
          end();
          currentMusic = 0;
          title.innerText = music[currentMusic].name;
          image.src = music[currentMusic].image;
          play.click();
        }
      }
    })
    
    backward.addEventListener('click' , ()=>{
      if(random.classList.contains('active')){
        end();
        currentMusic = Math.floor((Math.random() * music.length - 1) + 1);
        title.innerText = music[currentMusic].name;
        image.src = music[currentMusic].image;
        play.click();
      }else {
        if(music[currentMusic].id > 0) {
          end();
          --currentMusic;
          title.innerText = music[currentMusic].name;
          image.src = music[currentMusic].image;
          play.click();
        } else if(music[currentMusic].id == 0) {
          end();
          currentMusic = music.length -1;
          title.innerText = music[currentMusic].name;
          image.src = music[currentMusic].image;
          play.click();
        }
      }
    })

    play.addEventListener("click", () => {
      for(i of music.keys()) {
        if(music[i].song.paused == false) {
          music[i].song.pause();
          play.classList.replace('fa-circle-pause' , 'fa-circle-play');
          play.classList.remove('active');
          image.style.animationPlayState = 'paused';
        }else if(music[i].name == title.innerText) {
          music[i].song.play();
          play.classList.replace('fa-circle-play' , 'fa-circle-pause');
          play.classList.add('active');
          image.style.animationPlayState = 'running';
          musicRange.max = music[i].song.duration;
          music[i].song.addEventListener('timeupdate',(e)=>{  
            currentTimer.textContent = formatTime(e.currentTarget.currentTime);
            totalTimer.textContent = formatTime(e.currentTarget.duration);
            musicRange.value = e.currentTarget.currentTime;    
          })
        }
      }
    });

    musicRange.addEventListener('input' , ()=>{
      for(i of music.keys()) {
        if(music[i].song.paused == false) {
          music[i].song.currentTime = musicRange.value;
        }
      }
    })

    autoPlay.addEventListener("click", () => {
      autoPlay.classList.toggle("active");
      if (repeat.classList.contains("active")) {
        repeat.classList.remove("active");
      }
      tooltipMessage(autoPlay , 'Turn on auto-play next track' , 'Turn off auto-play next track');
    });
  
    random.addEventListener("click", () => {
      random.classList.toggle("active");
      tooltipMessage(random , 'Play music randomly' , 'Play music in order');
    });

    repeat.addEventListener("click", () => {
      repeat.classList.toggle("active");
      if (autoPlay.classList.contains("active")) {
        autoPlay.classList.remove("active");
      }
      tooltipMessage(repeat , 'Loop the current song on' , 'Loop the current song off');
    });
  
    volume.addEventListener('click' , ()=>{
      volumeRange.classList.toggle("d-none");
    })
  
    body.addEventListener('wheel' , (e1)=>{
      if (e1.deltaY == 100  && !volumeRange.classList.contains('d-none')) {
        volumeRange.value -= 5;
      } 
      if (e1.deltaY == -100 && !volumeRange.classList.contains('d-none')) {
        volumeRange.value += 1;
      }
      for(i of music.keys()) {
        if(music[i].song.paused == false) {
          music[i].song.volume  = volumeRange.value / 100;
          localStorage.setItem('volume',volumeRange.value)
        }
      }  
      changeValueIcon();
    })
    
    function tooltipMessage(elem , message1 , message2){
      if (elem.classList.contains("active")) {
        elem.attributes.getNamedItem('data-original-title').value = message1;
      }else{
        elem.attributes.getNamedItem('data-original-title').value = message2;
      }
    }

    function changeValueIcon() {
      volume.querySelectorAll('i').forEach(e2=>{
        if(!e2.classList.contains('d-none')){
          e2.classList.add('d-none');
        }

        if(volumeRange.value == 0) {
          if(e2.classList.contains('fa-volume-off')){
            e2.classList.remove('d-none');
          }
        }else if(volumeRange.value > 0 && volumeRange.value < 70) {
          if(e2.classList.contains('fa-volume-low')){
            e2.classList.remove('d-none');
          }
        }else {
          if(e2.classList.contains('fa-volume-high')){
            e2.classList.remove('d-none');
          }
        }
      })
    }

    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });

    function formatTime(time) {
      var min = Math.floor(time / 60);
      var sec = Math.floor(time % 60);
      return min + ':' + ((sec<10) ? ('0' + sec) : sec);
    }

    function end() {
      for(i of music.keys()) {
        music[i].song.pause();
        music[i].song.currentTime = 0;
        musicRange.value = 0;
        play.classList.replace('fa-circle-pause' , 'fa-circle-play');
        play.classList.remove('active');
        image.style.animationPlayState = 'paused';
      }
    }
  })

  function outputSet() {
    setTimeout(() => {
      head.querySelectorAll('i')[0].click();
    }, 1);
  }
})();
