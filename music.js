class Music{
    constructor(title,singer,img, file){
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;

    }
    getName(){
        return this.title + '-' + this.singer;
    }
}

const musicList=[
new Music('Bosver','Nilüfer','1.jpeg','1.mp3'),
new Music('Hoş Gör Sen','Ajda Pekkan','2.jpeg','2.mp3'),
new Music('Karşıyım ','Sezen Aksu','3.jpeg','3.mp3')

];