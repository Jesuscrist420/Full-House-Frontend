'use client'
import styles from "./contactUsForm.module.scss";


const ContactUsForm = () => {

    async function handleSubmit(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "1a9474fa-5bf2-4fb9-b5f1-802f8f53840f");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
        }
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <input className={styles.input} type='text' name='name' placeholder='¿Cuál es tu nombre?' />
            <input className={styles.input} type='email' name='email' placeholder='¿Cuál es tu correo?' />
            <textarea  className={styles.input} name='message' placeholder='Déjanos saber tu mensaje' />
            <button className={styles.submitButton} type="submit">Enviar</button>
        </form>
    )
}

export default ContactUsForm;