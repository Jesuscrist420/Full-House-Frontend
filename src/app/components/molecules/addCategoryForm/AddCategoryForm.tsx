import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { createCategory } from '@/services/createCategory.service';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './AddCategoryForm.module.scss';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

type addCategoryFormProps = {
    setAddCategoryIsOpen: (val: boolean) => void,
    isEdit?: boolean,
    categorySelected?: any,
}

const AddCategoryForm = ({ setAddCategoryIsOpen, isEdit= false, categorySelected }: addCategoryFormProps) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorsName, setErrorsName] = useState([]);
    const [errorsDescription, setErrorsDescription] = useState([]);

    const { data: session, status, update } = useSession();

    const token = session?.token;

    const handleAddCategorySubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await createCategory({ name, description, token });
            if (res.ok) {
                setName('');
                setDescription('');
                setAddCategoryIsOpen(false);
                setErrorsName([]);
                setErrorsDescription([]);
                update();
            } else {
                if (res.errors) {
                    if (res.errors.name) {
                        setErrorsName(res.errors.name);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
        let data;
    };

    return (
        <form className={styles.form} onSubmit={handleAddCategorySubmit} >
            <FormLabel text='Nombre de la categoría' required />
            <input
                onChange={(e) => { setName(e.target.value); setErrorsName([]);}}
                className={styles.newInput}
                value={name}
                type='text'
                placeholder='Nombre de la nueva categoría'
                required
            />
            {errorsName?.map((errorName) => {
                return (
                    <p key={errorName} className={styles.error}>{errorName}</p>
                )
            })}
            <FormLabel text='Descripción' required />
            <textarea
                onChange={(e) => { setDescription(e.target.value); setErrorsDescription([]); }}
                value={description}
                className={styles.newTextArea}
                placeholder={categorySelected?.description !== undefined ? categorySelected?.description : 'Describe tu categoría.'}
                required
            />
            {errorsDescription?.map((errorDescription) => {
                return (
                    <p key={errorDescription} className={styles.error}>{errorDescription}</p>
                )
            })}
            <SubmitFormButton text='Crear Categoría' />
        </form>
    )
}

export default AddCategoryForm;