import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../services/productService";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string>("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getSingleProduct(id!);
                setProduct(data);
                setActiveImage(data?.images?.[0] ?? "");
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div
                className="text-center mt-5"
                role="status"
                aria-live="polite"
            >
                <div className="spinner-border text-primary" aria-hidden="true"></div>
                <span className="visually-hidden">Loading product</span>
            </div>
        );
    }

    if (!product) {
        return <h1 className="text-center mt-5">Product not found</h1>;
    }

    return (
        <main className="container mt-5 page-fade">
            <button
                type="button"
                className="btn btn-outline-dark mb-4"
                onClick={() => navigate(-1)}
                aria-label="Go back to previous page"
            >
                <span aria-hidden="true">←</span> Back
            </button>

            <article className="row">
                <section className="col-md-6" aria-label="Product images">
                    <img
                        src={activeImage || product.images?.[0]}
                        alt={product.title}
                        className="img-fluid rounded border"
                    />

                    <ul
                        className="d-flex gap-2 mt-3 list-unstyled mb-0"
                        aria-label="Image thumbnails"
                    >
                        {product.images?.map((img: string, index: number) => {
                            const isActive = activeImage === img;
                            return (
                                <li key={index}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveImage(img)}
                                        aria-label={`Show image ${index + 1} of ${product.title}`}
                                        aria-pressed={isActive}
                                        style={{
                                            padding: 0,
                                            border: "none",
                                            background: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            width={80}
                                            height={80}
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                                border: isActive
                                                    ? "2px solid #0d6efd"
                                                    : "2px solid transparent",
                                            }}
                                        />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <section className="col-md-6">
                    <h1>{product.title}</h1>

                    <p className="text-muted">
                        Category: {product.category?.name}
                    </p>

                    <p className="h3 text-success mb-3">
                        ${product.price}
                    </p>

                    <p>{product.description}</p>

                    <button
                        type="button"
                        className="btn btn-success btn-lg"
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.title} to cart`}
                    >
                        Add To Cart
                    </button>
                </section>
            </article>
        </main>
    );
};

export default ProductDetails;
