// import React, { useState } from 'react';
// import '../styles/AddProduct.css';

// const AddProduct = () => {
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch('api/products', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, price, description }),
//         });
//         if (response.ok) {
//             alert('Product added successfully');
//         }
//     };

//     return (
//         <form className="add-product-form" onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Product Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//             <input
//                 type="number"
//                 placeholder="Price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 required
//             />
//             <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//             />
//             <button type="submit">Add Product</button>
//         </form>
//     );
// };

// export default AddProduct;

// import React, { useState } from 'react';
// import '../styles/AddProduct.css';

// const AddProduct = () => {
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/api/products', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name, price, description }),
//             });

//             if (response.ok) {
//                 alert('Product added successfully');
//                 setName('');
//                 setPrice('');
//                 setDescription('');
//             } else {
//                 const errorData = await response.json();
//                 alert(`Error: ${errorData.message || 'Failed to add product'}`);
//             }
//         } catch (error) {
//             console.error('Error while adding product:', error);
//             alert('An error occurred. Please try again later.');
//         }
//     };

//     return (
//         <form className="add-product-form" onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Product Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//             <input
//                 type="number"
//                 placeholder="Price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 required
//             />
//             <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//             />
//             <button type="submit">Add Product</button>
//         </form>
//     );
// };

// export default AddProduct;


import React, { useState } from 'react';
import '../styles/AddProduct.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // Store base64 string
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price, description, image }),
            });

            if (response.ok) {
                alert('Product added successfully');
                setName('');
                setPrice('');
                setDescription('');
                setImage(null);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to add product'}`);
            }
        } catch (error) {
            console.error('Error while adding product:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
