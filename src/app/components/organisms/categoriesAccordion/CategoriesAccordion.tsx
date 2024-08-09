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

type categoriesAccordionProps = {
    categoriesList: {
        id: string,
        name: string,
    }[],
    setCategoryDelete: (category: any) => void,
    setCategoryEdit: (category: any) => void,
}

const CategoriesAccordion = ({ categoriesList, setCategoryDelete, setCategoryEdit }: categoriesAccordionProps) => {

    const { data: session, status, update } = useSession();

    const handleDelete = (category: any): void => {
        setCategoryDelete(category);
        update();
    }

    const handleEdit = (table: any): void => {
        setCategoryEdit(table);
        update();
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
                            Productos categoria {category.name}
                            {/* Grid Products */}
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
