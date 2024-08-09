import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"

import styles from "./CategoriesAccordion.module.scss";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import ProductsAccordion from "../productsAccordion/ProductsAccordion";
import { useState } from "react";

type categoriesAccordionProps = {
    categoriesList: {
        id: number,
        name: string,
        description: string,
    }[],
    productsList: {
        id: number,
        category_id: number,
        description: string,
        in_stock: boolean,
        name: string,
        preparation_time: number,
        price: number
    }[],
    setCategoryDelete: (category: any) => void,
    setCategoryEdit: (category: any) => void,
    setEditProductIsOpen: (val:boolean) => void,
    setDeleteProductIsOpen: (val:boolean) => void,
    setSelectedProduct: (product: any) => void,
}

const CategoriesAccordion = ({ categoriesList, productsList, setCategoryDelete, setCategoryEdit, setEditProductIsOpen, setDeleteProductIsOpen, setSelectedProduct}: categoriesAccordionProps) => {

    const { data: session, status, update } = useSession();

    const handleDelete = (category: any): void => {
        setCategoryDelete(category);
        update();
    }

    const handleEdit = (table: any): void => {
        setCategoryEdit(table);
        update();
    }

    const handleOpenEditProduct = (product: any): void => {
        setSelectedProduct(product);
        setEditProductIsOpen(true);
    }

    const handleDeleteProduct = (product: any): void => {
        setSelectedProduct(product);
        setDeleteProductIsOpen(true);
    }

    return (
        <Accordion type="single" collapsible className="w-full flex-column px-1 py-2">
            {categoriesList?.map((category) => {
                return (
                    <AccordionItem className={styles.accordionItem} key={category.id} value={category.name}>
                        <AccordionTrigger>
                            {category.name}
                        </AccordionTrigger>
                        <AccordionContent>
                            {category.description}
                            <ProductsAccordion 
                                setProductEdit={handleOpenEditProduct} 
                                setProductDelete={handleDeleteProduct} 
                                productsList={productsList ? productsList : []}
                                categoryId={category.id}
                            />
                            <div className={styles.buttonsContainer}>
                                <button onClick={() => handleEdit(category)} className={styles.editButton}><FaPencilAlt />Editar</button>
                                <button onClick={() => handleDelete(category)} className={styles.deleteButton}><MdDelete />Eliminar</button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

export default CategoriesAccordion;
