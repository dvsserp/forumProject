
/* 
  1. user can make posts
  2. user can make comments under posts
  3. user can like to post
  4. user can share post -> posts gets their detail page
  5. user can search post
*/

/*
  1. home -> contains all the post
  2. post details -> post + comment
  3. make post page
*/

import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'



const App = () => {

  const [posts, setPosts] = useState([])

  const [upvoteAscending, setUpvoteAscending] = useState(false);

  const sortPostByUpvote = (unsortedPosts) => {
    const sortedPosts = unsortedPosts

    sortedPosts.sort((postA, postB) => {
      if (postA.upvotes > postB.upvotes) {
        return upvoteAscending ? 1 : -1;
      }
      else {
        return upvoteAscending ? -1 : 1;
      }
    })

    setPosts(sortedPosts);
  }


  const getPosts = async () => {
    const response = await supabase.from('post').select();
    sortPostByUpvote(response.data);
  }
  //useEffect displays when refreshed or as soon as user enters the website
  useEffect(() => {  
    getPosts();
  },[])

  const deletePost = async (id) => {
    const response = await supabase.from('post').delete().eq('id', id)
    console.log(response)

    //refresh posts -> refetch or just delete locally
    if(response.status == 204) {
      alert("This post was deleted successfully")
      getPosts()
    }
  }

  const upvotePost = async (post) => {
    const response = await supabase.from('post')
      .update({upvotes : post.upvotes + 1})
      .eq('id', post.id);
    console.log(response)
    if(response.status == 204) {
      alert("This post was upvoted successfully")
      getPosts()
    }
  }

  const downvotePost = async (post) => {
    const response = await supabase.from('post')
      .update({upvotes : post.upvotes - 1})
      .eq("id", post.id)
    if (response.status == 204) {
      alert("This post was downvoted successfully")
      getPosts()
    }

  }


  return (
    <div>
      <h1 className="text-center mt-3 underline">Forum Page</h1>

      
        <Link to='/create' className="fixed bottom-5 right-5">
          <FontAwesomeIcon icon = {faSquarePlus} className="text-6xl"/>
        </Link>
         
      <button onClick={() => {
        setUpvoteAscending(!upvoteAscending)
        sortPostByUpvote(posts);
      }} className="flex justify-self-end m-3">
        Sort by Upvotes {upvoteAscending ? 'v' : '^'}
      </button>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          return(
            <div key={post.id} className = "border shadow-sm shadow-amber-50 m-3 p-3 rounded-lg flex justify-between ">
              <div>
                <h2 className="text-3xl">{post.Subject}</h2>
                <p className="my-3">{post.Content}</p>
                <div className="flex items-center">
                  <FontAwesomeIcon icon = {faArrowUp} onClick={() => upvotePost(post)} className = "px-2 hover:cursor-pointer"/>
                  <p>{post.upvotes}</p>
                  <FontAwesomeIcon icon = {faArrowDown} onClick={() => downvotePost(post)} className = "px-2 hover:cursor-pointer"/>
                </div>
              </div>
              <FontAwesomeIcon icon = {faTrashCan} onClick={() => deletePost(post.id)} className = "text-3xl p-3 hover:cursor-pointer place-self-center"/>
            </div>
        )})}
    </div>

    </div>
  )
}

export default App