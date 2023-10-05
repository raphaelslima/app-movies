import { Text, TextInput, View, FlatList, ActivityIndicator } from "react-native"
import { MagnifyingGlass } from 'phosphor-react-native'
import {useState, useEffect} from 'react'
import {api} from '../../services/api'

//Styles
import {styles} from './styles'

//components
import CardMovies from "../../components/cardMovies"

const Home = ()=> {

    interface Movie {
        id: number;
        title: string;
        poster_path: string;
        overview: string;
    }

    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([])
    const [serachResultMovies, setSerachResultMovies] = useState<Movie[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [noResult, setNoResult] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(()=> {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const response = await api.get("/movie/popular", {
            params: {
                page,
            }
        })
        setDiscoveryMovies([...discoveryMovies, ...response.data.results])
        setPage(page + 1)
        setLoading(false)
    }

    const searchMovies = async (query: string) => {
        setLoading(true)
        const response = await api.get("/search/movie", {
            params: {
                query,
            }
        })

        if(response.data.results.lenght === 0) {
            setNoResult(true)
        } else{
            setSerachResultMovies(response.data.results)
        }
        setLoading(false)
    }

    const handleSearch = (text: string) => {
        setSearch(text)
        if(text.length > 2){
            searchMovies(text)
        } else {
            setSerachResultMovies([])
        }
    }

    const movieData = search.length > 2 ? serachResultMovies : discoveryMovies

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>O que você assisti hoje?</Text>
                <View style={styles.containerInput}>
                    <TextInput 
                        placeholderTextColor="#fff" 
                        placeholder="Buscar" 
                        style={styles.input}
                        onChangeText={handleSearch}
                        value={search}
                        />
                    <MagnifyingGlass color="#fff" weight="light" size={25}/>
                </View>
            </View>
            <View>

                <FlatList 
                data={movieData}
                numColumns={3}
                renderItem={(item) => <CardMovies data={item.item}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 35,
                    paddingBottom: 250,
                }}
                onEndReached={()=> loadData()}
                onEndReachedThreshold={0.5}
                />
                {loading && <ActivityIndicator size={50} color="#0296E5"/>}
            </View>
        </View>
    )
}
export default Home