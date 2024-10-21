"use client"
import Products from "@/app/components/Products";
import { useParams } from "next/navigation";


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
