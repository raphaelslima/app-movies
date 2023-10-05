import { Image, Pressable} from 'react-native'

//styles
import {styles} from './styles'

interface Movie {
    id: number;
    poster_path: string;
}

interface Props {
    data: Movie;
    OnPress?: () => void
}

const cardMovies = ({data, ...rest}: Props)=> {
    return(
        <Pressable {...rest} style={styles.cardMovies}>
            <Image source={{
                uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}}
                style={styles.cardImg}
                />
        </Pressable>
    )
}

export default cardMovies