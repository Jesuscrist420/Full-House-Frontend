import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"

import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import styles from "./ProductsAccordion.module.scss";
import EmptyPage from "../../atoms/emptyPage/EmptyPage";

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
    handleOpenAddProduct: () => void,
    categoryName: string,
}

const ProductsAccordion = ({ productsList, setProductDelete, setProductEdit, handleOpenAddProduct, categoryName }: productsAccordionProps) => {

    const { data: session, status, update } = useSession();

    let currency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const handleDelete = (product: any): void => {
        setProductDelete(product);
        update();
    }

    const handleEdit = (product: any): void => {
        setProductEdit(product);
        update();
    }

    return (
        <Accordion type="single" collapsible className="w-full flex-column px-1 py-2">
            <EmptyPage handleClick={handleOpenAddProduct} emptyPage={categoryName} hidden={productsList.length === 0 ? false : true} primary={false}/>
            {productsList?.map((product) => {
                return (
                    <AccordionItem className={styles.accordionItem} key={product.id} value={product.name}>
                        <AccordionTrigger className={styles.trigger}>
                            <div className={styles.infoContainer}>
                                {product.name}
                                <p className="text-custom2">{currency.format(product.price).replace('US$', '$')}</p>
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
                )
            })}
        </Accordion>
    )
}

export default ProductsAccordion;
