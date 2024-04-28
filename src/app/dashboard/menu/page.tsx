'use client'

import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";
import AddCategoryForm from "@/app/components/molecules/addCategoryForm/AddCategoryForm";
import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import { useEffect, useState } from "react";
import CategoriesAccordion from "@/app/components/organisms/categoriesAccordion/CategoriesAccordion";
import ProductForm from "@/app/components/molecules/addProductForm/AddProductForm";

const Page = () => {

    const [addCategoryIsOpen, setAddCategoryIsOpen] = useState(false);
    const [addProductIsOpen, setAddProductIsOpen] = useState(false);
    const [editCategoryIsOpen, setEditCategoryIsOpen] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [categoriesList, setCategoriesList] = useState([
        {
            id: "656393458e0bb84c89a01fce",
            name: "Entradas",
            userId: "653c0608195e0930f96230f7",
            createdAt: "2023-11-26T18:49:41.082Z",
            updatedAt: "2023-11-26T18:49:41.082Z"
        },
        {
            id: "656393458e0bb84c89a01fcf",
            name: "Platos Fuertes",
            userId: "653c0608195e0930f96230f7",
            createdAt: "2023-11-26T18:49:41.082Z",
            updatedAt: "2023-11-26T18:49:41.082Z"
        },
        {
            id: "656393458e0bb84c89a01fcg",
            name: "Sopas",
            userId: "653c0608195e0930f96230f7",
            createdAt: "2023-11-26T18:49:41.082Z",
            updatedAt: "2023-11-26T18:49:41.082Z"
        },
    ]);

    //setCategoriesList(categoriesListMock);
    /* useEffect(() => {
        // void fetchCategoriesData();
    }, [addCategoryIsOpen, editCategoryIsOpen, addProductIsOpen, categoriesListMock]);
    */

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
                <CommonHeaderButton text='Producto' handleClick={handleOpenAddProduct} />
            </CommonHeader>
            <EmptyPage handleClick={handleOpenAddCategory} emptyPage="Categorías" hidden={categoriesList.length !== 0} />
            <RightBar isOpen={addCategoryIsOpen} setIsOpen={setAddCategoryIsOpen} title='Añadir Categoría'>
                <AddCategoryForm setAddCategoryIsOpen={setAddCategoryIsOpen} /* Optional Remove later*/ categoriesList={categoriesList} />
            </RightBar>
            <RightBar isOpen={addProductIsOpen} setIsOpen={setAddProductIsOpen} title='Añadir Producto'>
                <ProductForm categoriesList={categoriesList} setAddProductIsOpen={setAddProductIsOpen} />
            </RightBar>
            <RightBar isOpen={editCategoryIsOpen} setIsOpen={setEditCategoryIsOpen} title='Editar Categoría'>
                {/* <EditCategoryPanel setAddCategoryIsOpen={setAddCategoryIsOpen} setEditCategoryIsOpen={setEditCategoryIsOpen} categoriesList={categoriesList} /> */}
            </RightBar>
            <CategoriesAccordion categoriesList={categoriesList} />
        </>
    );
}

export default Page;