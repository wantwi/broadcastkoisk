import React, { useEffect, useState } from 'react'
import User1 from "../assets/images/user-01.png"
import Blog1 from "../assets/images/blog-01.png"
import Blog2 from "../assets/images/blog-02.png"
import Blog3 from "../assets/images/blog-03.png"
import { posts, categories } from "../data/data.json"
import Loader from '../component/Loader'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { formatDateString } from './Blog'
import { BASEURL } from '../App'


const Health = () => {
    const { category } = useParams()
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    const [pagTitle, setpagTitle] = useState("")
    const [postsList, setPostsList] = useState([])
    const [show, setShow] = useState(true)

    const returnPath = (category) => categories.find(x => x?.code === category)?.name

    const getAllCategories = async () => {
        try {
            const response = await axios.get("${BASEURL}/categories")

            setCategories(response?.data)
            setpagTitle(response?.data.find(x => x?.code === category)?.name)

        } catch (error) {

        }
    }

    const getPostsByCategory = async () => {
        try {
            setShow(true)
            const response = await axios.get(`${BASEURL}/posts/${category}`)
            setPostsList(response?.data)

        } catch (error) {

        } finally {
            setShow(false)
        }
    }

    useEffect(() => {
        getAllCategories()
        return () => { }
    }, [])


    useEffect(() => {

        getPostsByCategory()
        setpagTitle(categories.find(x => x?.code === category)?.name)

        return () => {

        }
    }, [category])
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 300);


        // if (!pagTitle) {
        //     navigate("/");
        // }


        getPostsByCategory()

        return () => {

        }
    }, [pagTitle])

    return (
        <>
            {show && <Loader />}
            <main>
                <section className="pt-34 pb-17.5">
                    <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                        <div className="text-center mb-15">
                            <h1 className="font-bold text-heading-6 sm:text-heading-4 lg:text-heading-3 text-dark mb-3.5">
                                {pagTitle}
                            </h1>
                            <p>{postsList.length} Posts</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-7.5">

                            {postsList.map((post) => (

                                <div key={post.id} className="group">
                                    <div className="mb-6 overflow-hidden rounded-[10px] transition-all group-hover:scale-105">
                                        <Link to={`/blog/${post?.id}`}>
                                            <img src={`${BASEURL}${post.image}`} alt="image" className="w-full" />
                                        </Link>
                                    </div>
                                    <h3>
                                        <Link to={`/blog/${post?.id}`} className="block text-dark font-bold text-xl mb-3.5">
                                            <span className="bg-gradient-to-r from-primary/50 to-primary/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                                                {post.title}
                                            </span>
                                        </Link>
                                    </h3>
                                    <p>Lorem Ipsum is simply dummy text of the print and typesetting industry...</p>
                                    <div className="flex flex-wrap gap-3 items-center justify-between mt-4.5">
                                        <div className="flex items-center gap-2.5">
                                            <a href="author.html" className="flex items-center gap-3">
                                                <div className="flex w-6 h-6 rounded-full overflow-hidden">
                                                    <img src={User1} alt="user" />
                                                </div>
                                                <p className="text-sm">{post.author}</p>
                                            </a>
                                            <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                            <p className="text-sm">{formatDateString(post.date)}</p>
                                        </div>
                                        <Link to={`/category/${post.category}`} className="inline-flex text-blue bg-blue/[0.08] font-medium text-sm py-1 px-3 rounded-full">
                                            {returnPath(post.category)}
                                        </Link>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
            </main>
        </>

    )
}

export default Health