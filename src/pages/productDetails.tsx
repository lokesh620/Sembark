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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                const data = await getSingleProduct(id!);

                setProduct(data);
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
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    if (!product) {
        return <h3 className="text-center mt-5">Product not found</h3>;
    }

    return (
        <div className="container mt-5">
            <button
                className="btn btn-outline-dark mb-4"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>
            <div className="row">

                {/* Images */}
                <div className="col-md-6">
                    <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="img-fluid rounded border"
                    />

                    {/* Thumbnail Images */}
                    <div className="d-flex gap-2 mt-3">
                        {product.images?.map((img: string, index: number) => (
                            <img
                                key={index}
                                src={img}
                                alt="thumbnail"
                                width="80"
                                height="80"
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="col-md-6">

                    <h2>{product.title}</h2>

                    <p className="text-muted">
                        Category: {product.category?.name}
                    </p>

                    <h3 className="text-success mb-3">
                        ${product.price}
                    </h3>

                    <p>{product.description}</p>

                    <button
                        className="btn btn-success btn-lg"
                        onClick={() => addToCart(product)}
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;