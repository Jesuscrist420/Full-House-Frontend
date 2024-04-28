import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"

import styles from "./CategoriesAccordion.module.scss";

type categoriesAccordionProps = {
    categoriesList: {
        id: string,
        name: string,
    }[],
}

const CategoriesAccordion = ({ categoriesList }: categoriesAccordionProps) => {
    return (
        <Accordion type="single" collapsible className="w-full flex-column px-1 py-2">
            {categoriesList?.map((category) => {
                return (
                    <AccordionItem className={styles.accordionItem} key={category.id} value={category.name}>
                        <AccordionTrigger>{category.name}</AccordionTrigger>
                        <AccordionContent>
                            Productos categoria {category.name}
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

export default CategoriesAccordion;
