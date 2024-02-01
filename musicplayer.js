class MusicPlayer {
    constructor(musicList) {
        this.musicList = musicList; //dışaırdan müzik istesini göndericez
        this.index = 1; //sarkılardan 1.set edılecek sonrakı oncekı sarkı dedıkce muzıklıstesı ıcınden 1 bılgı getırıyor olacak
    }
    getMusic() {
        return this.musicList[this.index]; //o index numarası ne ise bana o index numarasını getırecek
    }
    next(){
        if(this.index + 1 < this.musicList.length){ //müzik listesinde bulunan adete kadar yaklastırmaya calısacagız
            this.index++;

        }
        else{
            this.index=0 //son müziğe gelecek 0 a esıtlenecek
        }


    }

    prev(){
        if(this.index !=0){  //0a eşit depilse 1 azaltrak onceki müziklere gidebiliriz
            this.index--;

        }else{
            this.index=this.musicList.length - 1; //0'a esıt oldugu durumda muzıgı en sona alırız
        }

    }
}