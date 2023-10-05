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
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

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

    useEffect(()=> {
        loadData()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>O que você assisti hoje?</Text>
                <View style={styles.containerInput}>
                    <TextInput placeholderTextColor="#fff" placeholder="Buscar" style={styles.input}/>
                    <MagnifyingGlass color="#fff" weight="light" size={25}/>
                </View>
            </View>
            <View>

                <FlatList 
                data={discoveryMovies}
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