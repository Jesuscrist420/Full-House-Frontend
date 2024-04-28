import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import SettingsForm from "@/app/components/atoms/settingsForm/SettingsForm";

const Page = () => {
    return (
        <div className="w-full">
            <CommonHeader title='Configuración' ></CommonHeader>
            <SettingsForm />
        </div>
    )
}

export default Page;