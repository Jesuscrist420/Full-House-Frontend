import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
// import { addCategory } from '@/services/category.service';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './AddCategoryForm.module.scss';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

type addCategoryFormProps = {
    setAddCategoryIsOpen: (val: boolean) => void,
    categoriesList: {}[],
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const AddCategoryForm = ({setAddCategoryIsOpen, categoriesList}: addCategoryFormProps) => {

    const [categoryName, setCategoryName] = useState('');

    const handleAddCategorySubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        // const res = await addCategory(categoryName);
        categoriesList.push(
            {
                id: "656393458e0bb84c89a01fcg",
                name: categoryName,
                userId: "653c0608195e0930f96230f7",
                createdAt: "2023-11-26T18:49:41.082Z",
                updatedAt: "2023-11-26T18:49:41.082Z"
            },
        )
        let data;

        if ( /* res.status !== 500 */ true ) {
            // data = await res.json()
            if ( /* !res.ok */ false) {
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
            if (/* !res.ok */ false) {
                void Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            }
        }

        if (/* (res).ok */ true) {
            void Toast.fire({
                icon: 'success',
                title: 'Category created successfully'
            })
            setCategoryName('');
            setAddCategoryIsOpen(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleAddCategorySubmit} >
            <FormLabel text='Nombre de la categoría' required/>
            <input 
                onChange={(e) => { setCategoryName(e.target.value); }} 
                className={styles.newInput} 
                value={categoryName}
                type='text' 
                placeholder='Nombre de la nueva categoría' 
                required 
            />
            <SubmitFormButton text='Crear Categoría' />
        </form>
    )
}

export default AddCategoryForm;