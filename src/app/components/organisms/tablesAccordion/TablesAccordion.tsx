import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"

import styles from "./CategoriesAccordion.module.scss";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

type tablesAccordionProps = {
    tablesList: {
        id: string,
        name: string,
        location: string,
        seats: number,
        available: boolean
    }[],
    setTableDeleteIsOpen: (val: boolean) => void
}

const TablesAccordion = ({ tablesList, setTableDeleteIsOpen }: tablesAccordionProps) => {

    const handleDelete = (): void => {
        setTableDeleteIsOpen(true);
    }

    return (
        <Accordion type="single" collapsible className="w-full flex-column px-1 py-2">
            {tablesList?.map((table) => {
                return (
                    <AccordionItem className={styles.accordionItem} key={table.id} value={table.name}>
                        <AccordionTrigger>
                            {table.name}
                        </AccordionTrigger>
                        <AccordionContent>
                            <p>Ubicacion: {table.location}</p>
                            <p>Asientos: {table.seats}</p>
                            <p>Disponible: {table.available === true ? "Si" : "No"}</p>
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

export default TablesAccordion;
