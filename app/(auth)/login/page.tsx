import FormLogin from "@/components/formularios/form-login";

export default function PageLogin() {
    return (
        <div className="w-full h-full flex justify-center items-center bg-blue-500 min-h-screen">

            <div className="rounded-3xl bg-gray-50 p-9">
                <FormLogin />
            </div>
        </div>
    )
}