'use client'

import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";
import AddCategoryForm from "@/app/components/molecules/addCategoryForm/AddCategoryForm";
import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import { useEffect, useState } from "react";
import CategoriesAccordion from "@/app/components/organisms/categoriesAccordion/CategoriesAccordion";
import ProductForm from "@/app/components/molecules/addProductForm/AddProductForm";
import { useSession } from "next-auth/react";
import { getCategories } from "@/services/getCategories.service";

const Page = () => {

    const [addCategoryIsOpen, setAddCategoryIsOpen] = useState(false);
    const [addProductIsOpen, setAddProductIsOpen] = useState(false);
    const [editCategoryIsOpen, setEditCategoryIsOpen] = useState(false);
    const [deleteCategoryIsOpen, setDeleteCategoryIsOpen] = useState(false);

    const [categoriesList, setCategoriesList] = useState([]);
    const { data: session, status } = useSession();
    const token = session?.token;


    const fetchCategoriesData =  async () => {
        if(status == 'authenticated'){
            const res = await getCategories(token);
            setCategoriesList(res);
            console.log('Response: ', res);
        }
    }
    //setCategoriesList(categoriesListMock);
    useEffect(() => {
        void fetchCategoriesData();   
    });


    const handleOpenAddCategory = (): void => {
        setAddCategoryIsOpen(true);
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
            <EmptyPage handleClick={handleOpenAddCategory} emptyPage="Categorías" hidden={categoriesList.length !== 0} />
            <RightBar isOpen={addCategoryIsOpen} setIsOpen={setAddCategoryIsOpen} title='Añadir Categoría'>
                <AddCategoryForm setAddCategoryIsOpen={setAddCategoryIsOpen} />
            </RightBar>
            <RightBar isOpen={addProductIsOpen} setIsOpen={setAddProductIsOpen} title='Añadir Plato'>
                <ProductForm categoriesList={categoriesList} setAddProductIsOpen={setAddProductIsOpen} />
            </RightBar>
            <RightBar isOpen={editCategoryIsOpen} setIsOpen={setEditCategoryIsOpen} title='Editar Categoría'>
                {/* <EditCategoryPanel setAddCategoryIsOpen={setAddCategoryIsOpen} setEditCategoryIsOpen={setEditCategoryIsOpen} categoriesList={categoriesList} /> */}
            </RightBar>
            <RightBar isOpen={deleteCategoryIsOpen} setIsOpen={setDeleteCategoryIsOpen} title='Eliminar Categoría'>
                {/* <DeleteCategoryPanel setAddCategoryIsOpen={setAddCategoryIsOpen} setEditCategoryIsOpen={setEditCategoryIsOpen} categoriesList={categoriesList} /> */}
            </RightBar>
            <CategoriesAccordion setCategoryDeleteIsOpen={setDeleteCategoryIsOpen} categoriesList={categoriesList} />
        </>
    );
}

export default Page;