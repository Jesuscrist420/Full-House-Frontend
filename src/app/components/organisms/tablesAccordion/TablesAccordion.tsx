import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/organisms/accordion/accordion"

import styles from "./TablesAccordion.module.scss";
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
    setTableDelete: (table: any) => void,
    setTableEdit: (table: any) => void
}

const TablesAccordion = ({ tablesList, setTableDelete, setTableEdit }: tablesAccordionProps) => {

    const handleDelete = (table: any): void => {
        setTableDelete(table);
    }

    const handleEdit = (table: any): void => {
        setTableEdit(table);
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
                                <button className={styles.editButton} onClick={() => handleEdit(table)}><FaPencilAlt />Editar</button>
                                <button onClick={() => handleDelete(table)} className={styles.deleteButton}><MdDelete />Eliminar</button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                )
            })}
        </Accordion>
    )
}

export default TablesAccordion;
