import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { updateCategory } from '@/services/categories/updateCategory.service';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './UpdateCategoryForm.module.scss';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type updateCategoryFormProps = {
    setUpdateCategoryIsOpen: (val: boolean) => void,
    categorySelected: any,
}

const UpdateCategoryForm = ({ setUpdateCategoryIsOpen, categorySelected }: updateCategoryFormProps) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const [errorsName, setErrorsName] = useState([]);
    const [errorsDescription, setErrorsDescription] = useState([]);

    const { data: session, status, update } = useSession();

    const token = session?.token;

    useEffect(() => {
        if (categorySelected) {
            setName(categorySelected.name || '');
            setDescription(categorySelected.description || '');
        }
    }, [categorySelected]);

    const handleUpdateCategorySubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await updateCategory({ id: categorySelected.id, name, description, token });
            if (res.ok) {
                setName('');
                setDescription('');
                setUpdateCategoryIsOpen(false);
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
    };

    return (
        <form className={styles.form} onSubmit={handleUpdateCategorySubmit} >
            <FormLabel text='Nombre de la Categoría' required />
            <input
                onChange={(e) => { setName(e.target.value); setErrorsName([]); }}
                className={styles.newInput}
                value={name}
                type='text'
                placeholder='Nombre de la Categoría'
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
            <SubmitFormButton text='Actualizar Categoría' />
        </form>
    )
}

export default UpdateCategoryForm;
