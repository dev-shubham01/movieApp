
const fetchMovies = async () => {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        return;
    }

}

export { fetchMovies };