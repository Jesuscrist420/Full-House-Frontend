'use client'

import CategoriesAccordion from "@/app/components/organisms/categoriesAccordion/CategoriesAccordion";
import DeleteCategoryForm from "@/app/components/molecules/deleteCategoryForm/DeleteCategoryForm";
import UpdateCategoryForm from "@/app/components/molecules/updateCategoryForm/updateCategoryForm";
import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";
import AddCategoryForm from "@/app/components/molecules/addCategoryForm/AddCategoryForm";
import ProductForm from "@/app/components/molecules/addProductForm/AddProductForm";
import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import { getCategories } from "@/services/categories/getCategories.service";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getProducts } from "@/services/products/getProducts.service";

const Page = () => {
    
    const [addCategoryIsOpen, setAddCategoryIsOpen] = useState(false);
    const [editCategoryIsOpen, setEditCategoryIsOpen] = useState(false);
    const [deleteCategoryIsOpen, setDeleteCategoryIsOpen] = useState(false);
    
    const [addProductIsOpen, setAddProductIsOpen] = useState(false);
    const [editProductIsOpen, setEditProductIsOpen] = useState(false);
    const [deleteProductIsOpen, setDeleteProductIsOpen] = useState(false);
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [categoriesList, setCategoriesList] = useState();
    const [productsList, setProductsList] = useState();

    const { data: session, status } = useSession();
    const token = session?.token;


    const fetchCategoriesData =  async () => {
        if(status == 'authenticated'){
            const res = await getCategories(token);
            if(res.length !== 0){
                setCategoriesList(res);
                console.log('Response: ', res);
            }
        }
    }

    const fetchProductsData =  async () => {
        if(status == 'authenticated'){
            const res = await getProducts(token);
            if(res.length !== 0){
                setProductsList(res);
                console.log('Response: ', res);
            }
        }
    }

    useEffect(() => {
        void fetchCategoriesData();   
        void fetchProductsData();
    },[session, addProductIsOpen, editCategoryIsOpen, deleteCategoryIsOpen, editProductIsOpen, deleteProductIsOpen]);


    const handleOpenAddCategory = (): void => {
        setAddCategoryIsOpen(true);
    }
    
    const handleOpenEditCategory = (category: any): void => {
        setSelectedCategory(category);
        setEditCategoryIsOpen(true);
    }

    const handleDeleteCategory = (category: any): void => {
        setSelectedCategory(category);
        setDeleteCategoryIsOpen(true);
    }

    const handleOpenAddProduct = (): void => {
        setAddProductIsOpen(true);
    }


    return (
        <>
            <CommonHeader title='Menu'>
                <CommonHeaderButton text='Categoría' handleClick={handleOpenAddCategory} />
                <CommonHeaderButton text='Plato' handleClick={handleOpenAddProduct} />
            </CommonHeader>
            <EmptyPage handleClick={handleOpenAddCategory} emptyPage="Categorías" hidden={categoriesList ? true : false} />
            
            <RightBar isOpen={addCategoryIsOpen} setIsOpen={setAddCategoryIsOpen} title='Añadir Categoría'>
                <AddCategoryForm setAddCategoryIsOpen={setAddCategoryIsOpen} />
            </RightBar>

            <RightBar isOpen={addProductIsOpen} setIsOpen={setAddProductIsOpen} title='Añadir Plato'>
                <ProductForm categoriesList={categoriesList} setAddProductIsOpen={setAddProductIsOpen} />
            </RightBar>

            <RightBar isOpen={editCategoryIsOpen} setIsOpen={setEditCategoryIsOpen} title='Editar Categoría'>
                <UpdateCategoryForm setUpdateCategoryIsOpen={setEditCategoryIsOpen} categorySelected={selectedCategory}/>
            </RightBar>
            <RightBar isOpen={deleteCategoryIsOpen} setIsOpen={setDeleteCategoryIsOpen} title='Eliminar Categoría'>
                <DeleteCategoryForm setDeleteCategoryIsOpen={setDeleteCategoryIsOpen} categorySelected={selectedCategory} />
            </RightBar>

            <RightBar isOpen={editProductIsOpen} setIsOpen={setEditProductIsOpen} title='Editar Categoría'>
                {/* <UpdateProductForm setUpdateProductIsOpen={setEditProductIsOpen} productSelected={selectedProduct}/> */}
            </RightBar>
            <RightBar isOpen={deleteProductIsOpen} setIsOpen={setDeleteProductIsOpen} title='Eliminar Categoría'>
                {/* <DeleteProductForm setDeleteProductIsOpen={setDeleteProductIsOpen} productSelected={selectedProduct} /> */} 
            </RightBar>

            <CategoriesAccordion
                setCategoryEdit={handleOpenEditCategory} 
                setCategoryDelete={handleDeleteCategory}
                categoriesList={categoriesList ? categoriesList : []} 
                productsList={productsList ? productsList : []}
            />
        </>
    );
}

export default Page;