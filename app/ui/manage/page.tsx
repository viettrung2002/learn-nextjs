"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu sản phẩm
interface Product {
    id: number;
    name: string;
    brand: string;
    description: string;
    image: string;
    price: number;
    category_id: number;
}

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [editId, setEditId] = useState<number | null>(null);

  // API URL
    const API_URL = "http://127.0.0.1:5000"; 

  
    useEffect(() => {
        fetch(`${API_URL}/products`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Lỗi khi gọi API:", error));
        
    },  []);

  
  const handleSubmit = async () => {

    if (editId) {
      
      await fetch(`${API_URL}/product/update/${editId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name,brand,description,image, price: parseFloat(price), category_id:parseFloat(categoryId) }),
      });
      setEditId(null);
      
    } else {
      
      await fetch(`${API_URL}/product-management/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name,brand,description,image, price : parseFloat(price) , category_id:  parseFloat(categoryId) }),
      });
    }

    
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));

    setName("");
    setBrand("");
    setCategoryId("");
    setDescription("");
    setImage("");
    setPrice("");
  };

  
  const deleteProduct = async (id: number) => {
    await fetch(`${API_URL}/product/delete/${id}`, { method: "DELETE" });

    
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Quản lý Sản phẩm</h1>

      
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Thương hiệu"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Hình ảnh"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Loại sản phẩm"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Cập nhật" : "Thêm"}
        </button>
      </div>

      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên sản phẩm</th>
            <th className="border p-2">Thương hiệu</th>
            <th className="border p-2">Mô tả</th>
            <th className="border p-2">Hình ảnh</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Loại sản phẩm</th>

            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.brand}</td>
              <td className="border p-2">{product.description}</td>
              <td>
                <Image src={product.image} alt={product.name} width={160} height={160}/>
              </td>
              
              
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">${product.category_id}</td>
              <td className="border p-2">
                <button
                  className="text-yellow-500 mr-2"
                  onClick={() => {
                    setName(product.name);
                    setBrand(product.brand);
                    setDescription(product.description)
                    setImage(product.image)
                    setPrice(product.price.toString());
                    setCategoryId(product.category_id.toString())
                    setEditId(product.id);

                  }}
                >
                  ✏ Sửa
                </button>
                <button
                  className="text-red-500"
                  onClick={() => deleteProduct(product.id)}
                >
                  🗑 Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
