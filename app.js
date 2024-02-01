const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");



const player = new MusicPlayer(musicList);

window.addEventListener("load", () => { //sayfanın yuklendıgı ilk an
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();

});

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {

    const isMusicPlay = container.classList.contains('playing'); //playing klasına sahıpmı degılmı 
    isMusicPlay ? pauseMusic() : playMusic(); //müzik calıyorsa durdur calmıyorsada müziği calabiliriz
})

prev.addEventListener('click', () => {
    prevMusic();
   
}) //geri


next.addEventListener('click', () => {
    nextMusic();
   
}) //ileri

const prevMusic = () => { //geri fonksiyonunda tekrar cagırdıklarımız kısmı
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}


const nextMusic = () => { //ileri fonksiyonunda tekrar cagırdıklarımız kısmı
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const pauseMusic = () => {
    container.classList.remove('playing'); //sarkıyı durdurur
    play.querySelector('i').classList = 'fa solid fa-play';
    audio.pause();

}

const playMusic = () => {
    container.classList.add('playing'); //tekrar baslatır sarkıyı
    play.querySelector('i').classList = 'fa solid fa-pause';
    audio.play();

}


//!süre işlemleri
const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60); // dakika olarak hesaplar
    const saniye = Math.floor(toplamSaniye % 60); // saniye olarak hesaplar modunu almıs oluruz kalan kısmı
    const guncellenenSaniye = saniye < 10 ? `0${saniye} ` : `${saniye}`
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}
audio.addEventListener('loadedmetadata', () => {

    duration.textContent = calculateTime(audio.duration); //yazdığımızda süre sayfaya gelir
    progressBar.max = Math.floor(audio.duration);
   
})


audio.addEventListener('timeupdate', () => { //saniye gectıgı surece tek tek calıstırılsın.
    // console.log('dd')
    progressBar.value = Math.floor(audio.currentTime); //currentTime muzık oanda hangı sanıyedeyse o bılgı bıze gelır
    currentTime.textContent = calculateTime(progressBar.value); //müzik acıldıgında süre ilerlemeye başlar
})

progressBar.addEventListener('input', () => { //ilerlettiğimizde istediğimiz saniyeye gidebilsin

    currentTime.textContent = calculateTime(progressBar.value)
    audio.currentTime = progressBar.value; //müziğin süre bilgisini set edelim şimdiki zaman bilgisi progressbar.value
})

// !ses kontrolü
let sesDurumu = 'sesli';

volumeBar.addEventListener('input', (e) => { //süre cubugunun ileri geri hareketi ile sec acıp kapatırız bu fonksıyonla
    const value = e.target.value; //süre cubugunu liderlettiğimizde hangı rakamda oldugunu gösterir konsolda
    audio.volume = value / 100; //w3scholldada belirtilen 0.5e kadar deger girilebilir oyüzden 100e bölüyoruz
    if (value == 0) {
        audio.muted = true; //sesin kısılması demek
        sesDurumu = 'sessiz';
        volume.classList = 'fa-solid fa-volume-xmark'

    } else {
        audio.muted = false; //sesin acılması demek
        sesDurumu = 'sesli';
        volume.classList = "fa-solid fa-volume-high"


    }
})






volume.addEventListener('click', () => {
    if (sesDurumu === 'sesli') {

        audio.muted = true; //sesin kısılması demek
        sesDurumu = 'sessiz';
        volume.classList = 'fa-solid fa-volume-xmark'
        volumeBar.value = 0; //süre cubugu sıfırlanır sesi kapattınca
    } else {

        audio.muted = false; //sesin acılması demek
        sesDurumu = 'sesli';
        volume.classList = "fa-solid fa-volume-high"
        volumeBar.value = 100; //süre cubugu tamamlanır sesi acılınca
    }


})

const displayMusicList = (list) => { //şarkıları listeler acılan kapanan kısımda 
    for (let i = 0; i< list.length; i++) { //listeye tıkladıgımızda müzik calsın dıye onclıck ekledık
        let liTag = `
                       <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center"> 
                       <span>${list[i].getName()}</span>
                     
                       <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                       <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
                      </li>





        `;
        ul.insertAdjacentHTML('beforeend', liTag) //tüm şarkıların süreleri görünür
        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);
        liAudioTag.addEventListener('loadeddata', () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);

        });




    }

}
const selectedMusic = (li)=>{  //liste elemanı eklenebilir
    player.index=li.getAttribute('li-index')

displayMusic(player.getMusic());
playMusic(); //yazdığımızda tıklayınca musıc calar
isPlayingNow();
}

const isPlayingNow = () =>{
    for(let li of ul.querySelectorAll('li')){
    if(li.classList.contains('playing')){

        li.classList.remove('playing')
        
    }
    if(li.getAttribute('li-index')==player.index){

        li.classList.add('playing')
    }
    }
}

audio.addEventListener('ended',()=>{

    nextMusic();
})