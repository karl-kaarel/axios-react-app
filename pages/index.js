import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(()=>{
    const getPosts = async () =>{
      const {data: res} = await axios.get(apiEndPoint);
      setPosts(res);
    };
    getPosts();
  },[]);

  const addPost = async () =>{
    const post = {title:'tegime uue postituse', body:'new'};
    await axios.post(apiEndPoint, post);
    setPosts([post, ...posts]);
  };

  const handleUpdate = async post =>{
    post.title = 'Uuendatud postitus';
    await axios.put(apiEndPoint + '/' + post.id);
    const postsClone = [...posts];
    const index = postsClone.indexOf(post);
    postsClone[index] = {...post};
    setPosts(postsClone);
  };

  const handleDelete = async post =>{
    await axios.delete(apiEndPoint + '/' + post.id + post);
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (<>
  <div className='container'>
    <h2>Meil on {posts.length} postitust</h2>
    <button onClick={addPost} className="btn btn-primary">Lisa postitus</button>
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Updates</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post =>
          <tr key={post.id}>
            <td>{post.title}</td>
            <td><button onClick={()=> handleUpdate(post)} className="btn btn-info btn-sm">Uuenda</button></td>
            <td><button onClick={()=> handleDelete(post)} className="btn btn-danger btn-sm">Kustuta</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>);
}
export default Home;