import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"

import styles from "./CategoriesAccordion.module.scss";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

type categoriesAccordionProps = {
    categoriesList: {
        id: string,
        name: string,
    }[],
    setCategoryDeleteIsOpen: (val: boolean) => void
}

const CategoriesAccordion = ({ categoriesList, setCategoryDeleteIsOpen }: categoriesAccordionProps) => {

    const handleDelete = (): void => {
        setCategoryDeleteIsOpen(true);
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
                            <div className={styles.buttonsContainer}>
                                <button className={styles.editButton}><FaPencilAlt />Editar</button>
                                <button onClick={handleDelete} className={styles.deleteButton}><MdDelete />Eliminar</button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

export default CategoriesAccordion;
