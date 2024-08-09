import Footer from "../components/molecules/footer/Footer";
import HomeHeader from "../components/molecules/homeHeader/HomeHeader";
import PresentationCard from "../components/molecules/presentationCard/PresentationCard";
import styles from "./aboutUs.module.scss";

export default function Page() {
    return (
        <>
            <HomeHeader />
            <div className={styles.pageContainer}>
                <h1 className={styles.titleMs}>Misión</h1>
                <p className={styles.textMs}>
                    Nuestra misión es proporcionar soluciones de software de alta calidad que permitan a los 
                    restaurantes gestionar eficientemente sus procesos internos, incluyendo el manejo de cuentas 
                    y mesas, las transacciones y el inventario. Nos esforzamos por entender las necesidades 
                    específicas de nuestros clientes y ofrecer soluciones personalizadas que les permitan mejorar 
                    su productividad y rentabilidad.
                </p>
                <h1 className={styles.titleVs}>Visión</h1>
                <p className={styles.textVs}>
                    Nuestra visión para 2025 es convertirnos en líderes en el mercado de desarrollo de software para la gestión de 
                    restaurantes, ofreciendo las soluciones más innovadoras, eficientes y fiables del sector. Aspiramos a 
                    ser el socio tecnológico de confianza para restaurantes de todo el mundo, ayudándoles a adaptarse a las 
                    demandas cambiantes del mercado y a mantenerse a la vanguardia de la industria.
                </p>
                <h1 className={styles.title}>¿Quiénes somos?</h1>
                <p className={styles.text}>
                    Somos una startup dedicada a optimizar los procesos en su restaurante como lo son las
                    operaciones de gestión de mesas/cuentas, inventario de productos y transacciones, esto con
                    el fin de reducir sus costos, mejorar la toma de decisiones y aumentar la satisfacción del cliente.
                </p>
                <h1 className={styles.title}>Nuestro Equipo</h1>

                <div className={styles.presentationCardsContainer}>
                    <PresentationCard
                        img={"/devs/juan.JPG"}
                        name={"Manuel Perez"}
                        position={"Backend Dev"}
                        github={"https://github.com/"}
                        linkedin={"https://www.linkedin.com/in/juanmperezor"}
                    />
                    <PresentationCard
                        img={"/devs/jesus.jpg"}
                        name={"Jesús Quiñones"}
                        position={"Frontend Dev"}
                        github={"https://github.com/Jesuscrist420"}
                        linkedin={"https://www.linkedin.com/in/jesus-q"}
                    />
                    <PresentationCard
                        img={"/devs/xamir.JPG"}
                        name={"Xamir Rojas"}
                        position={"Backend Dev"}
                        github={"https://github.com/xerojasga"}
                        linkedin={"https://www.linkedin.com/in/xamir-r"}
                    />
                </div>
            </div>
        </>
    )
}