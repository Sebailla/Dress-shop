
import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/auth.config';

export default async function address() {

    const countries = await getCountries()

    const session = await auth()
    if (!session) return {
        redirect: (
            <h3 className='text-3xl'>No autorizado</h3>
        )
    }

    const userAddress = await getUserAddress(session.user.id) ?? undefined

    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

                <Title title="Datos de entrega" subtitle="Dirección de entrega" />

                <AddressForm
                    countries={countries}
                    userStoreAddress={userAddress}
                />

            </div>

        </div>
    );
}