import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"

import styles from "./ProductsAccordion.module.scss";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";

type productsAccordionProps = {
    productsList: {
        id: number,
        category_id: number,
        description: string,
        in_stock: boolean,
        name: string,
        preparation_time: number,
        price: number
    }[],
    setProductDelete: (product: any) => void,
    setProductEdit: (product: any) => void,
    categoryId: number,
}

const ProductsAccordion = ({ productsList, setProductDelete, setProductEdit, categoryId }: productsAccordionProps) => {

    const { data: session, status, update } = useSession();

    const handleDelete = (product: any): void => {
        setProductDelete(product);
        update();
    }

    const handleEdit = (table: any): void => {
        setProductEdit(table);
        update();
    }

    return (
        <Accordion type="single" collapsible className="w-full flex-column px-1 py-2">
            {productsList?.map((product) => {
                return (
                    product.category_id === categoryId ? 
                    <AccordionItem className={styles.accordionItem} key={product.id} value={product.name}>
                        <AccordionTrigger className={styles.trigger}>
                            <div className={styles.infoContainer}>
                                {product.name}
                                <p className="text-custom2">${product.price}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p>{product.description}</p>
                            <p>En stock: {product.in_stock ? 'Si' : 'No'}</p>
                            <p>Tiempo: {product.preparation_time ? product.preparation_time : 0} Mins</p>
                
                            <div className={styles.buttonsContainer}>
                                <button onClick={() => handleEdit(product)} className={styles.editButton}><FaPencilAlt /></button>
                                <button onClick={() => handleDelete(product)} className={styles.deleteButton}><MdDelete /></button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    :
                    null
                )
            })}
        </Accordion>
    )
}

export default ProductsAccordion;
