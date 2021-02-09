window.onload = () => new lyrics();

// consts
const FORM = "form";
const SINGER = "singer";
const SONG = "song";
const SUBMIT = "submit";
const RESULT = "#result";
const API = "https://api.lyrics.ovh/v1/";

class lyrics {

    constructor () {
        this.init();
    }

    searchLyrics(singer, song) {
        return fetch(API + `${singer}/${song}`);
    }

    async onSubmit(singer, song, res_html) {
        const response = await this.searchLyrics(singer.value, song.value);
        const data = await response.json();
        res_html.innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div></div>'
        setTimeout(() => {
            try {
                if (data.lyrics) {
                    res_html.innerHTML = data.lyrics;
                } else {
                    res_html.innerHTML = 'Not Found lyrics';
                }
            } catch (err) {
                console.log(err);
            };
        }, 1000)        
    }

    init() {
        console.log('begin!!');
        {
            const singer = document.getElementById(SINGER);
            const song = document.getElementById(SONG);
            const form = document.querySelector(FORM);
            const result_lyrics = document.querySelector(RESULT);
            form.addEventListener(SUBMIT, el => {
                el.preventDefault();
                this.onSubmit(singer, song, result_lyrics);
            });
        }
    }

}