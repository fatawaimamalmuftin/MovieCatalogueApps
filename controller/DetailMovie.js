// import axios from 'axios'

async function getDetailMovie(token,pathDetail,idMovie) {
    const res = await axios.get(
        pathDetail + idMovie,{
            headers:{
                'Authorization': token,
                'Accept': 'application/json'
            }
        }
    )

    const imgPath = 'https://image.tmdb.org/t/p/w500'

    const data = new Object()
    data.image = imgPath+res.data.poster_path
    data.genres = res.data.genres
    data.title = res.data.title
    data.rate = res.data.vote_average
    data.desc = res.data.overview

    return data
}
const pathDetail ='https://api.themoviedb.org/3/movie/'
const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTdiZmE4Y2M2MDZlMWRmZTM4NDVkZTQ5YjYwYjBiZSIsIm5iZiI6MTc4NjAwOTQ3Mi42MjgsInN1YiI6IjZhNzQ1NzgwNzBlY2JmNTQzZTQ1MmVkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaLKrtra1WgZBU7QFN-Ovj5k4DWSYIoBdMFmejc3d0k'
// const idMovie = 1101383
// getDetailMovie(token,pathDetail,idMovie)

document.addEventListener('DOMContentLoaded',async () => {

const users = JSON.parse(localStorage.getItem('users') || '[]')

// cari user yang sedang login
const loggedUser = users.find((user) => user.logind === true)
// console.log(loggedUser)

//get nav untuk web
const webNav = document.getElementById('webNav')

//get nav untuk mobile
const mobileNav = document.getElementById('mobileNav')

// get sesuai id tombol LOGIN
const webLogin = document.getElementById('webLogin')

// get sesuai id MY WATCHLISTS
const webWatchlist = document.getElementById('webWatchlist')
// console.log(webWatchlist.style.display)

// kalau ada user yang login
if (loggedUser) {

    // tampilkan watchlist
    webWatchlist.style.display = ''


    // ambil huruf pertama email
    const firstLetter = loggedUser.email.charAt(0).toUpperCase()


    // ubah LOGIN menjadi profile
    webLogin.textContent = firstLetter
    mobileNav.textContent = firstLetter
    webLogin.removeAttribute('href')
    mobileNav.removeAttribute('href')

    webLogin.setAttribute('class','flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#AD49E1] bg-[#AD49E1] text-sm font-bold text-white transition hover:bg-[#c76bea]')

    // buat tombol logout
    const logoutMenu = document.createElement('button')

    logoutMenu.textContent = 'Logout'

    logoutMenu.setAttribute('class','absolute right-4 md:right-53 top-16 hidden rounded-lg border border-white/10 bg-red-700 px-5 py-1 text-sm font-medium text-white shadow-xl transition hover:bg-red-500')

    document.body.append(logoutMenu)


    // klik profile
    webLogin.addEventListener('click', () => {
        logoutMenu.classList.toggle('hidden')
    })
    mobileNav.addEventListener('click', () => {
        logoutMenu.classList.toggle('hidden')
    })


    // klik logout
    logoutMenu.addEventListener('click', () => {

        loggedUser.logind = false

        localStorage.setItem(
            'users',
            JSON.stringify(users)
        )

        window.location.reload()
    })


} else {
    // kalau tidak ada yang login
    webWatchlist.style.display = 'none'
}

    const idMovie = window.localStorage.getItem('selected')

    try{
        const data = await getDetailMovie(token,pathDetail,idMovie)
        // console.log(data)

        const divL = document.createElement('div')
        divL.setAttribute('class','relative h-[420px] sm:h-[500px] lg:h-full lg:min-h-[600px]')

        const img = document.createElement('img')
        img.setAttribute('class','h-full w-full')
        img.setAttribute('alt',data.title)
        img.setAttribute('src',data.image)

        divL.append(img)

        const divR = document.createElement('div')
        divR.setAttribute('class','flex flex-col justify-between sm:p-8 lg:p-12')

        const divHead = document.createElement('div')
        divHead.setAttribute('class','mb-3 text-sm font-bold tracking-[0.3em] text-[#AD49E1]')
        divHead.textContent = 'Movie Details'

        const genres = document.createElement('div')
        genres.setAttribute('class','mb-6 flex flex-wrap gap-2')

        data.genres.forEach((e) => {
            const span = document.createElement('span')
            span.setAttribute('class','rounded-full border border-[#AD49E1]/40 bg-[#AD49E1]/10 px-4 py-1.5 text-sm font-medium text-[#EBD3F8]')
            span.textContent = e.name
            genres.append(span)
        });

        const title = document.createElement('h1')
        title.setAttribute('class','mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl')
        title.textContent = data.title

        const divIMDB = document.createElement('div')
        divIMDB.setAttribute('class','mb-8 flex items-center gap-4')
        
        const rate = document.createElement('span')
        rate.setAttribute('class','text-xl text-[#EBD3F8]/50')
        rate.textContent = data.rate + ' / 10'

        const star = document.createElement('img')
        star.setAttribute('class','w-7 h-7')
        star.setAttribute('src','../../model/assets/star.svg')
        star.setAttribute('alt','star')

        const IMDB = document.createElement('div')
        IMDB.setAttribute('class','flex items-center gap-2 rounded-xl bg-[#F5C518] px-4 py-2')
        const span = document.createElement('span')
        span.setAttribute('class','text-sm font-extrabold text-black')
        span.textContent = 'IMDB'
        IMDB.append(span)
        divIMDB.append(rate,star,IMDB)

        const desc = document.createElement('div')
        const h2 = document.createElement('h2')
        h2.setAttribute('class','mb-3 text-lg font-bold')
        h2.textContent = 'Description'
        const p = document.createElement('p')
        p.setAttribute('class','max-w-3xl text-sm leading-7 text-[#EBD3F8]/70 sm:text-base')
        p.textContent = data.desc
        desc.append(h2,p)
        
        const action = document.createElement('div')
        action.setAttribute('class','flex flex-wrap gap-3')

        const btnAdd = document.createElement('button')
        btnAdd.setAttribute('class','rounded-xl bg-[#AD49E1] px-6 py-3 font-semibold text-[#2E073F] transition hover:bg-[#c76bea] hover:shadow-xl hover:shadow-[#AD49E1]/20')
        btnAdd.setAttribute('type','button')
        btnAdd.textContent = 'Add to Watchlist'

        const btnBack = document.createElement('a')
        btnBack.setAttribute('class','rounded-xl border border-[#EBD3F8]/20 bg-white/5 px-6 py-3 font-semibold text-[#EBD3F8] transition hover:border-[#AD49E1]/50 hover:bg-[#AD49E1]/10 hover:text-white')
        btnBack.setAttribute('href','./AllMovie.html')
        btnBack.textContent = 'Back to Movies'
        action.append(btnAdd,btnBack)

        divR.append(genres,title,divHead,divIMDB,desc,action)

        const container = document.getElementById('container')
        container.append(divL,divR)

        const pathContent = document.getElementById('pathDetail')
        pathContent.textContent = data.title  

    }catch(err){
        console.error(err)
    }    
})
