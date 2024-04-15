'use client'

import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import { useState } from "react";
import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";

const Page = () => {

    const [categoriesList, setCategoriesList] = useState();

    const [addCategoryIsOpen, setAddCategoryIsOpen] = useState(false);
    const [addProductIsOpen, setAddProductIsOpen] = useState(false);
    const [editCategoryIsOpen, setEditCategoryIsOpen] = useState(false);

    const handleAddCategory = (): void => {
        setAddCategoryIsOpen(true);
    }

    const handleAddProduct = (): void => {
        setAddProductIsOpen(true);
    }

    return (
        <>
            <CommonHeader title='Menu'>
                <CommonHeaderButton text='Categoría' handleClick={handleAddCategory} />
                <CommonHeaderButton text='Producto' handleClick={handleAddProduct} />
            </CommonHeader>
            <EmptyPage handleClick={handleAddCategory} emptyPage="Categorías" />
            <RightBar isOpen={addCategoryIsOpen} setIsOpen={setAddCategoryIsOpen} title='Añadir Categoría'>
                {/* <AddCategoryForm setAddCategoryIsOpen={setAddCategoryIsOpen} /> */}
            </RightBar>
            <RightBar isOpen={addProductIsOpen} setIsOpen={setAddProductIsOpen} title='Añadir Producto'>
                {/* <ProductForm categoriesList={categoriesList} setAddProductIsOpen={setAddProductIsOpen} /> */}
            </RightBar>
            <RightBar isOpen={editCategoryIsOpen} setIsOpen={setEditCategoryIsOpen} title='Editar Categoría'>
                {/* <EditCategoryPanel setAddCategoryIsOpen={setAddCategoryIsOpen} setEditCategoryIsOpen={setEditCategoryIsOpen} categoriesList={categoriesList} /> */}
            </RightBar>
        </>
    );
}

export default Page;