// import axios from "axios";

const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTdiZmE4Y2M2MDZlMWRmZTM4NDVkZTQ5YjYwYjBiZSIsIm5iZiI6MTc4NjAwOTQ3Mi42MjgsInN1YiI6IjZhNzQ1NzgwNzBlY2JmNTQzZTQ1MmVkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaLKrtra1WgZBU7QFN-Ovj5k4DWSYIoBdMFmejc3d0k'
const pathP1 ='https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&page=1'
const pathP2 ='https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&page=2'
const imgPath = 'https://image.tmdb.org/t/p/w500'

async function getMovie(token, pathP1, pathP2) {
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

    const id30 = [...idMovie1,...idMovie2].slice(1 ,31)
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

    // console.log(data.length)

    const data = resultsNotClearYet.map((e)=>{

        const data = new Object()
        data.images = e.poster_path
        data.genres = e.genres
        data.title = e.original_title
        data.rate = e.vote_average
        data.desc = e.overview
        
        return data
    })

    const resultsDMclear = await Promise.all(data)
    
    // console.log(resultsDMclear[3].genres) < accs genres

    return resultsDMclear
}
// getMovie(token,pathP1,pathP2)

document.addEventListener('DOMContentLoaded', async () => {
    try{
        const dataDetail = await getMovie(token,pathP1,pathP2)
        console.log(dataDetail)
    }catch(err){
        console.error(err)
    }finally{
        console.log("Request completed")
    }
})