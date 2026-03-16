import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Crud = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        course: "",
        city: ""
    });
    const [editId, setEditId] = useState(null);

    const BASE_URL = 'https://crud-4-l16m.onrender.com/api'

    const resetForm = () => {
        setFormData({
            name: "",
            age: "",
            course: "",
            city: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "age") {
            if (!/^\d*$/.test(value)) return;
        }

        if (name === "age" && value.length > 3) return;

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
        if (!window.confirm("Are you sure you want to delete?")) return;

        axios.delete(`${BASE_URL}/delete/${id}/`)
            .then(() => {
                setPosts(prev => prev.filter(post => post.id !== id))
                toast.success("Student deleted successfully");
                if (editId === id) resetForm();
            })
            .catch((error) => {
                console.log("Error", error);
                toast.error("Failed to delete student.");
            });

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.age || !formData.course || !formData.city) {
            toast.error("All fields are required")
            return;
        }

        if (formData.age !== "" && parseInt(formData.age) > 120) {
            toast.warn("Age cannot be 120");
            return;
        }

        try {
            if (editId) {
                const res = await axios.put(`${BASE_URL}/update/${editId}/`, formData);
                setPosts(prev => prev.map(p => p.id === editId ? res.data : p));
                toast.success("Updated!");
            } else {
                const res = await axios.post(`${BASE_URL}/add/`, formData);
                setPosts(prev => [...prev, res.data]);
                toast.success("Added!");
            }
            setFormData({ name: "", age: "", course: "", city: "" });
            setEditId(null);
        } catch (err) {
            toast.error("Operation failed");
        }
    };

    useEffect(() => {
        axios.get(`${BASE_URL}`)
            .then((response) => {
                setPosts(response.data)
            })
            .catch((error) => {
                console.error("Error", error);
                toast.error("Failed to fetch students");
            });
    }, []);

    return (
        <>
            <div className='text-center'>
                <h2 className='text-4xl m-4'>Student List</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='name' placeholder='Name' value={formData.name} onChange={handleChange} className='border p-2 w-75 m-1' /><br />
                    <input type="number" name='age' placeholder='Age' value={formData.age} onChange={handleChange} inputMode='numeric' onKeyDown={(e) => { if (['E', 'e', '+', '-'].includes(e.key)) { e.preventDefault() }; }} className='border p-2 w-75 m-1' /><br />
                    <input type="text" name='course' placeholder='Course' value={formData.course} onChange={handleChange} className='border p-2 w-75 m-1' /><br />
                    <input type="text" name='city' placeholder='City' value={formData.city} onChange={handleChange} className='border p-2 w-75 m-1' /><br />
                    <button type="submit" className='bg-green-400 text-white px-6 py-2 rounded w-75 cursor-pointer hover:bg-green-500 active:bg-green-600'>
                        {editId ? "Update" : "Save"}
                    </button>
                </form>
                <div className="mt-8 flex justify-center overflow-x-auto">
                    <table className="min-w-full md:table-fixed bg-white shadow-lg rounded-lg overflow-hidden">

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
            </div >
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
};

export default Crud;