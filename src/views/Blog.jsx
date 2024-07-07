import React, { useEffect, useLayoutEffect, useState } from 'react'
import BlogSingle from "../assets/images/blog-single-03.png"
import User2 from "../assets/images/user-02.png"
import BlogSmall from "../assets/images/blog-small-01.png"
import BlogSmall2 from "../assets/images/blog-small-02.png"
import BlogSmall3 from "../assets/images/blog-small-03.png"
import { posts, categories } from "../data/data.json"
import { useParams } from 'react-router-dom'
import Loader from '../component/Loader'
//
const Blog = () => {
    const { id } = useParams()
    const [post, setPosts] = useState(posts?.find(x => x?.id === +id))
    const [show, setShow] = useState(true)

    const getBG = (cat) => {
        switch (cat) {
            case "General News": return 'bg-purple/[0.08]'
            case "Entertainment": return 'bg-blue/[0.08]'
            case "Lifestyle/Travel": return 'bg-green/[0.08]'

        }
    }
    useEffect(() => {

        setTimeout(() => {
            setShow(false)
        }, 300);

        return () => {

        }
    }, [])


    return (
        <main>
            {show && <Loader />}

            <section className='pt-34 pb-17.5'>
                <div className='max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0'>
                    <div className='flex flex-wrap gap-7.5'>
                        <div className='xl:max-w-[770px] w-full'>
                            <img src={post?.image} alt="blog" className="w-full mb-10" />
                            <h1 className="font-bold text-2xl sm:text-4xl lg:text-custom-2 text-dark mb-5.5">
                                {post.title}
                            </h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <a href="#" className="flex w-8.5 h-8.5 rounded-full overflow-hidden">
                                    <img src={post?.image} alt="user" />
                                </a>
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <h4 className="text-custom-sm">
                                            <a href="#">{post.author}</a>
                                        </h4>
                                        <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                        <p className="text-custom-sm">{post.date}</p>
                                        <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                        <p className="text-custom-sm">12 min read</p>
                                    </div>
                                    <a href="category.html" className={`inline-flex text-teal-dark ${getBG(post.category)} font-medium text-custom-sm py-1 px-3 rounded-full`}>
                                        {post.category}
                                    </a>
                                </div>
                            </div>
                            <div className="mt-9">

                                {
                                    post.text.map((x, i) => <div> {x?.title ? <h5 className='font-bold'>{x?.title}</h5> : null} <p key={i + 9} className="mb-5 text-body text-justify" style={{ textAlign: "justify" }}>{x.content}</p> </div>)
                                }

                            </div>
                            {/* <div className="rounded-md bg-gray py-9 px-10 my-8">
                                <p className="font-medium italic text-dark text-center">
                                    “As discussed in the introduction post, one of the best things
                                    about Ghost is just how much you can customize so you're not
                                    stuck with yet another something unique.”
                                </p>
                                <a href="#" className="flex items-center justify-center gap-3.5 mt-5">
                                    <div className="flex w-10 h-10 rounded-full overflow-hidden">
                                        <img src={User2} alt="user" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-dark text-custom-sm">
                                            Rayna Kenter
                                        </h4>
                                        <p className="text-custom-xs">Founder @jeeb-box</p>
                                    </div>
                                </a>
                            </div> */}
                        </div>
                        <div className="max-w-[370px] w-full">
                            <div className="flex flex-col gap-10">

                                <div className="max-w-[370px] w-full rounded-[10px] border border-gray-3 p-4 sm:p-7.5 lg:p-10">
                                    <h4 className="font-semibold text-custom-4 text-dark mb-7.5">
                                        Recent Posts
                                    </h4>
                                    <div className="flex flex-col gap-7.5">

                                        <a href="blog-single-3.html" className="group flex gap-6.5">
                                            <div className="max-w-[70px] w-full h-17.5 rounded-full">
                                                <img src={BlogSmall} alt="blog" />
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-sm text-dark duration-200 ease-in mb-1.5 group-hover:text-primary">
                                                    The Most Beautiful Green Field on Earth
                                                </h5>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-custom-xs">Rhiel Madsen</p>
                                                    <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                                    <p className="text-custom-xs">Sep 10, 2025</p>
                                                </div>
                                            </div>
                                        </a>

                                        <a href="blog-single-3.html" className="group flex gap-6.5">
                                            <div className="max-w-[70px] w-full h-17.5 rounded-full">
                                                <img src={BlogSmall2} alt="blog" />
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-sm text-dark duration-200 ease-in mb-1.5 group-hover:text-primary">
                                                    Facts About Business That Will Help You Success
                                                </h5>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-custom-xs">Jordyn Culhne</p>
                                                    <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                                    <p className="text-custom-xs">Mar 12, 2025</p>
                                                </div>
                                            </div>
                                        </a>

                                        <a href="blog-single-3.html" className="group flex gap-6.5">
                                            <div className="max-w-[70px] w-full h-17.5 rounded-full">
                                                <img src={BlogSmall3} alt="blog" />
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-sm text-dark duration-200 ease-in mb-1.5 group-hover:text-primary">
                                                    5 Easy Ways You Can Turn Future Into Success
                                                </h5>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-custom-xs">Ane Madsen</p>
                                                    <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                                    <p className="text-custom-xs">Nov 25, 2025</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>


                                <div className="max-w-[370px] w-full rounded-[10px] border border-gray-3 p-4 sm:p-7.5 lg:p-10">
                                    <h4 className="font-semibold text-custom-4 text-dark mb-8">
                                        Explore Topics
                                    </h4>
                                    <div className="flex flex-col gap-3">

                                        <a href="#" className="group flex items-center justify-between gap-2">
                                            <p className="ease-in duration-200 group-hover:text-dark">
                                                Entertainment
                                            </p>
                                            <span className="flex items-center justify-center max-w-[32px] w-full h-8 rounded-full text-custom-sm border border-gray-3 ease-in duration-200 group-hover:text-white group-hover:bg-dark group-hover:border-dark">
                                                02
                                            </span>
                                        </a>

                                        {/* <a href="#" className="group flex items-center justify-between gap-2">
                                            <p className="ease-in duration-200 group-hover:text-dark">
                                                Culture
                                            </p>
                                            <span className="flex items-center justify-center max-w-[32px] w-full h-8 rounded-full text-custom-sm border border-gray-3 ease-in duration-200 group-hover:text-white group-hover:bg-dark group-hover:border-dark">
                                                05
                                            </span>
                                        </a> */}

                                        {/* <a href="#" className="group flex items-center justify-between gap-2">
                                            <p className="ease-in duration-200 group-hover:text-dark">
                                                Fashion
                                            </p>
                                            <span className="flex items-center justify-center max-w-[32px] w-full h-8 rounded-full text-custom-sm border border-gray-3 ease-in duration-200 group-hover:text-white group-hover:bg-dark group-hover:border-dark">
                                                12
                                            </span>
                                        </a> */}

                                        <a href="#" className="group flex items-center justify-between gap-2">
                                            <p className="ease-in duration-200 group-hover:text-dark">
                                                Travel
                                            </p>
                                            <span className="flex items-center justify-center max-w-[32px] w-full h-8 rounded-full text-custom-sm border border-gray-3 ease-in duration-200 group-hover:text-white group-hover:bg-dark group-hover:border-dark">
                                                30
                                            </span>
                                        </a>

                                        <a href="#" className="group flex items-center justify-between gap-2">
                                            <p className="ease-in duration-200 group-hover:text-dark">
                                                Lifestyle
                                            </p>
                                            <span className="flex items-center justify-center max-w-[32px] w-full h-8 rounded-full text-custom-sm border border-gray-3 ease-in duration-200 group-hover:text-white group-hover:bg-dark group-hover:border-dark">
                                                45
                                            </span>
                                        </a>

                                        <a href="#" className="group flex items-center justify-between gap-2">
                                            <p className="ease-in duration-200 group-hover:text-dark">
                                                Political
                                            </p>
                                            <span className="flex items-center justify-center max-w-[32px] w-full h-8 rounded-full text-custom-sm border border-gray-3 ease-in duration-200 group-hover:text-white group-hover:bg-dark group-hover:border-dark">
                                                23
                                            </span>
                                        </a>

                                        <a href="#" className="group flex items-center justify-between gap-2">
                                            <p className="ease-in duration-200 group-hover:text-dark">
                                                Trending
                                            </p>
                                            <span className="flex items-center justify-center max-w-[32px] w-full h-8 rounded-full text-custom-sm border border-gray-3 ease-in duration-200 group-hover:text-white group-hover:bg-dark group-hover:border-dark">
                                                03
                                            </span>
                                        </a>
                                    </div>
                                </div>


                                <div className="max-w-[370px] w-full rounded-[10px] border border-gray-3 p-4 sm:p-7.5 lg:p-10">
                                    <h4 className="font-semibold text-custom-4 text-dark mb-7.5">
                                        Newsletter
                                    </h4>
                                    <p className="font-medium text-custom-lg mb-5.5">
                                        Join 70,000 subscribers!
                                    </p>
                                    <form>
                                        <input id="email" type="email" name="email" placeholder="Enter your Email" className="rounded-md border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3.5 px-5 outline-none text-center focus:shadow-input focus:ring-2 focus:ring-dark-4/20 focus:border-transparent" />
                                        <button className="font-medium rounded-md text-white bg-dark flex justify-center text-center w-full py-3 px-5 hover:opacity-90 transition-all duration-200 mt-4">
                                            Subscribe Now
                                        </button>
                                    </form>
                                    <p className="text-custom-sm mt-5 text-center">
                                        By signing up, you agree to our
                                        <a href="privacy-policy.html" className="text-dark">Privacy Policy</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Blog