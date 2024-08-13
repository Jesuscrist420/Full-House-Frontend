import Image from "next/image";
import styles from "./aboutUs.module.scss";
import HomeHeader from "../components/molecules/homeHeader/HomeHeader";
import PresentationCard from "../components/molecules/presentationCard/PresentationCard";

export default function Page() {
    return (
        <>
            <HomeHeader />
            <div className={styles.pageContainer}>
                <div className={styles.textContainerMain}>
                    <h1 className={styles.title}>¿Quiénes somos?</h1>
                    <p className={styles.text}>
                        Somos una startup dedicada a optimizar los procesos en su restaurante como lo son las
                        operaciones de gestión de mesas/cuentas, inventario de productos y transacciones, esto con
                        el fin de reducir sus costos, mejorar la toma de decisiones y aumentar la satisfacción del cliente.
                    </p>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.titleMs}>Misión</h1>
                        <p className={styles.textMs}>
                            Desarrollar soluciones de software de alta calidad que optimicen la gestión de cuentas, mesas, transacciones e inventario de los restaurantes. Nos enfocamos en entender las necesidades específicas de nuestros clientes para ofrecer soluciones personalizadas, con el objetivo de mejorar su productividad y rentabilidad.

                        </p>
                    </div>
                    <Image className={styles.img} src={"/Mision.JPG"} width={100} height={100} alt={"People Cooking"} />
                </div>
                <div className={styles.infoContainerVs}>
                    <Image className={styles.img} src={"/Vision.JPG"} width={100} height={100} alt={"Chef lookin at a Pc"} />
                    <div className={styles.textContainer}>
                        <h1 className={styles.titleVs}>Visión</h1>
                        <p className={styles.textVs}>
                            Ser líderes en el mercado del software para la gestión de restaurantes, proporcionando soluciones innovadoras y fiables. Aspiramos a convertirnos en el socio tecnológico preferido que, mediante nuestra tecnología, ayuda a los restaurantes a adaptarse y prosperar en un mercado cambiante. Para el año 2026
                        </p>
                    </div>
                </div>

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
                        img={"/devs/jesus.png"}
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