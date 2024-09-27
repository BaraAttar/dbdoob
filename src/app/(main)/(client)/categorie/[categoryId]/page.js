"use client"
import { useParams } from "next/navigation";
import Products from "@/app/(main)/components/Products";


// imprted in "(main)/components/Categories"
export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId;

  return (
    <div>
      <Products categoryId={categoryId} />
    </div>
  );
}
