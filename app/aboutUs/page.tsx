import HomeHeader from "../ui/molecules/homeHeader/HomeHeader";
import PresentationCard from "../ui/molecules/presentationCard/PresentationCard";
import styles from "./aboutUs.module.scss";
import juan from "@/public/devs/juan.jpg";
import xamir from "@/public/devs/xamir.jpg";
import jesus from "@/public/devs/jesus.jpg";


export default function Page() {
    return (
        <>
            <HomeHeader />
            <div className={styles.pageContainer}>
                <h1 className={styles.title}>¿Quiénes somos?</h1>
                <p className={styles.text}>
                    Somos una startup dedicada a optimizar los procesos en su restaurante como lo son las
                    operaciones de gestión de mesas/cuentas, inventario de productos y transacciones, esto con
                    el fin de reducir sus costos, mejorar la toma de decisiones y aumentar la satisfacción del cliente.
                </p>
                <h1 className={styles.title}>Nuestro Equipo</h1>
                {/* Contact Card Juan Manuel */}

                <div className={styles.presentationCardsContainer}>
                    <PresentationCard
                        img={juan}
                        name={"Manuel Perez"}
                        position={"Backend Dev"}
                        github={"https://github.com/"}
                        linkedin={"https://www.linkedin.com/in/juanmperezor"}
                    />
                    <PresentationCard
                        img={jesus}
                        name={"Jesús Quiñones"}
                        position={"Frontend Dev"}
                        github={"https://github.com/Jesuscrist420"}
                        linkedin={"https://www.linkedin.com/in/jesus-q"}
                    />
                    <PresentationCard
                        img={xamir}
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