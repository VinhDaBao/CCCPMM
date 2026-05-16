import { useEffect, useState } from "react";
import { getProductsApi } from "../util/api";
import style from "../styles/card.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const [category, setCategory] = useState("");

    const [sort, setSort] = useState("");
    const categories = [
    ...new Set(
        products.map((item) => item.category)
    ),
];
    // FETCH PRODUCTS
    const fetchProducts = async (search = "") => {
        const res = await getProductsApi(search);

        if (res.success) {
            setProducts(res.products);
            setFilteredProducts(res.products);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchProducts(keyword);
        }, 300);

        return () => clearTimeout(delay);
    }, [keyword]);

    useEffect(() => {
        let temp = [...products];

        if (category) {
            temp = temp.filter(
                (item) => item.category === category
            );
        }

        if (sort === "price_asc") {
            temp.sort((a, b) => a.price - b.price);
        }

        if (sort === "price_desc") {
            temp.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(temp);

    }, [products, category, sort]);

    return (
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-8">

            <div className="flex flex-wrap gap-4">

                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full md:w-1/3 border px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                />

                <select
    value={category}
    onChange={(e) =>
        setCategory(e.target.value)
    }
    className="border px-4 py-2 rounded-xl"
>
    <option value="">
        Tất cả danh mục
    </option>

    {categories.map((cate) => (
        <option
            key={cate}
            value={cate}
        >
            {cate}
        </option>
    ))}
</select>

                <select
                    value={sort}
                    onChange={(e) =>
                        setSort(e.target.value)
                    }
                    className="border px-4 py-2 rounded-xl"
                >
                    <option value="">
                        Sắp xếp
                    </option>

                    <option value="price_asc">
                        Giá tăng dần
                    </option>

                    <option value="price_desc">
                        Giá giảm dần
                    </option>
                </select>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {filteredProducts.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={item.images[0]}
                            alt=""
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-lg font-semibold line-clamp-1">
                                {item.name}
                            </h2>

                            <p className={style.rainbowText}>
                                {item.price.toLocaleString()}đ
                            </p>

                            <button
                                className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                                onClick={() =>
                                    navigate(`/product/${item._id}`)
                                }
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default HomePage;