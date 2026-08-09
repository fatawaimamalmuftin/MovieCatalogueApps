// import axios from "axios";

const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTdiZmE4Y2M2MDZlMWRmZTM4NDVkZTQ5YjYwYjBiZSIsIm5iZiI6MTc4NjAwOTQ3Mi42MjgsInN1YiI6IjZhNzQ1NzgwNzBlY2JmNTQzZTQ1MmVkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaLKrtra1WgZBU7QFN-Ovj5k4DWSYIoBdMFmejc3d0k'
const pathP1 ='https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&vote_count.gte=1&page=1'
const pathP2 ='https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&vote_count.gte=1&page=2'
const pathP3 ='https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&vote_count.gte=1&page=3'
const pathP4 ='https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&vote_count.gte=1&page=4'
const pathP5 ='https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&vote_count.gte=1&page=5'

async function getMovie(token, pathP1, pathP2, pathP3, pathP4,pathP5) {
    const res1 = await axios.get(
        pathP1,{
            headers:{
                'Authorization': token,
                'Accept': 'application/json',
            }
    })

    const data1 = res1.data.results

    const idMovie1 = data1.map((item)=>{
        let idMovie = item.id
        return idMovie
    })

    // --------------------------------------------------

    const res2 = await axios.get(
        pathP2,{
            headers:{
                'Authorization': token,
                'Accept': 'application/json',
            }
    })

    const data2 = res2.data.results

    const idMovie2 = data2.map((item)=>{
        let idMovie = item.id
        return idMovie
    })
    //----------------------------------------------------------
    const res3 = await axios.get(
        pathP3,{
            headers:{
                'Authorization': token,
                'Accept': 'application/json',
            }
    })

    const data3 = res3.data.results

    const idMovie3 = data3.map((item)=>{
        let idMovie = item.id
        return idMovie
    })

    // --------------------------------------------------
    const res4 = await axios.get(
        pathP4,{
            headers:{
                'Authorization': token,
                'Accept': 'application/json',
            }
    })

    const data4 = res4.data.results

    const idMovie4 = data4.map((item)=>{
        let idMovie = item.id
        return idMovie
    })

    // --------------------------------------------------
    const res5 = await axios.get(
        pathP5,{
            headers:{
                'Authorization': token,
                'Accept': 'application/json',
            }
    })

    const data5 = res5.data.results

    const idMovie5 = data5.map((item)=>{
        let idMovie = item.id
        return idMovie
    })

    // --------------------------------------------------

    const id30 = [...idMovie1,...idMovie2,...idMovie3,...idMovie4,...idMovie5] //.slice(1 ,31)
    // console.log(pathDetail + id30)

    
    const resultDetailMovie = id30.map((item)=>{
        const pathDetail ='https://api.themoviedb.org/3/movie/'
        return pathDetail + item
    })

    // console.log(resultDetailMovie[0])

    const resultsDM = resultDetailMovie.map(async(e)=>{
        // console.log(e[0])
        const res = await axios.get(e,{
            headers:{
                'Authorization' : token,
                'Accept' : 'application/json'
            }
        })

        return res.data
    })

    const resultsNotClearYet = await Promise.all(resultsDM)
    
    const filteredMovies = resultsNotClearYet.filter((movie) => {
        return (
            movie.poster_path &&
            movie.genres?.length > 0 &&
            movie.original_title &&
            movie.vote_average > 0 &&
            movie.overview
        )
    })

    const data = filteredMovies.slice(0, 30).map((e) => {
    const imgPath = 'https://image.tmdb.org/t/p/w500'

    const data = new Object()

    data.id_Movie = e.id
    data.images = imgPath + e.poster_path
    data.genres = e.genres
    data.title = e.original_title
    data.rate = e.vote_average
    data.desc = e.overview

    return data
    })

    return data
}
// getMovie(token,pathP1, pathP2, pathP3, pathP4,pathP5)

