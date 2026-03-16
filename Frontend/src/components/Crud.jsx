import axios from 'axios'
import { useEffect, useState } from 'react'

const Crud = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        course: "",
        city: ""
    });
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = (post) => {
        setFormData({
            name: post.name,
            age: post.age,
            course: post.course,
            city: post.city,
        })

        setEditId(post.id)
    };

    const handleDelete = (id) => {
        axios.delete(`https://crud-4-l16m.onrender.com//api/delete/${id}/`)
            .then(() => {
                const filteredPost = posts.filter(post => post.id !== id)
                setPosts(filteredPost)
            })
            .catch((error) => console.log("Error", error))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (editId) {
            axios.put(`https://crud-4-l16m.onrender.com//api/update/${editId}/`, formData)
                .then((response) => {
                    const updatedData = posts.map((post) =>
                        post.id === editId ? response.data : post)

                    setPosts(updatedData);
                    setEditId(null);

                    setFormData({
                        name: "",
                        age: "",
                        course: "",
                        city: ""
                    })
                })
                .catch((error) => console.log("Error", error))
        } else {
            axios.post(`https://crud-4-l16m.onrender.com//api/add/`, formData)
                .then((response) => {
                    alert('Student added successfully')
                    setPosts([...posts, response.data])
                })
                .catch((error) => {
                    console.error("error", error)
                });
            setFormData({
                name: "",
                age: "",
                course: "",
                city: ""
            })
        }
    }

    useEffect(() => {
        axios.get(`https://crud-4-l16m.onrender.com//api/`)
            .then((response) => {
                setPosts(response.data)
            })
            .catch((error) =>
                console.error("Error", error)
            );
    }, [])

    return (
        <>
            <div className='text-center'>
                <h2 className='text-4xl m-4'>Student List</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='name' placeholder='Name' value={formData.name} onChange={handleChange} className='border p-2 w-75 m-1' /><br />
                    <input type="number" name='age' placeholder='Age' value={formData.age} onChange={handleChange} className='border p-2 w-75 m-1' /><br />
                    <input type="text" name='course' placeholder='Course' value={formData.course} onChange={handleChange} className='border p-2 w-75 m-1' /><br />
                    <input type="text" name='city' placeholder='City' value={formData.city} onChange={handleChange} className='border p-2 w-75 m-1' /><br />
                    <button type="submit" className='bg-green-400 text-white px-6 py-2 rounded w-75 cursor-pointer hover:bg-green-500 active:bg-green-600'>
                        {editId ? "Update" : "Save"}
                    </button>
                </form>
                <div className="mt-8 flex justify-center">
                    <table className="min-w-175 bg-white shadow-lg rounded-lg overflow-hidden">

                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-center">Name</th>
                                <th className="py-3 px-4 text-center">Age</th>
                                <th className="py-3 px-4 text-center">Course</th>
                                <th className="py-3 px-4 text-center">City</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b hover:bg-gray-100">

                                    <td className="py-3 px-4">{post.name}</td>
                                    <td className="py-3 px-4">{post.age}</td>
                                    <td className="py-3 px-4">{post.course}</td>
                                    <td className="py-3 px-4">{post.city}</td>

                                    <td className="py-3 px-4 text-center space-x-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition cursor-pointer"
                                            onClick={() => handleEdit(post)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition cursor-pointer"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}

export default Crud