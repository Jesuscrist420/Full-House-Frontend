import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
// import { addCategory } from '@/services/category.service';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './AddCategoryForm.module.scss';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

type addCategoryFormProps = {
    setAddCategoryIsOpen: (val: boolean) => void
}

const AddCategoryForm = ({setAddCategoryIsOpen}: addCategoryFormProps) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const [categoryName, setCategoryName] = useState('');

    const handleAddCategorySubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        // const res = await addCategory(categoryName);
        let data;

        /* if (res.status !== 500) {
            data = await res.json()
            if (!res.ok) {
                void Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error[0]
                })
            }
        } else {
            data = {
                error: 'Category Already Exists'
            }
            if (!res.ok) {
                void Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            }
        }

        if ((res).ok) {
            void Toast.fire({
                icon: 'success',
                title: 'Category created successfully'
            })
            setCategoryName('');
            setAddCategoryIsOpen(false);
        } */
    };

    return (
        <form className={styles.form} onSubmit={handleAddCategorySubmit} >
            <FormLabel text='Nombre de la categoría' required/>
            <input 
                onChange={(e) => { setCategoryName(e.target.value); }} 
                className={styles.newInput} 
                type='text' 
                placeholder='Nombre de la nueva categoría' 
                required 
            />
            <SubmitFormButton text='Crear Categoría' />
        </form>
    )
}

export default AddCategoryForm;