document.addEventListener('DOMContentLoaded', async () => {

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
console.log(webWatchlist.style.display)

// kalau ada user yang login
if (loggedUser) {

    // tampilkan watchlist
    webWatchlist.style.display = 'block'


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

    logoutMenu.setAttribute('class','absolute right-5 md:right-44 top-16 hidden rounded-lg border border-white/10 bg-red-700 px-5 py-1 text-sm font-medium text-white shadow-xl transition hover:bg-red-500')

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

    try{
        const dataDetail = await getMovie(token,pathP1, pathP2, pathP3, pathP4,pathP5)
        // console.log(dataDetail)

        const allTotal = document.querySelector('main>section>div>span')
        allTotal.textContent = dataDetail.length + ' Movie'

        dataDetail.forEach((e) => {
            const card = document.createElement('div')
            // const card = document.createElement('a')
            // card.setAttribute('href','./DetailMovie.html')
            card.setAttribute('id',e.title.replace(/\s+/g,'').toLowerCase())
            card.setAttribute('class','cursor-pointer group flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-xl shadow-black/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#AD49E1]/40 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-black/20 sm:flex-row sm:p-5')

            const divL = document.createElement('div')
            divL.setAttribute('class','shrink-0 overflow-hidden rounded-xl sm:w-[200px]')

            const imgL =document.createElement('img')
            imgL.setAttribute('class','h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105')
            imgL.setAttribute('src',e.images)
            imgL.setAttribute('alt',e.title)

            //card flayer
            divL.append(imgL)
            
            const divInfoR = document.createElement('div')
            divInfoR.setAttribute('class','flex min-w-0 flex-1 flex-col justify-between gap-5')

            const divInfo = document.createElement('div')
            divInfo.setAttribute('class', 'space-y-4')

            const h2 = document.createElement('h2')
            h2.setAttribute('id','title')
            h2.setAttribute('class', 'text-2xl font-bold text-white sm:text-3xl')
            h2.textContent = e.title

            const ul = document.createElement('ul')
            ul.setAttribute('class', 'flex flex-wrap gap-2')
            
            e.genres.forEach((g)=>{
                const li = document.createElement('li')
                li.setAttribute('class','rounded-full border border-[#AD49E1]/40 bg-[#AD49E1]/10 px-3 py-1 text-xs font-medium text-[#EBD3F8]')
                li.textContent = g.name
                ul.append(li)
            })

            const divRateCon = document.createElement('div')
            divRateCon.setAttribute('class', 'flex items-center gap-3')

            const spanIMDB = document.createElement('span')
            spanIMDB.setAttribute('class','rounded-lg bg-[#F5C518] px-3 py-1.5 text-xs font-bold text-black')
            spanIMDB.textContent = 'IMDB'

            const spanRate = document.createElement('span')
            spanRate.setAttribute('class','text-lg font-bold text-white')
            spanRate.textContent = e.rate

            const spanPer = document.createElement('span')
            spanPer.setAttribute('class','text-sm text-[#EBD3F8]/60')
            spanPer.textContent = '/ 10'

            divRateCon.append(spanIMDB,spanRate,spanPer)

            const divDesc = document.createElement('p')
            divDesc.setAttribute('class','max-w-3xl text-sm leading-7 text-[#EBD3F8]/70 sm:text-base')
            divDesc.textContent = e.desc

            const divAction = document.createElement('div')
            divAction.setAttribute('class','flex flex-wrap gap-3')

            const btnView = document.createElement('button')
            btnView.setAttribute('class','rounded-xl border border-[#AD49E1]/40 px-5 py-2.5 text-sm font-semibold text-[#EBD3F8] transition hover:border-[#AD49E1] hover:bg-[#AD49E1]/10 hover:text-white')
            btnView.setAttribute('type','button')
            btnView.setAttribute('id', 'btnDetail')
            btnView.setAttribute('value', e.id_Movie)
            btnView.textContent = 'View Details'

            btnView.addEventListener('click',async (e) => {
                window.localStorage.setItem('selected',e.target.value)
                window.location.href = './DetailMovie.html'
            })
            
            const btnAdd = document.createElement('button')
            btnAdd.setAttribute('class','rounded-xl bg-[#AD49E1] px-5 py-2.5 text-sm font-semibold text-[#2E073F] transition hover:bg-[#c76bea] hover:shadow-lg hover:shadow-[#AD49E1]/20')
            btnView.setAttribute('type','button')
            btnAdd.textContent = 'Add to Watchlist'

            divAction.append(btnView,btnAdd)

            divInfo.append(h2,ul,divRateCon,divDesc)
            divInfoR.append(divInfo,divAction)
            card.append(divL,divInfoR)

            const Container = document.getElementById('showCard')

            Container.append(card)

        });


    }catch(err){
        console.error(err)
    }
    // finally{
    //     console.log("Request completed")
    // }
})