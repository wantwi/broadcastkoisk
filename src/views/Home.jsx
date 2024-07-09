import React, { useEffect, useState } from 'react'
import Africanfood from "../assets/images/fuel-price.jpg"
import Hero from "../assets/images/hero-bg.svg"
import User1 from "../assets/images/user-01.png"
import Solar from "../assets/images/solar.jpg"
import Will from "../assets/images/willi.jpg"
import Blog1 from "../assets/images/blog-01.png"
import Blog2 from "../assets/images/blog-02.png"
import Blog3 from "../assets/images/blog-03.png"
import Blog4 from "../assets/images/blog-04.png"
import Blog6 from "../assets/images/blog-06.png"
import Blog5 from "../assets/images/blog-05.png"
import { Link } from 'react-router-dom'
// import { categories } from "../data/data.json"
import Loader from '../component/Loader'
import axios from 'axios'
import { formatDateString, getBG } from './Blog'
import { BASEURL } from '../App'

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [hoverCover, sethoverCover] = useState({})
    const [hoverCover2, sethoverCover2] = useState(posts?.find(x => x?.level === 2))
    const [hoverCover3, sethoverCover3] = useState(posts?.find(x => x?.level === 2))

    const [show, setShow] = useState(true)

    const returnName = (category) => categories.find(x => x?.code === category)?.name

    const getAllPost = async () => {
        try {
            const response = await axios.get(`${BASEURL}/posts`)
            // console.log({ response })
            setPosts(response?.data)
            sethoverCover(response?.data?.find(x => x?.level === 1))
            sethoverCover3(response?.data?.find(x => x?.level === 3))
            sethoverCover2(response?.data?.find(x => x?.level === 2))
            setShow(false)
        } catch (error) {

        }
    }

    const getAllCategories = async () => {
        try {
            const response = await axios.get(`${BASEURL}/categories`)
            // console.log({ response })
            setCategories([{ id: 0, code: "all", name: "All" }, ...response?.data])
            setShow(false)
        } catch (error) {

        }
    }


    useEffect(() => {
        getAllCategories()
        getAllPost()
        return () => { }
    }, [])

    // console.log({ hoverCover: BASEURL });


    const getPostsToDisplay = () => {
        if (selectedCategory === "all") {
            return posts
        }
        return posts.filter((post) => post.category === selectedCategory);
    };

    const renderButtons = () =>
        categories.map((category) => (
            <button
                key={category?.code}
                className={`rounded-full border py-2.5 px-4.5 font-medium hover:bg-dark hover:border-dark hover:text-white ease-in duration-200 ${selectedCategory === category?.code ? "bg-dark border-dark text-white" : "bg-gray border-gray-3 text-dark"
                    }`}
                onClick={() => setSelectedCategory(category?.code)}
            >
                {category?.name}
            </button>
        ));

    // console.log({ hoverCover3, hoverCover2 });
    return (
        <main>
            {show && <Loader />}
            <section id="home" className="rounded-b-[50px] relative overflow-hidden z-10 pb-15 pt-34">
                <div>
                    <div className="absolute bottom-0 left-0 rounded-b-[50px] w-full h-full bg-gray"></div>
                    <div className="hidden lg:block absolute bottom-0 left-0 rounded-b-[50px] w-full h-full">

                        <img src={Hero} alt="hero" />
                    </div>
                </div>
                <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0 relative z-1">
                    <div className="flex flex-wrap gap-x-7.5 gap-y-9">

                        <div className="max-w-[1170px] w-full flex flex-col lg:flex-row lg:items-center gap-7.5 lg:gap-11 bg-white shadow-1 rounded-xl p-4 lg:p-2.5">
                            <div className="lg:max-w-[536px] w-full">
                                <Link to={`/blog/${hoverCover?.id}`}>
                                    <img className="w-full rounded-xl" src={`${BASEURL}${hoverCover?.image}`} alt="hero" />
                                </Link>
                            </div>
                            <div className="lg:max-w-[540px] w-full">
                                <Link to={`/category/${hoverCover?.category}`} className="inline-flex text-purple-dark bg-purple/[0.08] font-medium text-sm py-1 px-3 rounded-full mb-4">{returnName(hoverCover?.category)}</Link>
                                <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4">
                                    <Link to={`/blog/${hoverCover?.id}`}>
                                        {hoverCover?.title}
                                    </Link>
                                </h1>
                                <p className="max-w-[524px]">
                                    {hoverCover?.summary}
                                </p>
                                <div className="flex items-center gap-2.5 mt-5">
                                    <a href="author.html" className="flex items-center gap-3">
                                        <div className="flex w-6 h-6 rounded-full overflow-hidden">
                                            <img src={User1} alt="user" />
                                        </div>
                                        <p className="text-sm">Sarah Boye</p>
                                    </a>
                                    <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                    <p className="text-sm">{formatDateString(hoverCover?.date)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:max-w-[570px] w-full flex flex-col sm:flex-row sm:items-center gap-6 bg-white shadow-1 rounded-xl p-2.5">
                            <div className="lg:max-w-[238px] w-full">
                                <Link to={`/blog/${hoverCover3?.id}`}>
                                    <img className="w-full rounded-xl" src={`${BASEURL}${hoverCover3?.image}`} alt="hero" />
                                </Link>
                            </div>
                            <div className="lg:max-w-[272px] w-full">
                                <Link to={`/category/${hoverCover3?.category}`} className={`inline-flex text-blue ${getBG(hoverCover3?.category)} font-medium text-sm py-1 px-3 rounded-full mb-4`}>{returnName(hoverCover3?.category)}</Link>
                                <h2 className="font-semibold text-custom-lg text-dark mb-3">
                                    <Link to={`/blog/${hoverCover3?.id}`}>
                                        {hoverCover3?.title}
                                    </Link>
                                </h2>
                                <div className="flex items-center gap-2.5">
                                    <p className="text-sm">
                                        <a href="#">By {hoverCover3?.author}</a>
                                    </p>
                                    <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                    <p className="text-sm">{formatDateString(hoverCover3?.date)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:max-w-[570px] w-full flex flex-col sm:flex-row sm:items-center gap-6 bg-white shadow-1 rounded-xl p-2.5">
                            <div className="lg:max-w-[238px] w-full">
                                <Link to={`/blog/${hoverCover2?.id}`}>
                                    <img className="w-full rounded-xl" src={`${BASEURL}${hoverCover2?.image}`} alt="hero" />
                                </Link>
                            </div>
                            <div className="lg:max-w-[272px] w-full">
                                <Link to={`/blog/${hoverCover2?.id}`} className={`inline-flex text-green-dark ${getBG(hoverCover2?.category)} font-medium text-sm py-1 px-3 rounded-full mb-4`}>{returnName(hoverCover2?.category)}</Link>
                                <h2 className="font-semibold text-custom-lg text-dark mb-3">
                                    <Link to={`/blog/${hoverCover2?.id}`}>
                                        {hoverCover2?.title}
                                    </Link>
                                </h2>
                                <div className="flex items-center gap-2.5">
                                    <p className="text-sm">
                                        <a href="#">By {hoverCover2?.author}</a>
                                    </p>
                                    <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                    <p className="text-sm">{formatDateString(hoverCover2?.date)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className='pt-20 lg:pt-25 pb-15'>
                <div className='max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0'>
                    <div className="mb-12.5 text-center">
                        <h2 className="text-dark mb-3.5 text-2xl font-bold sm:text-4xl xl:text-heading-3">
                            Browse by Category
                        </h2>
                        <p>Select a category to see more related content</p>
                    </div>
                    <div>
                        <div className="flex flex-wrap justify-center gap-4 items-center mb-15">
                            {renderButtons()}
                        </div>
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-7.5">
                                {getPostsToDisplay().map((post) => (

                                    <div key={post.id} className="group">
                                        <div className="mb-6 overflow-hidden rounded-[10px] transition-all group-hover:scale-105">
                                            <Link to={`blog/${post?.id}`}>
                                                <img src={`${BASEURL}${post.image}`} alt="image" className="w-full" />
                                            </Link>
                                        </div>
                                        <h3>
                                            <Link to={`blog/${post?.id}`} className="block text-dark font-bold text-xl mb-3.5">
                                                <span className="bg-gradient-to-r from-primary/50 to-primary/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                                                    {post.title}
                                                </span>
                                            </Link>
                                        </h3>
                                        {/* <p>Lorem Ipsum is simply dummy text of the print and typesetting industry...</p> */}
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
                                            <Link to={`/category/${post.category}`} className={`inline-flex text-blue ${getBG(post?.category)} font-medium text-sm py-1 px-3 rounded-full`}>
                                                {returnName(post.category)}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="flex justify-center font-medium text-dark border border-dark rounded-md py-3 px-7.5 hover:bg-dark hover:text-white ease-in duration-200 mx-auto mt-12.5 lg:mt-17.5">
                        Browse all Posts
                    </button>
                </div>
            </section>

        </main>
    )
}

export default Home