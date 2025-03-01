
import {createClient} from "@supabase/supabase-js";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
import {useNavigate} from 'react-router-dom'

const CreatePostPage = () => {
    //Force the user to visit a specific link eg. like how you leave a website and it brings you to the home page
    const navigate = useNavigate()
    const createPost = async (e) => {
        //always stop the default action
        e.preventDefault();
        
    
        //storing in variable for easier access
        const subject = e.target.subject.value;
        const message = e.target.message.value;
    
        //insert into the database
        const response = await supabase.from('post').insert({
          Subject: subject,
          Content: message
        })
    

        if(response.status == 201) {
            navigate('/')
        } else{
            alert("Something went wrong")
        }
      }
      

   
    return(
        <div className="text-center">  
            <form onSubmit={(e) => createPost(e)}>
                <div className="flex flex-col justify-center items-center"> 
                    <h1 className="mt-3">Make a post</h1>
                    <div className="flex flex-col w-[90%] items-center">
                        <input type="text" placeholder="Enter your subject" id="subject" className="flex p-3 m-3 border rounded-lg w-full"></input>
                        
                        <textarea  placeholder="Enter your post message in here" id="message" className="flex p-3 mx-3 border rounded-lg w-full "></textarea>
                        
                        <button type="submit" className="w-full">Create Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePostPage