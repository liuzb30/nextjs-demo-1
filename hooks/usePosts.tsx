import {useEffect, useState} from "react";
import axios from "axios";

export const usePosts = ()=>{
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)
    useEffect(() => {
        axios.get('/api/v1/posts').then(res => {
            const data = res.data
            setIsLoading(false)
            if (data.length === 0) {
                setIsEmpty(true)
            } else {
                setPosts(res.data)
            }
        })
    }, [])
    return {posts,isEmpty,isLoading}
}