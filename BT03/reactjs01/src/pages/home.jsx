import { useEffect, useState,useRef  } from "react";
import {
    getProductsApi,
    getBestSellerApi,
    getMostViewedApi,
} from "../util/api";
import style from "../styles/card.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [category, setCategory] = useState("");

    const [sort, setSort] = useState("");
    const [isSale, setIsSale] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] =
        useState(1);
    const [bestSellerProducts,
        setBestSellerProducts] = useState([]);

    const [mostViewedProducts,
        setMostViewedProducts] = useState([]);
    const sliderRef = useRef(null);

    
    // CATEGORY LIST
    const categories = [
        ...new Set(
            products
                .map((item) => item.category)
                .filter(Boolean)
        ),
    ];

    const fetchProducts = async () => {

        const res = await getProductsApi({
            keyword,
            page,
            limit: 8,
            category,
            isSale,
        });

        if (res.success) {

            let temp = [...res.products];

            // SORT FRONTEND
            if (sort === "price_asc") {
                temp.sort(
                    (a, b) => a.price - b.price
                );
            }

            if (sort === "price_desc") {
                temp.sort(
                    (a, b) => b.price - a.price
                );
            }

            setProducts(temp);

            setTotalPages(res.totalPages);
        }
    };
    const fetchBestSellerProducts =
        async () => {

            const res =
                await getBestSellerApi();

            if (res.success) {
                setBestSellerProducts(
                    res.products
                );
            }
        };

    const fetchMostViewedProducts =
        async () => {

            const res =
                await getMostViewedApi();

            if (res.success) {
                setMostViewedProducts(
                    res.products
                );
            }
        };

    useEffect(() => {

        const delay = setTimeout(() => {
            fetchProducts();
            fetchBestSellerProducts();

            fetchMostViewedProducts();
        }, 300);

        return () => clearTimeout(delay);

    }, [keyword, category, sort, page, isSale]);
    useEffect(() => {
  const interval = setInterval(() => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = 270; // width card ~250 + gap

    // nếu tới cuối thì quay lại đầu
    if (
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth
    ) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, 2000);

  return () => clearInterval(interval);
}, []);

    return (
        <div className="max-w-7xl mx-auto space-y-8">

            <div space-x-4>

                <input
                    type="text"
                    placeholder="   Tìm kiếm sản phẩm..."
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                        setPage(1);
                    }}
                    className="w-full md:w-1/3 border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                />


                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                    className="border px-4 py-3 rounded-xl"
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
                    value={isSale}
                    onChange={(e) => {
                        setIsSale(e.target.value);
                        setPage(1);
                    }}
                    className="border px-4 py-3 rounded-xl"
                >
                    <option value="">
                        Khuyến mãi
                    </option>

                    <option value="true">
                        Đang giảm giá
                    </option>

                    <option value="false">
                        Không giảm giá
                    </option>
                </select>

                <select
                    value={sort}
                    onChange={(e) =>
                        setSort(e.target.value)
                    }
                    className="border px-4 py-3 rounded-xl"
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
            <div className="space-y-4">

                <h2 className="text-2xl font-bold shimmer-text">
                    🔥 Sản phẩm bán chạy
                </h2>

                <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
                ref={sliderRef} >

                    {bestSellerProducts.map((item) => (

                        <div
                            key={item._id}
                            onClick={() =>
                                navigate(`/product/${item._id}`)
                            }
                            className="snap-start min-w-[250px] bg-white rounded-2xl overflow-hidden shadow-md"
                        >

                            <img
                                src={item.images[0]}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-4">

                                <h2 className="font-semibold line-clamp-1">
                                    {item.name}
                                </h2>

                                <p className={style.rainbowText}>
                                    {item.price.toLocaleString()}đ
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    Đã bán: {item.sold}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
            <div className="space-y-4">

                <h2 className="text-2xl font-bold shimmer-blue">
                    👀 Xem nhiều nhất
                </h2>

                <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
                ref={sliderRef}>

                    {mostViewedProducts.map((item) => (

                        <div
                            key={item._id}
                            onClick={() =>
                                navigate(`/product/${item._id}`)
                            }
                            className="snap-start min-w-[250px] bg-white rounded-2xl overflow-hidden shadow-md"
                        >

                            <img
                                src={item.images[0]}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-4">

                                <h2 className="font-semibold line-clamp-1">
                                    {item.name}
                                </h2>

                                <p className={style.rainbowText}>
                                    {item.price.toLocaleString()}đ
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    Lượt xem: {item.views}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
            <div className="pt-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {products.map((item) => (
                        <div
                            key={item._id}
                            className="relative bg-white overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                        >
                            {item.isSale && (
                                <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-br-lg">
                                    Khuyến mãi
                                </div>
                            )}
                            <img
                                src={item.images[0]}
                                alt=""
                                className="block w-full h-56 object-cover"
                            />

                            <div className="p-6">

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

                <div className="flex justify-center items-center gap-6 mt-12">

                    <button
                        disabled={page === 1}
                        onClick={() =>
                            setPage(page - 1)
                        }
                        className="px-8 py-3 bg-black text-white rounded-lg disabled:opacity-50 hover:bg-gray-800 transition"
                    >
                        Prev
                    </button>

                    <span className="font-semibold text-lg">
                        {page} / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() =>
                            setPage(page + 1)
                        }
                        className="px-8 py-3 bg-black text-white rounded-lg disabled:opacity-50 hover:bg-gray-800 transition"
                    >
                        Next
                    </button>

                </div>
            </div>
        </div>
    );
};

export default HomePage;