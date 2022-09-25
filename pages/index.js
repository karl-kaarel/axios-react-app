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

  return (<>
  <div className='container'>
    <h2>Meil on {posts.length} postitust</h2>
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
            <td><button class="btn btn-info btn-sm">Update</button></td>
            <td><button class="btn btn-danger btn-sm">Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>);
}
export default Home;